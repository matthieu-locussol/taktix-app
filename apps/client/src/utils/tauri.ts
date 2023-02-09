declare global {
   interface Window {
      __TAURI__?: string;
   }
}

export const isTauri = () => window.__TAURI__ !== undefined;
