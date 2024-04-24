#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

mod discord;
use discord::DiscordState;
use tauri::Manager;

fn main() {
    let app = tauri::Builder
        ::default()
        .manage(DiscordState::new())
        .invoke_handler(tauri::generate_handler![discord::set_discord_rich_presence])
        .build(tauri::generate_context!())
        .expect("An error occurred while running the application");

    app.run(|app_handle, event| {
        match event {
            tauri::RunEvent::Updater(updater_event) => {
                let main_window = app_handle.get_window("main");

                match updater_event {
                    tauri::UpdaterEvent::DownloadProgress { chunk_length, content_length } => {
                        if main_window.is_some() && content_length.is_some() {
                            let content_length: u64 = content_length.unwrap();
                            if content_length > 0 {
                                if
                                    let Err(err) = main_window
                                        .unwrap()
                                        .emit(
                                            "updateProgress",
                                            (chunk_length as f32) / (content_length as f32)
                                        )
                                {
                                    println!("{}", err);
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
