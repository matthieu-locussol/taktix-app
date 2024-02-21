import { describe, expect, it, vi } from 'vitest';
import { setDiscordRichPresence } from './discord';

const mocks = vi.hoisted(() => ({
   invoke: vi.fn(),
}));

vi.mock('@tauri-apps/api/tauri', () => ({
   invoke: mocks.invoke,
}));

describe('discord', () => {
   describe('setDiscordRichPresence', () => {
      it('should call the tauri invoke method with the correct arguments', async () => {
         const payload = {
            state: 'state',
            details: 'details',
            large_image: 'large_image',
            large_text: 'large_text',
            timestamp: 123456,
         };

         await setDiscordRichPresence(payload);

         expect(mocks.invoke).toHaveBeenCalledWith('set_discord_rich_presence', { payload });
      });
   });
});
