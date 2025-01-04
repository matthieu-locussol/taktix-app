import { describe, expect, it, vi } from 'vitest';

import { DialogMenuStore } from './DialogMenuStore.ts';
import { Store } from './Store.ts';

const mocks = vi.hoisted(() => ({
   enableKeyboard: vi.fn(),
}));

vi.mock('./Store', () => {
   const gameStoreMock = {
      enableKeyboard: mocks.enableKeyboard,
   };

   const MockedStore = vi.fn().mockImplementation(() => ({
      gameStore: gameStoreMock,
   }));

   return { Store: MockedStore };
});

describe('DialogMenuStore', () => {
   it('should be initialized', () => {
      const store = new DialogMenuStore(new Store());

      expect(store).toBeDefined();
      expect(store.dialogHeight).toBe(0);
      expect(store.items).toEqual([]);
      expect(store.hoveredItem).toBe(-1);
   });

   it('should open dialog', () => {
      const store = new DialogMenuStore(new Store());

      store.openDialog([]);

      expect(store.items).toEqual([]);
      expect(mocks.enableKeyboard).toHaveBeenCalledWith(false);
   });

   it('should select previous item', () => {
      const store = new DialogMenuStore(new Store());

      store.openDialog([
         {
            content: '1',
            name: '',
            choices: [
               {
                  text: '1',
                  callback: () => {
                     // Nothing to do
                  },
               },
               {
                  text: '2',
                  callback: () => {
                     // Nothing to do
                  },
               },
               {
                  text: '3',
                  callback: () => {
                     // Nothing to do
                  },
               },
            ],
         },
      ]);

      expect(store.hoveredItem).toBe(-1);

      store.selectPreviousItem();
      expect(store.hoveredItem).toBe(0);

      store.setHoveredItem(2);
      expect(store.hoveredItem).toBe(2);

      store.selectPreviousItem();
      expect(store.hoveredItem).toBe(1);
   });

   it('should select next item', () => {
      const store = new DialogMenuStore(new Store());

      store.openDialog([
         {
            content: '1',
            name: '',
            choices: [
               {
                  text: '1',
                  callback: () => {
                     // Nothing to do
                  },
               },
               {
                  text: '2',
                  callback: () => {
                     // Nothing to do
                  },
               },
               {
                  text: '3',
                  callback: () => {
                     // Nothing to do
                  },
               },
            ],
         },
      ]);

      expect(store.hoveredItem).toBe(-1);

      store.selectNextItem();
      expect(store.hoveredItem).toBe(0);

      store.setHoveredItem(1);
      expect(store.hoveredItem).toBe(1);

      store.selectNextItem();
      expect(store.hoveredItem).toBe(2);
   });

   it('should close dialog', () => {
      const store = new DialogMenuStore(new Store());

      store.openDialog([]);
      store.closeDialog();

      expect(store.items).toEqual([]);
      expect(mocks.enableKeyboard).toHaveBeenCalledWith(true);
   });

   it('should set dialog height', () => {
      const store = new DialogMenuStore(new Store());

      store.setDialogHeight(100);
      expect(store.dialogHeight).toBe(100);
   });

   it('shouled set hovered item', () => {
      const store = new DialogMenuStore(new Store());

      store.setHoveredItem(10);
      expect(store.hoveredItem).toBe(10);
   });

   it('should go to next dialog', () => {
      const store = new DialogMenuStore(new Store());

      store.nextDialog();
      expect(store.items).toEqual([]);

      store.openDialog([
         {
            content: '1',
            name: '',
            choices: [],
         },
      ]);

      store.nextDialog();
      expect(store.items).toEqual([]);

      store.openDialog([
         {
            content: '1',
            name: '',
         },
         {
            content: '2',
            name: '',
         },
      ]);

      store.nextDialog();
      expect(store.items).toEqual([
         {
            content: '2',
            name: '',
         },
      ]);

      store.nextDialog();
      expect(store.items).toEqual([]);

      const items = [
         {
            content: '1',
            name: '',
            choices: [
               {
                  text: '1',
                  callback: () => {
                     // Nothing to do
                  },
               },
            ],
         },
      ];

      store.openDialog(items);
      store.nextDialog();
      expect(store.items.toString()).toEqual(items.toString());
   });

   it('should go to next dialog from choice', () => {
      const store = new DialogMenuStore(new Store());

      const items = [
         {
            content: '1',
            name: '',
            choices: [
               {
                  text: '1',
                  callback: () => {
                     // Nothing to do
                  },
               },
            ],
         },
         {
            content: '2',
            name: '',
         },
      ];

      store.openDialog(items);

      store.nextDialogFromChoice();
      expect(store.items.toString()).toEqual(items.toString());

      store.setHoveredItem(0);
      store.nextDialogFromChoice();
      expect(store.items).toEqual([
         {
            content: '2',
            name: '',
         },
      ]);

      store.nextDialogFromChoice();
      expect(store.items).toEqual([
         {
            content: '2',
            name: '',
         },
      ]);

      store.nextDialog();
      expect(store.items).toEqual([]);
   });
});
