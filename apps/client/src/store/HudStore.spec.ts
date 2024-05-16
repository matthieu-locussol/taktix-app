import { describe, expect, it, vi } from 'vitest';
import { HudStore } from './HudStore';
import { Store } from './Store';

const mocks = vi.hoisted(() => ({
   setGridVisibility: vi.fn(),
   setMinimapVisibility: vi.fn(),
   setTransparency: vi.fn(),
}));

vi.mock('./Store', () => {
   const gameStoreMock = {
      getCurrentScene: vi.fn().mockResolvedValue({
         setGridVisibility: mocks.setGridVisibility,
         setMinimapVisibility: mocks.setMinimapVisibility,
      }),
   };

   const soundsStoreMock = {
      play: () => ({}),
   };

   const MockedStore = vi.fn().mockImplementation(() => ({
      gameStore: gameStoreMock,
      soundsStore: soundsStoreMock,
   }));

   return { Store: MockedStore };
});

describe('HudStore', () => {
   it('should be initialized', () => {
      const store = new HudStore(new Store());

      expect(store).toBeDefined();
      expect(store.isGridVisible).toBe(false);
      expect(store.isMinimapVisible).toBe(true);
      expect(store.chatboxWidth).toBe(40);
      expect(store.chatboxHeight).toBe(15);
      expect(store.chatboxInputHeight).toBe(12);
      expect(store.isChatboxVisible).toBe(true);
      expect(store.characterWidth).toBe(20);
      expect(store.characterHeight).toBe(15);
      expect(store.isCharacterVisible).toBe(true);
      expect(store.menuWidth).toBe(40);
      expect(store.menuHeight).toBe(15);
      expect(store.isMenuVisible).toBe(true);
   });

   it('should toggle grid', async () => {
      const store = new HudStore(new Store());

      await store.toggleGrid();

      expect(store.isGridVisible).toBe(true);
      expect(mocks.setGridVisibility).toHaveBeenCalledWith(true);
   });

   it('should toggle minimap', async () => {
      const store = new HudStore(new Store());

      await store.toggleMinimap();

      expect(store.isMinimapVisible).toBe(false);
      expect(mocks.setMinimapVisibility).toHaveBeenCalledWith(false);
   });

   it('setChatboxWidth', () => {
      const store = new HudStore(new Store());
      store.setChatboxWidth(50);
      expect(store.chatboxWidth).toBe(50);
   });

   it('setChatboxHeight', () => {
      const store = new HudStore(new Store());
      store.setChatboxHeight(50);
      expect(store.chatboxHeight).toBe(50);
   });

   it('canIncreaseChatboxHeight', () => {
      const store = new HudStore(new Store());

      store.setChatboxHeight(100);
      expect(store.canIncreaseChatboxHeight).toBe(false);

      store.setChatboxHeight(50);
      expect(store.canIncreaseChatboxHeight).toBe(true);
   });

   it('increaseChatboxHeight', () => {
      const store = new HudStore(new Store());

      store.setChatboxHeight(15);
      store.increaseChatboxHeight();
      expect(store.chatboxHeight).toBe(30);

      store.increaseChatboxHeight();
      expect(store.chatboxHeight).toBe(100);
   });

   it('canDecreaseChatboxHeight', () => {
      const store = new HudStore(new Store());

      store.setChatboxHeight(100);
      expect(store.canDecreaseChatboxHeight).toBe(true);

      store.setChatboxHeight(15);
      expect(store.canDecreaseChatboxHeight).toBe(false);
   });

   it('decreaseChatboxHeight', () => {
      const store = new HudStore(new Store());

      store.setChatboxHeight(100);
      store.decreaseChatboxHeight();
      expect(store.chatboxHeight).toBe(30);

      store.decreaseChatboxHeight();
      expect(store.chatboxHeight).toBe(15);
   });

   it('setChatboxInputHeight', () => {
      const store = new HudStore(new Store());
      store.setChatboxInputHeight(50);
      expect(store.chatboxInputHeight).toBe(50);
   });

   it('toggleChatbox', () => {
      const store = new HudStore(new Store());
      store.toggleChatbox();
      expect(store.isChatboxVisible).toBe(false);
   });

   it('setCharacterWidth', () => {
      const store = new HudStore(new Store());
      store.setCharacterWidth(50);
      expect(store.characterWidth).toBe(50);
   });

   it('setCharacterHeight', () => {
      const store = new HudStore(new Store());
      store.setCharacterHeight(50);
      expect(store.characterHeight).toBe(50);
   });

   it('toggleCharacter', () => {
      const store = new HudStore(new Store());
      store.toggleCharacter();
      expect(store.isCharacterVisible).toBe(false);
   });

   it('setMenuWidth', () => {
      const store = new HudStore(new Store());
      store.setMenuWidth(50);
      expect(store.menuWidth).toBe(50);
   });

   it('setMenuHeight', () => {
      const store = new HudStore(new Store());
      store.setMenuHeight(50);
      expect(store.menuHeight).toBe(50);
   });

   it('toggleMenu', () => {
      const store = new HudStore(new Store());
      store.toggleMenu();
      expect(store.isMenuVisible).toBe(false);
   });
});
