#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

mod discord;
use discord::DiscordState;

fn main() {
   tauri::Builder
      ::default()
      .manage(DiscordState::new())
      .invoke_handler(tauri::generate_handler![discord::set_discord_rich_presence])
      .run(tauri::generate_context!())
      .expect("An error occured while running Taktix");
}
