mod discord;

use discord::DiscordState;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
   let discord_state = DiscordState::new().ok();

   let app = tauri::Builder
      ::default()
      .plugin(tauri_plugin_process::init())
      .plugin(tauri_plugin_shell::init())
      .plugin(tauri_plugin_updater::Builder::new().build())
      .manage(discord_state)
      .invoke_handler(tauri::generate_handler![discord::set_discord_rich_presence])
      .build(tauri::generate_context!())
      .expect("An error occurred while running the application");

   app.run(|_app_handle, event| {
      match event {
         tauri::RunEvent::ExitRequested { api, .. } => {
            api.prevent_exit();
         }
         _ => {}
      }
   });
}
