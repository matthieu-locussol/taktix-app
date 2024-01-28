use crate::discord::activity::Timestamps;
use discord_rich_presence::{ activity, DiscordIpcClient };
use discord_rich_presence::DiscordIpc;
use tauri::command;
use std::sync::Mutex;

const DISCORD_CLIENT_ID: &str = "1200740796371054612";

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct DiscordRichPresencePayload {
   state: String,
   details: String,
   large_image: String,
   large_text: String,
   small_image: Option<String>,
   small_text: Option<String>,
   timestamp: i64,
}

pub struct DiscordState {
   client: Mutex<DiscordIpcClient>,
}

impl DiscordState {
   pub fn new() -> Self {
      let client = DiscordIpcClient::new(DISCORD_CLIENT_ID).expect(
         "Failed to create Discord IPC client"
      );
      DiscordState {
         client: Mutex::new(client),
      }
   }
}

#[command]
pub fn set_discord_rich_presence(
   payload: DiscordRichPresencePayload,
   discord_state: tauri::State<DiscordState>
) -> Result<(), String> {
   let mut client = discord_state.client.lock().unwrap();
   let mut assets = activity::Assets::new();

   client.connect().map_err(|e| e.to_string())?;

   if
      let (Some(small_image), Some(small_text)) = (
         payload.small_image.as_ref(),
         payload.small_text.as_ref(),
      )
   {
      assets = assets.small_image(small_image).small_text(small_text);
   }

   client
      .set_activity(
         activity::Activity
            ::new()
            .state(&payload.state)
            .details(&payload.details)
            .assets(assets.large_image(&payload.large_image).large_text(&payload.large_text))
            .timestamps(Timestamps::new().start(payload.timestamp))
            .buttons(
               [
                  activity::Button::new("Website", "https://taktix.vercel.app/"),
                  activity::Button::new("Discord", "https://discord.gg/9a9EVKTMkX"),
               ].to_vec()
            )
      )
      .map_err(|e| e.to_string())?;

   Ok(())
}
