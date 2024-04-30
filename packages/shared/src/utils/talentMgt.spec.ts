import { describe, expect, it, vi } from 'vitest';
import { TalentMgt } from './talentMgt';

/**
 *   Graph structure:
 *
 *            8
 *            |
 *            7  12
 *          / | / \
 *         /    4  \
 *    16  /         5 - 14
 *    |  /         /
 *    11 - 3       2
 *     \           \
 *      \           6 - 9
 *       \    1   /
 *        \ / |  /
 *        13  10 - 15
 *         |
 *        17
 */

vi.mock('../data/talents', () => ({
   STARTING_TALENTS: [1, 2, 3, 4],
   getTalents: () => ({
      1: { edges: [10, 13] },
      2: { edges: [5, 6] },
      3: { edges: [11] },
      4: { edges: [7, 12] },
      5: { edges: [2, 12, 14] },
      6: { edges: [2, 9, 10] },
      7: { edges: [4, 8, 11] },
      8: { edges: [7] },
      9: { edges: [6] },
      10: { edges: [1, 6, 15] },
      11: { edges: [3, 7, 13, 16] },
      12: { edges: [4, 5] },
      13: { edges: [1, 11, 17] },
      14: { edges: [5] },
      15: { edges: [10] },
      16: { edges: [11] },
      17: { edges: [13] },
   }),
}));

