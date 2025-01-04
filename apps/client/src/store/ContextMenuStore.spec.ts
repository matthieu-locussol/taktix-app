import type { InteractiveObjectPhaser } from '../game/Scene';

import { describe, expect, it, vi } from 'vitest';

import { EntityType } from '../utils/phaser';

import { ContextMenuStore } from './ContextMenuStore';
import { Store } from './Store';

vi.mock('./Store', () => {
   const characterStoreMock = {
      name: 'Player',
      teleporters: [],
   };

   const soundsStoreMock = {
      play: () => ({}),
   };

   const MockedStore = vi.fn().mockImplementation(() => ({
      characterStore: characterStoreMock,
      soundsStore: soundsStoreMock,
   }));

   return { Store: MockedStore };
});

vi.mock('i18next', () => ({
   default: {
      t: (str: string) => str,
   },
}));

vi.mock('../utils/phaser', () => {
   const moveToShape = vi.fn().mockImplementation(() => {
      // This is a mock
   });

   const EntityTypeMock = {
      Character: 'Character',
   };

   return { EntityType: EntityTypeMock, moveToShape };
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
               setData: () => {
                  // This is a mock
               },
               name: 'External Player',
            } as unknown as Phaser.GameObjects.Sprite,
         ],
         [
            {
               polygon: {
                  name: 'Teleporter',
                  setData: () => {
                     // This is a mock
                  },
               },
            } as unknown as InteractiveObjectPhaser,
         ],
      );

      expect(contextMenuStore.menu).toEqual([
         {
            text: 'External Player',
            subMenu: [
               {
                  callback: expect.any(Function),
                  text: 'sendMessage',
               },
            ],
         },
         {
            text: 'Teleporter',
            subMenu: [
               {
                  callback: expect.any(Function),
                  text: 'save',
                  disabled: false,
               },
               {
                  callback: expect.any(Function),
                  text: 'use',
               },
            ],
         },
      ]);
   });

   it('should set current sub menu', () => {
      const contextMenuStore = new ContextMenuStore(new Store());

      contextMenuStore.setCurrentSubMenu('Test', [
         {
            callback: () => {
               // This is a mock
            },
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
