import { expect, test } from 'vitest';
import { CharacterStore } from './CharacterStore';

test('should have a name', () => {
   const store = new CharacterStore();
   expect(store.name).toBe('');
});

test('should set the name', () => {
   const store = new CharacterStore();
   store.setName('John');
   expect(store.name).toBe('John');
});

test('should set the position', () => {
   const store = new CharacterStore();
   store.setPosition({ x: 1, y: 2 });
   expect(store.position).toEqual({ x: 1, y: 2 });
});

test('should set the position x', () => {
   const store = new CharacterStore();
   store.setPositionX(1);
   expect(store.position).toEqual({ x: 1, y: 0 });
});

test('should set the position y', () => {
   const store = new CharacterStore();
   store.setPositionY(2);
   expect(store.position).toEqual({ x: 0, y: 2 });
});
