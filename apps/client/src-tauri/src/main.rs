#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

mod discord;
use discord::DiscordState;
use tauri::Manager;

fn main() {
    let discord_state = DiscordState::new().ok();

    let app = tauri::Builder
        ::default()
        .manage(discord_state)
        .invoke_handler(tauri::generate_handler![discord::set_discord_rich_presence])
        .build(tauri::generate_context!())
        .expect("An error occurred while running the application");

    app.run(|app_handle, event| {
        match event {
            tauri::RunEvent::Updater(updater_event) => {
                let main_window = app_handle.get_window("main");

                match updater_event {
                    tauri::UpdaterEvent::DownloadProgress { chunk_length, content_length } => {
                        if let Some(window) = main_window {
                            if let Some(content_length) = content_length {
                                if content_length > 0 {
                                    let progress = (chunk_length as f32) / (content_length as f32);
                                    if let Err(err) = window.emit("updateProgress", progress) {
                                        println!("{}", err);
                                    }
                                }
                            }
                        }
                    }
                    _ => {}
                }
            }
            _ => {}
        }
    });
}
