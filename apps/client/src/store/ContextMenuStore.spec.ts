import { describe, expect, it, vi } from 'vitest';
import { InteractiveObject } from '../game/Scene';
import { EntityType } from '../utils/phaser';
import { ContextMenuStore } from './ContextMenuStore';
import { Store } from './Store';

vi.mock('./Store', () => {
   const characterStoreMock = {
      name: 'Player',
   };

   const MockedStore = vi.fn().mockImplementation(() => ({
      characterStore: characterStoreMock,
   }));

   return { Store: MockedStore };
});

describe('ContextMenuStore', () => {
   it('should be initialize', () => {
      const contextMenuStore = new ContextMenuStore(new Store());

      expect(contextMenuStore).toBeDefined();
      expect(contextMenuStore.isOpened).toBe(false);
      expect(contextMenuStore.positionX).toBe(0);
      expect(contextMenuStore.positionY).toBe(0);
      expect(contextMenuStore.sprites).toEqual([]);
      expect(contextMenuStore.interactiveObjects).toEqual([]);
      expect(contextMenuStore.currentSubMenu).toEqual([]);
      expect(contextMenuStore.currentSubMenuTitle).toBe('');
   });

   it('should open context menu', () => {
      const contextMenuStore = new ContextMenuStore(new Store());

      contextMenuStore.openContextMenu(1, 2, [], []);

      expect(contextMenuStore.isOpened).toBe(true);
      expect(contextMenuStore.positionX).toBe(1);
      expect(contextMenuStore.positionY).toBe(2);
   });

   it('should close context menu', () => {
      const contextMenuStore = new ContextMenuStore(new Store());

      contextMenuStore.openContextMenu(1, 2, [], []);
      contextMenuStore.closeContextMenu();

      expect(contextMenuStore.isOpened).toBe(false);
      expect(contextMenuStore.positionX).toBe(0);
      expect(contextMenuStore.positionY).toBe(0);
   });

   it('should return menu', () => {
      const contextMenuStore = new ContextMenuStore(new Store());

      expect(contextMenuStore.menu).toEqual([]);

      contextMenuStore.openContextMenu(
         1,
         2,
         [
            {
               getData: () => EntityType.Character,
               setData: () => {},
               name: 'External Player',
            } as unknown as Phaser.GameObjects.Sprite,
         ],
         [
            {
               polygon: { name: 'Teleporter', setData: () => {} },
            } as unknown as InteractiveObject,
         ],
      );

      expect(contextMenuStore.menu).toEqual([
         {
            text: '[Player] External Player',
            subMenu: [
               {
                  callback: expect.any(Function),
                  text: 'Send a message',
               },
            ],
         },
         {
            text: '[Object] Teleporter',
            subMenu: [
               {
                  callback: expect.any(Function),
                  text: 'Use',
               },
            ],
         },
      ]);
   });

   it('should set current sub menu', () => {
      const contextMenuStore = new ContextMenuStore(new Store());

      contextMenuStore.setCurrentSubMenu('Test', [
         {
            callback: () => {},
            text: 'Test menu element',
         },
      ]);

      expect(contextMenuStore.currentSubMenuTitle).toBe('Test');
      expect(contextMenuStore.currentSubMenu).toEqual([
         {
            callback: expect.any(Function),
            text: 'Test menu element',
         },
      ]);
   });
});
