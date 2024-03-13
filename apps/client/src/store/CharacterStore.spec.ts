import { ProfessionType } from 'shared/src/types/Profession';
import { describe, expect, it } from 'vitest';
import { CharacterStore } from './CharacterStore';

describe('CharacterStore', () => {
   it('should be initialized', () => {
      const store = new CharacterStore();

      expect(store).toBeDefined();
      expect(store.map).toEqual('AAA_InitialRoom');
      expect(store.name).toEqual('');
      expect(store.profession).toEqual(ProfessionType.Warrior);
      expect(store.position).toEqual({ x: 0, y: 0 });
      expect(store.players).toHaveLength(0);
   });

   it('should set the map', () => {
      const store = new CharacterStore();
      store.setMap('CloudsRoom');
      expect(store.map).toBe('CloudsRoom');
   });

   it('should set the name', () => {
      const store = new CharacterStore();
      store.setName('John');
      expect(store.name).toBe('John');
   });

   it('should set the profession', () => {
      const store = new CharacterStore();
      store.setProfession(ProfessionType.Mage);
      expect(store.profession).toBe(ProfessionType.Mage);
   });

   it('should set the position', () => {
      const store = new CharacterStore();
      store.setPosition({ x: 1, y: 2 });
      expect(store.position).toEqual({ x: 1, y: 2 });
   });

   it('should set the position x', () => {
      const store = new CharacterStore();
      store.setPositionX(1);
      expect(store.position).toEqual({ x: 1, y: 0 });
   });

   it('should set the position y', () => {
      const store = new CharacterStore();
      store.setPositionY(2);
      expect(store.position).toEqual({ x: 0, y: 2 });
   });

   it('should set the talents', () => {
      const store = new CharacterStore();
      store.setTalents([1, 2, 3]);
      expect(store.talents).toEqual([1, 2, 3]);
   });

   it('should set the talents points', () => {
      const store = new CharacterStore();
      store.setTalentsPoints(5);
      expect(store.talentsPoints).toBe(5);
   });
});
