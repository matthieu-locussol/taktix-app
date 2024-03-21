import { STARTING_TALENTS, TALENTS } from '../data/talents';
import { LevelMgt } from './levelMgt';

export namespace TalentMgt {
   export const canAllocateTalent = (
      talent: number,
      allocatedTalents: number[],
      availablePoints: number,
   ): boolean => {
      if (availablePoints === 0) {
         return false;
      }

      if (allocatedTalents.length === 0 && STARTING_TALENTS.includes(talent)) {
         return true;
      }

      return getAdjacentTalents(allocatedTalents).includes(talent);
   };

   export const canDisallocateTalent = (talent: number, allocatedTalents: number[]): boolean => {
      if (allocatedTalents.length === 1 && STARTING_TALENTS.includes(talent)) {
         return true;
      }

      return getAllocatedTalentsWithOneNeighbour(allocatedTalents).includes(talent);
   };

   const getAdjacentTalents = (allocatedTalents: number[]): number[] =>
      allocatedTalents.reduce(
         (acc, current) => [...acc, ...TALENTS[current].edges],
         [] as number[],
      );

   export const getAdjacentTalentsExcludingAllocated = (allocatedTalents: number[]): number[] => {
      if (allocatedTalents.length === 0) {
         return STARTING_TALENTS;
      }

      const adjacentTalents = getAdjacentTalents(allocatedTalents);
      return adjacentTalents.filter((edge) => !allocatedTalents.includes(edge));
   };

   const getAllocatedTalentsWithOneNeighbour = (allocatedTalents: number[]): number[] =>
      allocatedTalents
         .filter((talent) => {
            const { edges } = TALENTS[talent];
            return edges.filter((edge) => allocatedTalents.includes(edge)).length === 1;
         })
         .filter((talent) => !STARTING_TALENTS.includes(talent));

   export const serializeTalents = (talents: number[]): string => talents.join(',');

   export const deserializeTalents = (talents: string): number[] => {
      if (talents === '') {
         return [];
      }

      return talents.split(',').map((talent) => parseInt(talent, 10));
   };

   const isTalentTreeValid = (talents: number[]): boolean => {
      const hasOneStartingTalent = talents.some((talent) => STARTING_TALENTS.includes(talent));

      if (!hasOneStartingTalent) {
         return false;
      }

      const visitedTalents = new Set<number>();
      const stack = [...talents];

      while (stack.length > 0) {
         const current = stack.pop() as number;

         if (!visitedTalents.has(current)) {
            visitedTalents.add(current);

            const { edges } = TALENTS[current];

            edges.forEach((edge) => {
               if (talents.includes(edge)) {
                  stack.push(edge);
               }
            });
         }
      }

      return visitedTalents.size === talents.length;
   };

   export const isProgressionValid = (
      allocatedTalents: number[],
      newTalents: number[],
      availablePoints: number,
      experience: number,
   ):
      | { valid: false }
      | {
           valid: true;
           remainingPoints: number;
        } => {
      const totalPoints = allocatedTalents.length + availablePoints;
      const remainingPoints = totalPoints - newTalents.length;

      if (newTalents.length > totalPoints) {
         return { valid: false };
      }

      const level = LevelMgt.getLevel(experience);
      if (newTalents.length + remainingPoints !== level - 1) {
         return { valid: false };
      }

      if (!isTalentTreeValid(newTalents)) {
         return { valid: false };
      }

      return { valid: true, remainingPoints };
   };
}
