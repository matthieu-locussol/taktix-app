import { invoke } from '@tauri-apps/api/tauri';

interface DiscordRichPresencePayloadBase {
   state: string;
   details: string;
   large_image: string;
   large_text: string;
   timestamp: number;
}

interface DiscordRichPresencePayloadWithSmallImage extends DiscordRichPresencePayloadBase {
   small_image: string;
   small_text: string;
}

export type DiscordRichPresencePayload =
   | DiscordRichPresencePayloadBase
   | DiscordRichPresencePayloadWithSmallImage;

export const setDiscordRichPresence = async (payload: DiscordRichPresencePayload) => {
   try {
      await invoke('set_discord_rich_presence', { payload });
   } catch (e) {
      console.error('Error setting activity:', e);
   }
};
