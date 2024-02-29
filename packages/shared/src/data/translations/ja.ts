import type { LanguageTranslations } from '../translations';
import { translationsEn } from './en';

export const translationsJa: LanguageTranslations = {
   ...translationsEn,
   serverStatus: '<b>サーバーステータス：</b>{{status}}',
   accessUniverse: '宇宙にアクセス',
   emailAddress: 'メールアドレス',
   username: 'ユーザー名',
   password: 'パスワード',
   login: 'ログイン',
   register: '登録',
   characterSelection: 'キャラクター選択',
   characterCreation: 'キャラクター作成',
   serverInMaintenance: 'サーバーはメンテナンス中です。後でもう一度お試しください。',
   memorizeCredentials: '資格情報を記憶する',
   online: 'オンライン',
   offline: 'オフライン',
   maintenance: 'メンテナンス',
   incorrectCredentials: 'ユーザー "{{username}}" の資格情報が間違っています',
   loginInvalidation: '他の場所からあなたのアカウントでログインしたため、切断されました。',
   serverDisconnection: '[{{code}}] サーバーから切断されました',
   updateAvailable: '新しいアップデートが利用可能です：v{{version}}',
   updateAvailable_content: '続行するには更新してください。',
   update: '更新',
   gameRestartNeeded_title: 'ゲームの再起動が必要です',
   gameRestartNeeded_content: 'アップデートを完了するために、ゲームを再起動する必要があります！',
   restart: '再起動',
   saveCredentials_title: '資格情報の保存',
   saveCredentials_content:
      '資格情報を記憶すると、それらはブラウザに保存されます。悪意のある人があなたのコンピュータにアクセスした場合、ハッキングのリスクにさらされる可能性があります。続行しますか？',
   cancel: 'キャンセル',
   memorize: '記憶する',
   accountCreated: 'アカウントが作成されました！ これでログインできます。',
   emailAlreadyInUse: 'メールアドレスは既に使用されています！',
   usernameAlreadyInUse: 'ユーザー名は既に使用されています！',
   level: 'レベル{{level}}',
   noCharacters: 'まだキャラクターがありません。',
   createNewCharacter: '新しいキャラクターを作成',
   play: 'プレイ',
   deleteCharacter_title: 'キャラクターを削除',
   deleteCharacter_content:
      '<b>{{name}}</b>を削除してもよろしいですか？ この操作は取り消すことができず、すべての進行状況とアイテムが失われます。',
   deleteCharacter_confirm: '続行するにはパスワードを確認してください。',
   delete: '削除',
   invalidPassword: '無効なパスワード！',
   characterDoesNotExist: 'キャラクター "{{name}}" は存在しません！',
   characterDeleted: 'キャラクターが削除されました',
   characterCreated: 'キャラクターが作成されました',
   characterDoesNotBelongToUser:
      'キャラクター "{{name}}" はユーザー "{{username}}" に属していません！',
   characterAlreadyExists: 'キャラクター "{{name}}" は既に存在します！',
   maximumCharactersReached: 'キャラクターの最大数に達しました！',
   invalidCharacterName: `無効な名前：文字、数字、アンダースコア、ハイフンのみが許可されます。3〜15文字の間である必要があります。スペースは許可されません。アンダースコアまたはハイフンで始まってはいけません。`,
   characterName: 'キャラクター名',
   create: '作成',
   back: '戻る',
   community: 'コミュニティ',
   player: 'プレイヤー',
   levelRaw: 'レベル',
   profession: '職業',
   onlinePlayers: 'オンラインプレイヤー：<b>{{count}}</b>',
   close: '閉じる',
   actions: 'アクション',
   settings: '設定',
   keyboardLayout: 'キーボードレイアウト',
   arrows: '矢印',
   wasd: 'WASD',
   zqsd: 'ZQSD',
   displayLanguage: '表示言語',
   fullscreenMode: '全画面モード',
   resetDefaults: 'デフォルトにリセット',
   saveChanges: '保存',
   updateError:
      '申し訳ありませんが、Taktixの更新中にエラーが発生しました。再度発生した場合は、ゲームを再インストールしてみてください。',
   restartError:
      '申し訳ありませんが、Taktixを再起動中にエラーが発生しました。自分で再起動してみてください。',
   use: '使用',
   teleportSystemUnimplemented: 'テレポートはまだ実装されていません >.>',
   slap: '平手打ち',
   sendMessage: 'メッセージを送る',
   ouch: '痛い！',
   object: 'オブジェクト',
   map: 'マップ',
   unknownMap: '不明',

   // Professions
   Warrior: '戦士',
   Mage: '魔法使い',
   Archer: '射手',

   // Maps
   AAA_InitialRoom: 'メニュー',
   CloudsRoom: '飛行島',
   DungeonRoom: '血のダンジョン',
   ForestRoom: '魔法の森',
   HouseRoom: 'クラックハウス',

   // Channels
   Server: 'サーバー',
   Error: 'エラー',
   General: '一般',
   Trade: '貿易',
   Private: 'プライベート',

   // Roles
   Player: 'プレイヤー',
   Admin: '管理者',
   Moderator: 'モデレーター',

   // Discord rich presence
   playing: 'プレイ中',
   inMenu: 'メニュー内',
   inMap: '場所：{{map}}',

   // Interactive objects
   Teleporter: 'テレポーター',

   // Entities
   Character: 'プレイヤー',
};
