import { describe, expect, it } from 'vitest';
import { Monster } from '../data/monsters';
import { LootMgt } from './lootMgt';

describe('LootMgt', () => {
   describe('computeMoneyEarned', () => {
      const samples = [
         {
            title: 'should return 0 if there are no monsters provided',
            monsters: [],
            expected: 0,
         },
         {
            title: 'should return 0 if there is monster with no money provided',
            monsters: [
               {
                  money: { min: 0, max: 0 },
               },
            ] as Monster[],
            expected: 0,
         },
         {
            title: 'should return 0 if there are monsters with no money provided',
            monsters: [
               {
                  money: { min: 0, max: 0 },
               },
               {
                  money: { min: 0, max: 0 },
               },
               {
                  money: { min: 0, max: 0 },
               },
            ] as Monster[],
            expected: 0,
         },
         {
            title: 'should return exact money for 1 monster',
            monsters: [
               {
                  money: { min: 1, max: 1 },
               },
            ] as Monster[],
            expected: 1,
         },
         {
            title: 'should return exact money for 3 monsters',
            monsters: [
               {
                  money: { min: 1, max: 1 },
               },
               {
                  money: { min: 2, max: 2 },
               },
               {
                  money: { min: 4, max: 4 },
               },
            ] as Monster[],
            expected: 7,
         },
         {
            title: 'should return value between bounds for 1 monster',
            monsters: [
               {
                  money: { min: 7, max: 12 },
               },
            ] as Monster[],
            mockRandom: () => {
               Math.random = () => 0.20665;
            },
            expected: 8,
         },
         {
            title: 'should return value between bounds for 3 monsters',
            monsters: [
               {
                  money: { min: 7, max: 12 },
               },
               {
                  money: { min: 5, max: 17 },
               },
               {
                  money: { min: 1, max: 9 },
               },
            ] as Monster[],
            mockRandom: () => {
               Math.random = () => 0.3784;
            },
            expected: 22,
         },
      ];

      samples.forEach(({ title, monsters, mockRandom, expected }) => {
         it(title, () => {
            if (mockRandom) {
               mockRandom();
            }

            expect(LootMgt.computeMoneyEarned(monsters)).toBe(expected);
         });
      });
   });
});
