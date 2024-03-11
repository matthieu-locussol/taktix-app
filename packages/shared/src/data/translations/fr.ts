import type { LanguageTranslations } from '../translations';
import { translationsEn } from './en';

export const translationsFr: LanguageTranslations = {
   ...translationsEn,
   serverStatus: '<b>Statut du serveur :</b> {{status}}',
   accessUniverse: "Accéder à l'univers",
   emailAddress: 'Adresse e-mail',
   username: "Nom d'utilisateur",
   password: 'Mot de passe',
   login: 'Se connecter',
   register: "S'inscrire",
   characterSelection: 'Sélection du personnage',
   characterCreation: 'Création du personnage',
   serverInMaintenance: 'Serveur en maintenance, veuillez réessayer plus tard.',
   memorizeCredentials: 'Mémoriser les identifiants',
   online: 'En ligne',
   offline: 'Hors ligne',
   maintenance: 'Maintenance',
   incorrectCredentials: 'Identifiants incorrects pour l’utilisateur "{{username}}"',
   loginInvalidation:
      'Vous avez été déconnecté car quelqu’un s’est connecté avec votre compte depuis un autre emplacement.',
   serverDisconnection: '[{{code}}] Vous avez été déconnecté du serveur',
   updateAvailable: 'Une nouvelle mise à jour est disponible : v{{version}}',
   updateAvailable_content: 'Veuillez mettre à jour pour continuer.',
   update: 'Mettre à jour',
   gameRestartNeeded_title: 'Redémarrage du jeu nécessaire',
   gameRestartNeeded_content: 'Afin de terminer la mise à jour, le jeu va devoir redémarrer !',
   restart: 'Redémarrer',
   saveCredentials_title: 'Enregistrement des identifiants',
   saveCredentials_content:
      'Si vous mémorisez vos identifiants, ils seront stockés dans votre navigateur. Cela pourrait vous exposer à un risque de piratage si une personne malintentionnée accède à votre ordinateur. Êtes-vous sûr de vouloir continuer ?',
   cancel: 'Annuler',
   memorize: 'Mémoriser',
   accountCreated: 'Compte créé ! Vous pouvez maintenant vous connecter.',
   emailAlreadyInUse: 'Adresse e-mail déjà utilisée !',
   usernameAlreadyInUse: 'Nom d’utilisateur déjà utilisé !',
   level: 'Niveau {{level}}',
   noCharacters: "Vous n'avez pas encore de personnage.",
   createNewCharacter: 'Créer un nouveau personnage',
   play: 'Jouer',
   deleteCharacter_title: 'Supprimer le personnage',
   deleteCharacter_content:
      'Êtes-vous sûr de vouloir supprimer <b>{{name}}</b> ? Cette action est irréversible et vous perdrez tout votre progrès et vos objets.',
   deleteCharacter_confirm: 'Veuillez confirmer votre mot de passe pour continuer.',
   delete: 'Supprimer',
   invalidPassword: 'Mot de passe invalide !',
   characterDoesNotExist: 'Le personnage "{{name}}" n’existe pas !',
   characterDeleted: 'Personnage supprimé',
   characterCreated: 'Personnage créé',
   characterDoesNotBelongToUser:
      'Le personnage "{{name}}" n’appartient pas à l’utilisateur "{{username}}" !',
   characterAlreadyExists: 'Le personnage "{{name}}" existe déjà !',
   maximumCharactersReached: 'Vous avez atteint le nombre maximum de personnages !',
   invalidCharacterName: `Nom invalide : seuls les lettres, les chiffres, le tiret bas et le tiret sont autorisés. Doit comporter entre 3 et 15 caractères. Aucun espace autorisé. Ne doit pas commencer par un tiret bas ou un tiret.`,
   characterName: 'Nom du personnage',
   create: 'Créer',
   back: 'Retour',
   community: 'Communauté',
   player: 'Joueur',
   levelRaw: 'Niveau',
   profession: 'Classe',
   onlinePlayers: 'Joueurs en ligne : <b>{{count}}</b>',
   close: 'Fermer',
   actions: 'Actions',
   settings: 'Paramètres',
   keyboardLayout: 'Disposition du clavier',
   arrows: 'Flèches',
   wasd: 'WASD',
   zqsd: 'ZQSD',
   displayLanguage: 'Langue d’affichage',
   fullscreenMode: 'Mode plein écran',
   resetDefaults: 'Réinitialiser',
   saveChanges: 'Enregistrer',
   updateError:
      "Désolé, une erreur s'est produite lors de la mise à jour de Taktix. Si cela se reproduit, essayez de réinstaller le jeu.",
   restartError:
      "Désolé, une erreur s'est produite lors du redémarrage de Taktix. Essayez de le redémarrer par vous-même.",
   use: 'Utiliser',
   teleportSystemUnimplemented: 'La téléportation n’est pas encore implémentée >.>',
   slap: 'Gifler',
   sendMessage: 'Envoyer un message',
   ouch: 'Aïe !',
   object: 'Objet',
   map: 'Carte',
   unknownMap: 'Inconnue',
   talentTree: 'Arbre de talents',

   // Professions
   Warrior: 'Guerrier',
   Mage: 'Mage',
   Archer: 'Archer',

   // Maps
   AAA_InitialRoom: 'Menu',
   CloudsRoom: 'Île volante',
   DungeonRoom: 'Donjon sanglant',
   ForestRoom: 'Forêt enchantée',
   HouseRoom: 'Maison du crack',

   // Channels
   Server: 'Serveur',
   Error: 'Erreur',
   General: 'Général',
   Trade: 'Commerce',
   Private: 'Privé',

   // Roles
   Player: 'Joueur',
   Admin: 'Administrateur',
   Moderator: 'Modérateur',

   // Discord rich presence
   playing: 'En jeu',
   inMenu: 'Dans le menu',
   inMap: 'Dans : {{map}}',

   // Interactive objects
   Teleporter: 'Téléporteur',

   // Entities
   Character: 'Joueur',
};
