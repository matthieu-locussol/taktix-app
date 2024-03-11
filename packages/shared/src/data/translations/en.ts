export const translationsEn = {
   serverStatus: '<b>Server status:</b> {{status}}',
   accessUniverse: 'Access the universe',
   emailAddress: 'Email address',
   username: 'Username',
   password: 'Password',
   login: 'Log In',
   register: 'Register',
   characterSelection: 'Character Selection',
   characterCreation: 'Character Creation',
   serverInMaintenance: 'Server in maintenance, please try again later.',
   memorizeCredentials: 'Memorize credentials',
   online: 'Online',
   offline: 'Offline',
   maintenance: 'Maintenance',
   incorrectCredentials: 'Incorrect credentials for user "{{username}}"',
   loginInvalidation:
      'You have been disconnected because someone logged in with your account from another location.',
   serverDisconnection: '[{{code}}] You have been disconnected from the server',
   updateAvailable: 'A new update is available: v{{version}}',
   updateAvailable_content: 'Please update to continue.',
   update: 'Update',
   gameRestartNeeded_title: 'Game restart needed',
   gameRestartNeeded_content: 'In order to finish the update, the game will need to restart!',
   restart: 'Restart',
   saveCredentials_title: 'Saving credentials',
   saveCredentials_content:
      'If you memorize your credentials, they will be stored in your browser. It might expose you to a risk of being hacked if someone gets access to your computer. Are you sure you want to continue?',
   cancel: 'Cancel',
   memorize: 'Memorize',
   accountCreated: 'Account created! You can now login.',
   emailAlreadyInUse: 'Email already in use!',
   usernameAlreadyInUse: 'Username already in use!',
   level: 'Level {{level}}',
   noCharacters: "You don't have any characters yet.",
   createNewCharacter: 'Create a new character',
   play: 'Play',
   deleteCharacter_title: 'Delete character',
   deleteCharacter_content:
      'Are you sure you want to delete <b>{{name}}</b>? This action cannot be undone and you will lose all your progress and items.',
   deleteCharacter_confirm: 'Please confirm your password to proceed.',
   delete: 'Delete',
   invalidPassword: 'Invalid password!',
   characterDoesNotExist: 'Character "{{name}}" does not exist!',
   characterDeleted: 'Character deleted',
   characterCreated: 'Character created',
   characterDoesNotBelongToUser: 'Character "{{name}}" does not belong to user "{{username}}"!',
   characterAlreadyExists: 'Character "{{name}}" already exists!',
   maximumCharactersReached: 'You have reached the maximum number of characters!',
   invalidCharacterName:
      'Invalid name: only letters, numbers, underscore and hyphens are allowed. Must be between 3 and 15 characters. No spaces allowed. Should not start with an underscore or hyphen.',
   characterName: 'Character name',
   create: 'Create',
   back: 'Back',
   community: 'Community',
   player: 'Player',
   levelRaw: 'Level',
   profession: 'Profession',
   onlinePlayers: 'Players online: <b>{{count}}</b>',
   close: 'Close',
   actions: 'Actions',
   settings: 'Settings',
   keyboardLayout: 'Keyboard layout',
   arrows: 'Arrows',
   wasd: 'WASD',
   zqsd: 'ZQSD',
   displayLanguage: 'Display language',
   fullscreenMode: 'Fullscreen mode',
   resetDefaults: 'Reset to defaults',
   saveChanges: 'Save changes',
   updateError:
      'Sorry, an error occurred while updating Taktix. If it happens again, try reinstalling the game.',
   restartError: 'Sorry, an error occurred while restarting Taktix. Try restarting it by yourself.',
   use: 'Use',
   teleportSystemUnimplemented: 'Teleporting is not implemented yet >.>',
   slap: 'Slap',
   sendMessage: 'Send a message',
   ouch: 'Ouch!',
   object: 'Object',
   map: 'Map',
   unknownMap: 'Unknown',
   talentTree: 'Talent Tree',

   // Professions
   Warrior: 'Warrior',
   Mage: 'Mage',
   Archer: 'Archer',

   // Maps
   AAA_InitialRoom: 'Menu',
   CloudsRoom: 'Flying Island',
   DungeonRoom: 'Bloody Dungeon',
   ForestRoom: 'Magical Forest',
   HouseRoom: 'CrackHouse',

   // Channels
   Server: 'Server',
   Error: 'Error',
   General: 'General',
   Trade: 'Trade',
   Private: 'Private',

   // Roles
   Player: 'Player',
   Admin: 'Administrator',
   Moderator: 'Moderator',

   // Discord rich presence
   playing: 'Playing',
   inMenu: 'In Menu',
   inMap: 'In: {{map}}',

   // Interactive objects
   Teleporter: 'Teleporter',

   // Entities
   Character: 'Player',
} as const;
