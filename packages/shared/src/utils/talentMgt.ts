import { STARTING_TALENTS, Talent, getTalents } from '../data/talents';
import { ArrayMgt } from './arrayMgt';
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

      if (allocatedTalents.includes(talent)) {
         return false;
      }

      return isTalentTreeValid([...allocatedTalents, talent]);
   };

   export const canDisallocateTalent = (talent: number, allocatedTalents: number[]): boolean => {
      if (allocatedTalents.length === 1 && STARTING_TALENTS.includes(talent)) {
         return true;
      }

      if (!allocatedTalents.includes(talent)) {
         return false;
      }

      return isTalentTreeValid(allocatedTalents.filter((t) => t !== talent));
   };

   const getAdjacentTalents = (allocatedTalents: number[]): number[] =>
      allocatedTalents.reduce(
         (acc, current) => [...acc, ...getTalents()[current].edges],
         [] as number[],
      );

   export const getAdjacentTalentsExcludingAllocated = (allocatedTalents: number[]): number[] => {
      if (allocatedTalents.length === 0) {
         return STARTING_TALENTS;
      }

      const adjacentTalents = getAdjacentTalents(allocatedTalents);
      const adjecentTalentsExludingAllocated = adjacentTalents.filter(
         (edge) => !allocatedTalents.includes(edge),
      );

      return ArrayMgt.makeUnique(adjecentTalentsExludingAllocated);
   };

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

      const subgraph: Record<number, Talent> = {};
      const visited: Set<number> = new Set();

      for (const id of talents) {
         if (getTalents()[id]) {
            subgraph[id] = {
               ...getTalents()[id],
               edges: getTalents()[id].edges.filter((edge) => talents.includes(edge)),
            };
         }
      }

      function dfs(nodeId: number) {
         visited.add(nodeId);
         for (const neighbor of subgraph[nodeId].edges) {
            if (!visited.has(neighbor)) {
               dfs(neighbor);
            }
         }
      }

      if (talents.length > 0) {
         dfs(talents[0]);
      }

      return talents.every((id) => visited.has(id));
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
