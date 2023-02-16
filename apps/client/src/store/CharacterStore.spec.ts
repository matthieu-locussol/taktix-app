import { expect, it } from 'vitest';
import { CharacterStore } from './CharacterStore';

it('should have a name', () => {
   const store = new CharacterStore();
   expect(store.name).toEqual('');
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
