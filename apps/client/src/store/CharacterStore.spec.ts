import { describe, expect, it } from 'vitest';
import { CharacterStore } from './CharacterStore';

describe('CharacterStore', () => {
   it('should be initialized', () => {
      const store = new CharacterStore();

      expect(store).toBeDefined();
      expect(store.map).toEqual('');
      expect(store.name).toEqual('');
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
});
