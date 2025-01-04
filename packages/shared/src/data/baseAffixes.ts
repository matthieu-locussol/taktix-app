import type { ItemType } from '../types/Item.ts';
import type { BaseTemplate } from '../types/ItemTemplate.ts';

export const baseAffixes: Record<ItemType, BaseTemplate[]> = {
   helmetE: [
      { 'evasion_+f': { level: 1, name: '', min: 5, max: 8 } },
      { 'evasion_+f': { level: 7, name: '', min: 13, max: 17 } },
      { 'evasion_+f': { level: 12, name: '', min: 21, max: 26 } },
      { 'evasion_+f': { level: 18, name: '', min: 30, max: 36 } },
   ],
   helmetH: [
      { 'vitality_+f': { level: 1, name: '', min: 2, max: 3 } },
      { 'vitality_+f': { level: 7, name: '', min: 8, max: 10 } },
      { 'vitality_+f': { level: 12, name: '', min: 14, max: 17 } },
      { 'vitality_+f': { level: 18, name: '', min: 21, max: 25 } },
   ],
   helmetM: [
      { 'magicShield_+f': { level: 3, name: '', min: 2, max: 4 } },
      { 'magicShield_+f': { level: 8, name: '', min: 9, max: 12 } },
      { 'magicShield_+f': { level: 13, name: '', min: 15, max: 19 } },
      { 'magicShield_+f': { level: 19, name: '', min: 22, max: 27 } },
   ],
   helmetEH: [
      {
         'vitality_+f': { level: 3, name: '', min: 2, max: 3 },
         'evasion_+f': { level: 3, name: '', min: 2, max: 3 },
      },
      {
         'vitality_+f': { level: 8, name: '', min: 5, max: 8 },
         'evasion_+f': { level: 8, name: '', min: 5, max: 8 },
      },
      {
         'vitality_+f': { level: 13, name: '', min: 9, max: 12 },
         'evasion_+f': { level: 13, name: '', min: 9, max: 12 },
      },
      {
         'vitality_+f': { level: 19, name: '', min: 14, max: 20 },
         'evasion_+f': { level: 19, name: '', min: 14, max: 20 },
      },
   ],
   helmetEM: [
      {
         'magicShield_+f': { level: 3, name: '', min: 2, max: 4 },
         'evasion_+f': { level: 3, name: '', min: 2, max: 4 },
      },
      {
         'magicShield_+f': { level: 8, name: '', min: 7, max: 10 },
         'evasion_+f': { level: 8, name: '', min: 7, max: 10 },
      },
      {
         'magicShield_+f': { level: 13, name: '', min: 12, max: 16 },
         'evasion_+f': { level: 13, name: '', min: 12, max: 16 },
      },
      {
         'magicShield_+f': { level: 19, name: '', min: 18, max: 23 },
         'evasion_+f': { level: 19, name: '', min: 18, max: 23 },
      },
   ],
   helmetHM: [
      {
         'vitality_+f': { level: 3, name: '', min: 2, max: 3 },
         'magicShield_+f': { level: 3, name: '', min: 2, max: 4 },
      },
      {
         'vitality_+f': { level: 8, name: '', min: 5, max: 8 },
         'magicShield_+f': { level: 8, name: '', min: 5, max: 8 },
      },
      {
         'vitality_+f': { level: 13, name: '', min: 9, max: 12 },
         'magicShield_+f': { level: 13, name: '', min: 9, max: 12 },
      },
      {
         'vitality_+f': { level: 19, name: '', min: 14, max: 18 },
         'magicShield_+f': { level: 19, name: '', min: 14, max: 18 },
      },
   ],
   chestplateE: [
      { 'evasion_+f': { level: 3, name: '', min: 10, max: 16 } },
      { 'evasion_+f': { level: 8, name: '', min: 20, max: 27 } },
      { 'evasion_+f': { level: 13, name: '', min: 30, max: 38 } },
      { 'evasion_+f': { level: 19, name: '', min: 40, max: 49 } },
   ],
   chestplateH: [
      { 'vitality_+f': { level: 1, name: '', min: 5, max: 7 } },
      { 'vitality_+f': { level: 7, name: '', min: 15, max: 18 } },
      { 'vitality_+f': { level: 12, name: '', min: 25, max: 29 } },
      { 'vitality_+f': { level: 18, name: '', min: 35, max: 40 } },
   ],
   chestplateM: [
      { 'magicShield_+f': { level: 3, name: '', min: 5, max: 9 } },
      { 'magicShield_+f': { level: 8, name: '', min: 15, max: 20 } },
      { 'magicShield_+f': { level: 13, name: '', min: 25, max: 31 } },
      { 'magicShield_+f': { level: 19, name: '', min: 35, max: 42 } },
   ],
   chestplateEH: [
      {
         'vitality_+f': { level: 3, name: '', min: 4, max: 6 },
         'evasion_+f': { level: 3, name: '', min: 4, max: 6 },
      },
      {
         'vitality_+f': { level: 8, name: '', min: 10, max: 15 },
         'evasion_+f': { level: 8, name: '', min: 10, max: 15 },
      },
      {
         'vitality_+f': { level: 13, name: '', min: 17, max: 22 },
         'evasion_+f': { level: 13, name: '', min: 17, max: 22 },
      },
      {
         'vitality_+f': { level: 19, name: '', min: 24, max: 30 },
         'evasion_+f': { level: 19, name: '', min: 24, max: 30 },
      },
   ],
   chestplateEM: [
      {
         'magicShield_+f': { level: 3, name: '', min: 3, max: 5 },
         'evasion_+f': { level: 3, name: '', min: 3, max: 5 },
      },
      {
         'magicShield_+f': { level: 8, name: '', min: 9, max: 13 },
         'evasion_+f': { level: 8, name: '', min: 9, max: 13 },
      },
      {
         'magicShield_+f': { level: 13, name: '', min: 16, max: 21 },
         'evasion_+f': { level: 13, name: '', min: 16, max: 21 },
      },
      {
         'magicShield_+f': { level: 19, name: '', min: 23, max: 29 },
         'evasion_+f': { level: 19, name: '', min: 23, max: 29 },
      },
   ],
   chestplateHM: [
      {
         'vitality_+f': { level: 3, name: '', min: 3, max: 5 },
         'magicShield_+f': { level: 3, name: '', min: 3, max: 5 },
      },
      {
         'vitality_+f': { level: 8, name: '', min: 8, max: 12 },
         'magicShield_+f': { level: 8, name: '', min: 8, max: 12 },
      },
      {
         'vitality_+f': { level: 13, name: '', min: 14, max: 19 },
         'magicShield_+f': { level: 13, name: '', min: 14, max: 19 },
      },
      {
         'vitality_+f': { level: 19, name: '', min: 21, max: 27 },
         'magicShield_+f': { level: 19, name: '', min: 21, max: 27 },
      },
   ],
   bootsE: [
      { 'evasion_+f': { level: 1, name: '', min: 3, max: 4 } },
      { 'evasion_+f': { level: 7, name: '', min: 6, max: 7 } },
      { 'evasion_+f': { level: 13, name: '', min: 9, max: 10 } },
      { 'evasion_+f': { level: 18, name: '', min: 12, max: 13 } },
   ],
   bootsH: [
      { 'vitality_+f': { level: 1, name: '', min: 1, max: 2 } },
      { 'vitality_+f': { level: 7, name: '', min: 4, max: 6 } },
      { 'vitality_+f': { level: 12, name: '', min: 7, max: 9 } },
      { 'vitality_+f': { level: 18, name: '', min: 10, max: 12 } },
   ],
   bootsM: [
      { 'magicShield_+f': { level: 3, name: '', min: 1, max: 2 } },
      { 'magicShield_+f': { level: 8, name: '', min: 4, max: 5 } },
      { 'magicShield_+f': { level: 13, name: '', min: 7, max: 8 } },
      { 'magicShield_+f': { level: 19, name: '', min: 10, max: 11 } },
   ],
   bootsEH: [
      {
         'vitality_+f': { level: 3, name: '', min: 2, max: 3 },
         'evasion_+f': { level: 3, name: '', min: 2, max: 3 },
      },
      {
         'vitality_+f': { level: 8, name: '', min: 4, max: 5 },
         'evasion_+f': { level: 8, name: '', min: 4, max: 5 },
      },
      {
         'vitality_+f': { level: 13, name: '', min: 6, max: 7 },
         'evasion_+f': { level: 13, name: '', min: 6, max: 7 },
      },
      {
         'vitality_+f': { level: 19, name: '', min: 8, max: 9 },
         'evasion_+f': { level: 19, name: '', min: 8, max: 9 },
      },
   ],
   bootsEM: [
      {
         'magicShield_+f': { level: 3, name: '', min: 1, max: 2 },
         'evasion_+f': { level: 3, name: '', min: 1, max: 2 },
      },
      {
         'magicShield_+f': { level: 8, name: '', min: 3, max: 4 },
         'evasion_+f': { level: 8, name: '', min: 3, max: 4 },
      },
      {
         'magicShield_+f': { level: 13, name: '', min: 5, max: 6 },
         'evasion_+f': { level: 13, name: '', min: 5, max: 6 },
      },
      {
         'magicShield_+f': { level: 19, name: '', min: 7, max: 8 },
         'evasion_+f': { level: 19, name: '', min: 7, max: 8 },
      },
   ],
   bootsHM: [
      {
         'vitality_+f': { level: 3, name: '', min: 1, max: 2 },
         'magicShield_+f': { level: 3, name: '', min: 1, max: 2 },
      },
      {
         'vitality_+f': { level: 8, name: '', min: 3, max: 4 },
         'magicShield_+f': { level: 8, name: '', min: 3, max: 4 },
      },
      {
         'vitality_+f': { level: 13, name: '', min: 5, max: 6 },
         'magicShield_+f': { level: 13, name: '', min: 5, max: 6 },
      },
      {
         'vitality_+f': { level: 19, name: '', min: 7, max: 8 },
         'magicShield_+f': { level: 19, name: '', min: 7, max: 8 },
      },
   ],
   glovesE: [
      { 'evasion_+f': { level: 3, name: '', min: 3, max: 4 } },
      { 'evasion_+f': { level: 8, name: '', min: 6, max: 7 } },
      { 'evasion_+f': { level: 13, name: '', min: 9, max: 10 } },
      { 'evasion_+f': { level: 19, name: '', min: 12, max: 13 } },
   ],
   glovesH: [
      { 'vitality_+f': { level: 1, name: '', min: 1, max: 2 } },
      { 'vitality_+f': { level: 7, name: '', min: 4, max: 6 } },
      { 'vitality_+f': { level: 12, name: '', min: 7, max: 9 } },
      { 'vitality_+f': { level: 18, name: '', min: 10, max: 12 } },
   ],
   glovesM: [
      { 'magicShield_+f': { level: 3, name: '', min: 1, max: 2 } },
      { 'magicShield_+f': { level: 8, name: '', min: 4, max: 5 } },
      { 'magicShield_+f': { level: 13, name: '', min: 7, max: 8 } },
      { 'magicShield_+f': { level: 19, name: '', min: 10, max: 11 } },
   ],
   glovesEH: [
      {
         'vitality_+f': { level: 3, name: '', min: 2, max: 3 },
         'evasion_+f': { level: 3, name: '', min: 2, max: 3 },
      },
      {
         'vitality_+f': { level: 8, name: '', min: 4, max: 5 },
         'evasion_+f': { level: 8, name: '', min: 4, max: 5 },
      },
      {
         'vitality_+f': { level: 13, name: '', min: 6, max: 7 },
         'evasion_+f': { level: 13, name: '', min: 6, max: 7 },
      },
      {
         'vitality_+f': { level: 19, name: '', min: 8, max: 9 },
         'evasion_+f': { level: 19, name: '', min: 8, max: 9 },
      },
   ],
   glovesEM: [
      {
         'magicShield_+f': { level: 3, name: '', min: 1, max: 2 },
         'evasion_+f': { level: 3, name: '', min: 1, max: 2 },
      },
      {
         'magicShield_+f': { level: 8, name: '', min: 3, max: 4 },
         'evasion_+f': { level: 8, name: '', min: 3, max: 4 },
      },
      {
         'magicShield_+f': { level: 13, name: '', min: 5, max: 6 },
         'evasion_+f': { level: 13, name: '', min: 5, max: 6 },
      },
      {
         'magicShield_+f': { level: 19, name: '', min: 7, max: 8 },
         'evasion_+f': { level: 19, name: '', min: 7, max: 8 },
      },
   ],
   glovesHM: [
      {
         'vitality_+f': { level: 3, name: '', min: 1, max: 2 },
         'magicShield_+f': { level: 3, name: '', min: 1, max: 2 },
      },
      {
         'vitality_+f': { level: 8, name: '', min: 3, max: 4 },
         'magicShield_+f': { level: 8, name: '', min: 3, max: 4 },
      },
      {
         'vitality_+f': { level: 13, name: '', min: 5, max: 6 },
         'magicShield_+f': { level: 13, name: '', min: 5, max: 6 },
      },
      {
         'vitality_+f': { level: 19, name: '', min: 7, max: 8 },
         'magicShield_+f': { level: 19, name: '', min: 7, max: 8 },
      },
   ],
   amulet: [
      { 'vitality_+f': { level: 3, name: '', min: 1, max: 2 } },
      { 'vitality_+f': { level: 7, name: '', min: 4, max: 6 } },
      { 'vitality_+f': { level: 12, name: '', min: 7, max: 9 } },
      { 'vitality_+f': { level: 18, name: '', min: 10, max: 12 } },
      { 'prospect_+f': { level: 3, name: '', min: 1, max: 2 } },
      { 'prospect_+f': { level: 8, name: '', min: 3, max: 4 } },
      { 'prospect_+f': { level: 13, name: '', min: 5, max: 6 } },
      { 'prospect_+f': { level: 19, name: '', min: 7, max: 8 } },
      { 'strength_+f': { level: 3, name: '', min: 1, max: 2 } },
      { 'strength_+f': { level: 8, name: '', min: 3, max: 4 } },
      { 'strength_+f': { level: 13, name: '', min: 5, max: 6 } },
      { 'strength_+f': { level: 19, name: '', min: 7, max: 8 } },
      { 'intelligence_+f': { level: 3, name: '', min: 1, max: 2 } },
      { 'intelligence_+f': { level: 8, name: '', min: 3, max: 4 } },
      { 'intelligence_+f': { level: 13, name: '', min: 5, max: 6 } },
      { 'intelligence_+f': { level: 19, name: '', min: 7, max: 8 } },
      { 'dexterity_+f': { level: 3, name: '', min: 1, max: 2 } },
      { 'dexterity_+f': { level: 8, name: '', min: 3, max: 4 } },
      { 'dexterity_+f': { level: 13, name: '', min: 5, max: 6 } },
      { 'dexterity_+f': { level: 19, name: '', min: 7, max: 8 } },
      { 'luck_+f': { level: 3, name: '', min: 1, max: 2 } },
      { 'luck_+f': { level: 8, name: '', min: 3, max: 4 } },
      { 'luck_+f': { level: 13, name: '', min: 5, max: 6 } },
      { 'luck_+f': { level: 19, name: '', min: 7, max: 8 } },
      { 'earthResistance_+%': { level: 3, name: '', min: 1, max: 2 } },
      { 'earthResistance_+%': { level: 8, name: '', min: 3, max: 4 } },
      { 'earthResistance_+%': { level: 13, name: '', min: 5, max: 6 } },
      { 'earthResistance_+%': { level: 19, name: '', min: 7, max: 8 } },
      { 'fireResistance_+%': { level: 3, name: '', min: 1, max: 2 } },
      { 'fireResistance_+%': { level: 8, name: '', min: 3, max: 4 } },
      { 'fireResistance_+%': { level: 13, name: '', min: 5, max: 6 } },
      { 'fireResistance_+%': { level: 19, name: '', min: 7, max: 8 } },
      { 'windResistance_+%': { level: 3, name: '', min: 1, max: 2 } },
      { 'windResistance_+%': { level: 8, name: '', min: 3, max: 4 } },
      { 'windResistance_+%': { level: 13, name: '', min: 5, max: 6 } },
      { 'windResistance_+%': { level: 19, name: '', min: 7, max: 8 } },
      { 'iceResistance_+%': { level: 3, name: '', min: 1, max: 2 } },
      { 'iceResistance_+%': { level: 8, name: '', min: 3, max: 4 } },
      { 'iceResistance_+%': { level: 13, name: '', min: 5, max: 6 } },
      { 'iceResistance_+%': { level: 19, name: '', min: 7, max: 8 } },
      { 'elementalResistances_+%': { level: 3, name: '', min: 1, max: 2 } },
      { 'elementalResistances_+%': { level: 8, name: '', min: 2, max: 3 } },
      { 'elementalResistances_+%': { level: 13, name: '', min: 3, max: 5 } },
      { 'elementalResistances_+%': { level: 19, name: '', min: 5, max: 6 } },
      { 'criticalStrikeChance_+%': { level: 3, name: '', min: 1, max: 3 } },
      { 'criticalStrikeChance_+%': { level: 8, name: '', min: 3, max: 5 } },
      { 'criticalStrikeChance_+%': { level: 13, name: '', min: 5, max: 7 } },
      { 'criticalStrikeChance_+%': { level: 19, name: '', min: 8, max: 11 } },
   ],
   belt: [],
   ring: [
      { 'vitality_+f': { level: 3, name: '', min: 1, max: 2 } },
      { 'vitality_+f': { level: 7, name: '', min: 4, max: 6 } },
      { 'vitality_+f': { level: 12, name: '', min: 7, max: 9 } },
      { 'vitality_+f': { level: 18, name: '', min: 10, max: 12 } },
      { 'prospect_+f': { level: 3, name: '', min: 1, max: 2 } },
      { 'prospect_+f': { level: 8, name: '', min: 3, max: 4 } },
      { 'prospect_+f': { level: 13, name: '', min: 5, max: 6 } },
      { 'prospect_+f': { level: 19, name: '', min: 7, max: 8 } },
      { 'strength_+f': { level: 3, name: '', min: 1, max: 2 } },
      { 'strength_+f': { level: 8, name: '', min: 3, max: 4 } },
      { 'strength_+f': { level: 13, name: '', min: 5, max: 6 } },
      { 'strength_+f': { level: 19, name: '', min: 7, max: 8 } },
      { 'intelligence_+f': { level: 3, name: '', min: 1, max: 2 } },
      { 'intelligence_+f': { level: 8, name: '', min: 3, max: 4 } },
      { 'intelligence_+f': { level: 13, name: '', min: 5, max: 6 } },
      { 'intelligence_+f': { level: 19, name: '', min: 7, max: 8 } },
      { 'dexterity_+f': { level: 3, name: '', min: 1, max: 2 } },
      { 'dexterity_+f': { level: 8, name: '', min: 3, max: 4 } },
      { 'dexterity_+f': { level: 13, name: '', min: 5, max: 6 } },
      { 'dexterity_+f': { level: 19, name: '', min: 7, max: 8 } },
      { 'luck_+f': { level: 3, name: '', min: 1, max: 2 } },
      { 'luck_+f': { level: 8, name: '', min: 3, max: 4 } },
      { 'luck_+f': { level: 13, name: '', min: 5, max: 6 } },
      { 'luck_+f': { level: 19, name: '', min: 7, max: 8 } },
      { 'earthResistance_+%': { level: 3, name: '', min: 1, max: 2 } },
      { 'earthResistance_+%': { level: 8, name: '', min: 3, max: 4 } },
      { 'earthResistance_+%': { level: 13, name: '', min: 5, max: 6 } },
      { 'earthResistance_+%': { level: 19, name: '', min: 7, max: 8 } },
      { 'fireResistance_+%': { level: 3, name: '', min: 1, max: 2 } },
      { 'fireResistance_+%': { level: 8, name: '', min: 3, max: 4 } },
      { 'fireResistance_+%': { level: 13, name: '', min: 5, max: 6 } },
      { 'fireResistance_+%': { level: 19, name: '', min: 7, max: 8 } },
      { 'windResistance_+%': { level: 3, name: '', min: 1, max: 2 } },
      { 'windResistance_+%': { level: 8, name: '', min: 3, max: 4 } },
      { 'windResistance_+%': { level: 13, name: '', min: 5, max: 6 } },
      { 'windResistance_+%': { level: 19, name: '', min: 7, max: 8 } },
      { 'iceResistance_+%': { level: 3, name: '', min: 1, max: 2 } },
      { 'iceResistance_+%': { level: 8, name: '', min: 3, max: 4 } },
      { 'iceResistance_+%': { level: 13, name: '', min: 5, max: 6 } },
      { 'iceResistance_+%': { level: 19, name: '', min: 7, max: 8 } },
      { 'elementalResistances_+%': { level: 3, name: '', min: 1, max: 2 } },
      { 'elementalResistances_+%': { level: 8, name: '', min: 2, max: 3 } },
      { 'elementalResistances_+%': { level: 13, name: '', min: 3, max: 5 } },
      { 'elementalResistances_+%': { level: 19, name: '', min: 5, max: 6 } },
      { 'criticalStrikeChance_+%': { level: 3, name: '', min: 1, max: 3 } },
      { 'criticalStrikeChance_+%': { level: 8, name: '', min: 3, max: 5 } },
      { 'criticalStrikeChance_+%': { level: 13, name: '', min: 5, max: 7 } },
      { 'criticalStrikeChance_+%': { level: 19, name: '', min: 8, max: 11 } },
   ],
   shield: [
      {
         'vitality_+f': { level: 1, name: '', min: 5, max: 10 },
         'magicShield_+f': { level: 1, name: '', min: 5, max: 10 },
      },
      {
         'vitality_+f': { level: 7, name: '', min: 15, max: 20 },
         'magicShield_+f': { level: 7, name: '', min: 15, max: 20 },
      },
      {
         'vitality_+f': { level: 12, name: '', min: 25, max: 30 },
         'magicShield_+f': { level: 12, name: '', min: 25, max: 30 },
      },
      {
         'vitality_+f': { level: 18, name: '', min: 35, max: 40 },
         'magicShield_+f': { level: 18, name: '', min: 35, max: 40 },
      },
   ],
   quiver: [
      {
         'bowDamages_+%': { level: 1, name: '', min: 2, max: 3 },
      },
      {
         'bowDamages_+%': { level: 7, name: '', min: 4, max: 7 },
      },
      {
         'bowDamages_+%': { level: 12, name: '', min: 10, max: 16 },
      },
      {
         'bowDamages_+%': { level: 18, name: '', min: 17, max: 23 },
      },
   ],
   orb: [
      {
         'wandDamages_+%': { level: 1, name: '', min: 2, max: 3 },
      },
      {
         'wandDamages_+%': { level: 7, name: '', min: 4, max: 7 },
      },
      {
         'wandDamages_+%': { level: 12, name: '', min: 10, max: 16 },
      },
      {
         'wandDamages_+%': { level: 18, name: '', min: 17, max: 23 },
      },
   ],
   relic: [],
   sword1H: [
      {
         'precision_+f': { level: 1, name: '', min: 20, max: 40 },
         'sword1HDamages_+f': { level: 1, name: '', min: 4, max: 10 },
      },
      {
         'precision_+f': { level: 7, name: '', min: 60, max: 80 },
         'sword1HDamages_+f': { level: 7, name: '', min: 12, max: 20 },
      },
      {
         'precision_+f': { level: 12, name: '', min: 100, max: 120 },
         'sword1HDamages_+f': { level: 12, name: '', min: 22, max: 30 },
      },
      {
         'precision_+f': { level: 18, name: '', min: 140, max: 160 },
         'sword1HDamages_+f': { level: 18, name: '', min: 32, max: 40 },
      },
   ],
   axe1H: [
      {
         'axe1HDamages_+f': { level: 1, name: '', min: 5, max: 12 },
      },
      {
         'axe1HDamages_+f': { level: 7, name: '', min: 14, max: 23 },
      },
      {
         'axe1HDamages_+f': { level: 12, name: '', min: 25, max: 34 },
      },
      {
         'axe1HDamages_+f': { level: 18, name: '', min: 36, max: 44 },
      },
   ],
   mace1H: [
      {
         'elementalDamages_+%': { level: 1, name: '', min: 1, max: 2 },
         'mace1HDamages_+f': { level: 1, name: '', min: 4, max: 10 },
      },
      {
         'elementalDamages_+%': { level: 7, name: '', min: 3, max: 5 },
         'mace1HDamages_+f': { level: 7, name: '', min: 12, max: 20 },
      },
      {
         'elementalDamages_+%': { level: 12, name: '', min: 7, max: 12 },
         'mace1HDamages_+f': { level: 12, name: '', min: 22, max: 30 },
      },
      {
         'elementalDamages_+%': { level: 18, name: '', min: 14, max: 17 },
         'mace1HDamages_+f': { level: 18, name: '', min: 32, max: 40 },
      },
   ],
   dagger: [
      {
         'criticalStrikeChance_+%': { level: 1, name: '', min: 1, max: 2 },
         'daggerDamages_+f': { level: 1, name: '', min: 2, max: 5 },
      },
      {
         'criticalStrikeChance_+%': { level: 7, name: '', min: 3, max: 5 },
         'daggerDamages_+f': { level: 7, name: '', min: 6, max: 10 },
      },
      {
         'criticalStrikeChance_+%': { level: 12, name: '', min: 7, max: 12 },
         'daggerDamages_+f': { level: 12, name: '', min: 11, max: 15 },
      },
      {
         'criticalStrikeChance_+%': { level: 18, name: '', min: 14, max: 17 },
         'daggerDamages_+f': { level: 18, name: '', min: 16, max: 20 },
      },
   ],
   wand: [
      {
         'elementalDamages_+%': { level: 1, name: '', min: 2, max: 3 },
         'wandDamages_+f': { level: 1, name: '', min: 3, max: 9 },
      },
      {
         'elementalDamages_+%': { level: 7, name: '', min: 4, max: 7 },
         'wandDamages_+f': { level: 7, name: '', min: 10, max: 19 },
      },
      {
         'elementalDamages_+%': { level: 12, name: '', min: 10, max: 16 },
         'wandDamages_+f': { level: 12, name: '', min: 20, max: 29 },
      },
      {
         'elementalDamages_+%': { level: 18, name: '', min: 17, max: 23 },
         'wandDamages_+f': { level: 18, name: '', min: 30, max: 39 },
      },
   ],
   sword2H: [
      {
         'precision_+f': { level: 1, name: '', min: 35, max: 70 },
         'sword2HDamages_+f': { level: 1, name: '', min: 7, max: 17 },
      },
      {
         'precision_+f': { level: 7, name: '', min: 105, max: 140 },
         'sword2HDamages_+f': { level: 7, name: '', min: 21, max: 35 },
      },
      {
         'precision_+f': { level: 12, name: '', min: 175, max: 210 },
         'sword2HDamages_+f': { level: 12, name: '', min: 38, max: 52 },
      },
      {
         'precision_+f': { level: 18, name: '', min: 245, max: 280 },
         'sword2HDamages_+f': { level: 18, name: '', min: 56, max: 70 },
      },
   ],
   axe2H: [
      {
         'axe2HDamages_+f': { level: 1, name: '', min: 9, max: 21 },
      },
      {
         'axe2HDamages_+f': { level: 7, name: '', min: 25, max: 41 },
      },
      {
         'axe2HDamages_+f': { level: 12, name: '', min: 44, max: 59 },
      },
      {
         'axe2HDamages_+f': { level: 18, name: '', min: 63, max: 77 },
      },
   ],
   mace2H: [
      {
         'elementalDamages_+%': { level: 1, name: '', min: 2, max: 4 },
         'mace2HDamages_+f': { level: 1, name: '', min: 7, max: 17 },
      },
      {
         'elementalDamages_+%': { level: 7, name: '', min: 6, max: 10 },
         'mace2HDamages_+f': { level: 7, name: '', min: 21, max: 35 },
      },
      {
         'elementalDamages_+%': { level: 12, name: '', min: 14, max: 24 },
         'mace2HDamages_+f': { level: 12, name: '', min: 38, max: 52 },
      },
      {
         'elementalDamages_+%': { level: 18, name: '', min: 28, max: 34 },
         'mace2HDamages_+f': { level: 18, name: '', min: 56, max: 70 },
      },
   ],
   bow: [
      {
         'criticalStrikeDamages_+%': { level: 1, name: '', min: 10, max: 20 },
         'bowDamages_+f': { level: 1, name: '', min: 5, max: 12 },
      },
      {
         'criticalStrikeDamages_+%': { level: 7, name: '', min: 25, max: 35 },
         'bowDamages_+f': { level: 7, name: '', min: 14, max: 23 },
      },
      {
         'criticalStrikeDamages_+%': { level: 12, name: '', min: 40, max: 50 },
         'bowDamages_+f': { level: 12, name: '', min: 25, max: 34 },
      },
      {
         'criticalStrikeDamages_+%': { level: 18, name: '', min: 55, max: 70 },
         'bowDamages_+f': { level: 18, name: '', min: 36, max: 44 },
      },
   ],
   staff: [
      {
         'elementalDamages_+%': { level: 1, name: '', min: 2, max: 4 },
         'staffDamages_+f': { level: 1, name: '', min: 5, max: 15 },
      },
      {
         'elementalDamages_+%': { level: 7, name: '', min: 6, max: 10 },
         'staffDamages_+f': { level: 7, name: '', min: 16, max: 30 },
      },
      {
         'elementalDamages_+%': { level: 12, name: '', min: 14, max: 24 },
         'staffDamages_+f': { level: 12, name: '', min: 31, max: 45 },
      },
      {
         'elementalDamages_+%': { level: 18, name: '', min: 28, max: 34 },
         'staffDamages_+f': { level: 18, name: '', min: 46, max: 60 },
      },
   ],
};