describe('TalentMgt', () => {
   describe('canAllocateTalent', () => {
      const samples = [
         {
            title: 'should return false if there are no available points',
            talent: 1,
            allocatedTalents: [],
            availablePoints: 0,
            expected: false,
         },
         {
            title: 'should return true if the talent is a starting talent',
            talent: 1,
            allocatedTalents: [],
            availablePoints: 1,
            expected: true,
         },
         {
            title: 'should return true if the talent is adjacent to an allocated talent',
            talent: 10,
            allocatedTalents: [1],
            availablePoints: 1,
            expected: true,
         },
         {
            title: 'should return false if the talent is not adjacent to an allocated talent',
            talent: 17,
            allocatedTalents: [1, 10],
            availablePoints: 1,
            expected: false,
         },
         {
            title: 'should return false if the talent is already allocated',
            talent: 1,
            allocatedTalents: [1],
            availablePoints: 1,
            expected: false,
         },
         {
            title: 'should return false if the talent is a starting talent while there are already allocated talents',
            talent: 2,
            allocatedTalents: [1],
            availablePoints: 1,
            expected: false,
         },
         {
            title: 'should return true if the talent is adjacent to an allocated talent while there are already allocated talents',
            talent: 6,
            allocatedTalents: [2, 5],
            availablePoints: 1,
            expected: true,
         },
         {
            title: 'should return false if the talent is not adjacent to an allocated talent while there are already allocated talents',
            talent: 9,
            allocatedTalents: [1, 2],
            availablePoints: 1,
            expected: false,
         },
      ];

      it.each(samples)('$title', ({ talent, allocatedTalents, availablePoints, expected }) => {
         expect(TalentMgt.canAllocateTalent(talent, allocatedTalents, availablePoints)).toBe(
            expected,
         );
      });
   });

   describe('canDisallocateTalent', () => {
      const samples = [
         {
            title: 'should return true if the talent is a starting talent and is the only allocated talent',
            talent: 1,
            allocatedTalents: [1],
            expected: true,
         },
         {
            title: 'should return false if the talent is a starting talent and is not the only allocated talent',
            talent: 1,
            allocatedTalents: [1, 10],
            expected: false,
         },
         {
            title: 'should return true if the talent is not a starting talent and has only one neighbour',
            talent: 13,
            allocatedTalents: [1, 10, 13],
            expected: true,
         },
         {
            title: 'should return false if the talent is not a starting talent and has more than one allocated neighbour',
            talent: 10,
            allocatedTalents: [1, 10, 15],
            expected: false,
         },
         {
            title: 'should return true if the talent is the only allocated talent',
            talent: 1,
            allocatedTalents: [1],
            expected: true,
         },
         {
            title: 'should return false if the talent is not allocated',
            talent: 10,
            allocatedTalents: [1],
            expected: false,
         },
         {
            title: 'should return false if the starting talent is not allocated',
            talent: 1,
            allocatedTalents: [],
            expected: false,
         },
      ];

      it.each(samples)('$title', ({ talent, allocatedTalents, expected }) => {
         expect(TalentMgt.canDisallocateTalent(talent, allocatedTalents)).toBe(expected);
      });
   });

   describe('getAdjacentTalentsExcludingAllocated', () => {
      const samples = [
         {
            title: 'should return all starting talents if there are no allocated talents',
            allocatedTalents: [],
            expected: [1, 2, 3, 4],
         },
         {
            title: 'should return all adjacent talents excluding the allocated ones',
            allocatedTalents: [1, 10],
            expected: [13, 6, 15],
         },
         {
            title: 'should return all adjacent talents excluding the allocated ones even if multiple starting talents are allocated',
            allocatedTalents: [1, 2, 10],
            expected: [13, 5, 6, 15],
         },
      ];

      it.each(samples)('$title', ({ allocatedTalents, expected }) => {
         expect(TalentMgt.getAdjacentTalentsExcludingAllocated(allocatedTalents)).toEqual(expected);
      });
   });

   describe('isProgressionValid', () => {
      const samples = [
         {
            title: 'should be valid if the progression order changed',
            currentTalents: [1, 10, 13, 17],
            newTalents: [10, 17, 13, 1],
            availablePoints: 1,
            experience: 5_000,
            expected: { valid: true, remainingPoints: 1 },
         },
         {
            title: 'should be valid if some points have been refunded',
            currentTalents: [1, 10, 13, 17],
            newTalents: [1, 10],
            availablePoints: 0,
            experience: 3_000,
            expected: { valid: true, remainingPoints: 2 },
         },
         {
            title: 'should be valid if new talents have been allocated',
            currentTalents: [2],
            newTalents: [2, 5, 14, 6],
            availablePoints: 4,
            experience: 5_000,
            expected: { valid: true, remainingPoints: 1 },
         },
         {
            title: 'should be invalid if new talents have been allocated and there are not enough points',
            currentTalents: [2],
            newTalents: [2, 5, 14, 6],
            availablePoints: 2,
            experience: 2_000,
            expected: { valid: false },
         },
         {
            title: 'should be valid if the progression order changed while there are no points available',
            currentTalents: [1, 10, 13, 17],
            newTalents: [10, 17, 13, 1],
            availablePoints: 0,
            experience: 3_000,
            expected: { valid: true, remainingPoints: 0 },
         },
         {
            title: 'should be valid if some points have been refunded while there are already points available',
            currentTalents: [1, 10, 13, 17],
            newTalents: [1, 10],
            availablePoints: 1,
            experience: 5_000,
            expected: { valid: true, remainingPoints: 3 },
         },
         {
            title: 'should be valid if talents are changed',
            currentTalents: [2, 5, 14],
            newTalents: [4, 7, 8, 12],
            availablePoints: 1,
            experience: 3_000,
            expected: { valid: true, remainingPoints: 0 },
         },
         {
            title: 'should be invalid if talents are changed and there is no starting talent',
            currentTalents: [4, 7, 8, 12],
            newTalents: [13, 17],
            availablePoints: 4,
            experience: 15_000,
            expected: { valid: false },
         },
      ];

      it.each(samples)(
         '$title',
         ({ currentTalents, newTalents, availablePoints, experience, expected }) => {
            expect(
               TalentMgt.isProgressionValid(
                  currentTalents,
                  newTalents,
                  availablePoints,
                  experience,
               ),
            ).toStrictEqual(expected);
         },
      );
   });
});
