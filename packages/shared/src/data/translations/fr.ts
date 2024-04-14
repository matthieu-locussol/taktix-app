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
   slap: 'Gifler',
   sendMessage: 'Envoyer un message',
   ouch: 'Aïe !',
   object: 'Objet',
   map: 'Carte',
   unknownMap: 'Inconnue',
   talentTree: 'Arbre de talents',
   talentPointsAvailable_one: '{{count}} point disponible',
   talentPointsAvailable_other: '{{count}} points disponibles',
   apply: 'Appliquer',
   statistics: 'Statistiques',
   experience: 'Expérience',
   vitality: 'Vitalité',
   magicShield: 'Bouclier magique',
   strength: 'Force',
   dexterity: 'Dextérité',
   intelligence: 'Intelligence',
   luck: 'Chance',
   statisticPointsAvailable: 'Points disponibles : <b>{{count}}</b>',
   advanced: 'Avancées',
   victory: 'Victoire',
   defeat: 'Défaite',
   name: 'Nom',
   credits: 'Crédits',
   loots: 'Butins',
   winners: 'Gagnants',
   losers: 'Perdants',
   turns_one: '{{count}} tour',
   turns_other: '{{count}} tours',

   // Enemies
   'enemy:nono': 'Nono, le petit robot',

   // Statistics
   'earthDamages_+f': 'Dégâts de terre',
   'earthDamages_+%': 'Augmentation des dégâts de terre (%)',
   'earthDamages_+x%': 'Multiplicateur des dégâts de terre (%)',
   'windDamages_+f': 'Dégâts de vent',
   'windDamages_+%': 'Augmentation des dégâts de vent (%)',
   'windDamages_+x%': 'Multiplicateur des dégâts de vent (%)',
   'fireDamages_+f': 'Dégâts de feu',
   'fireDamages_+%': 'Augmentation des dégâts de feu (%)',
   'fireDamages_+x%': 'Multiplicateur des dégâts de feu (%)',
   'iceDamages_+f': 'Dégâts de glace',
   'iceDamages_+%': 'Augmentation des dégâts de glace (%)',
   'iceDamages_+x%': 'Multiplicateur des dégâts de glace (%)',
   'sword1HDamages_+f': 'Dégâts d’épée à une main',
   'sword1HDamages_+%': 'Augmentation des dégâts d’épée à une main (%)',
   'sword1HDamages_+x%': 'Multiplicateur des dégâts d’épée à une main (%)',
   'axe1HDamages_+f': 'Dégâts de hache à une main',
   'axe1HDamages_+%': 'Augmentation des dégâts de hache à une main (%)',
   'axe1HDamages_+x%': 'Multiplicateur des dégâts de hache à une main (%)',
   'mace1HDamages_+f': 'Dégâts de masse à une main',
   'mace1HDamages_+%': 'Augmentation des dégâts de masse à une main (%)',
   'mace1HDamages_+x%': 'Multiplicateur des dégâts de masse à une main (%)',
   'daggerDamages_+f': 'Dégâts de dague',
   'daggerDamages_+%': 'Augmentation des dégâts de dague (%)',
   'daggerDamages_+x%': 'Multiplicateur des dégâts de dague (%)',
   'wandDamages_+f': 'Dégâts de baguette',
   'wandDamages_+%': 'Augmentation des dégâts de baguette (%)',
   'wandDamages_+x%': 'Multiplicateur des dégâts de baguette (%)',
   'sword2HDamages_+f': 'Dégâts d’épée à deux mains',
   'sword2HDamages_+%': 'Augmentation des dégâts d’épée à deux mains (%)',
   'sword2HDamages_+x%': 'Multiplicateur des dégâts d’épée à deux mains (%)',
   'axe2HDamages_+f': 'Dégâts de hache à deux mains',
   'axe2HDamages_+%': 'Augmentation des dégâts de hache à deux mains (%)',
   'axe2HDamages_+x%': 'Multiplicateur des dégâts de hache à deux mains (%)',
   'mace2HDamages_+f': 'Dégâts de masse à deux mains',
   'mace2HDamages_+%': 'Augmentation des dégâts de masse à deux mains (%)',
   'mace2HDamages_+x%': 'Multiplicateur des dégâts de masse à deux mains (%)',
   'bowDamages_+f': 'Dégâts d’arc',
   'bowDamages_+%': 'Augmentation des dégâts d’arc (%)',
   'bowDamages_+x%': 'Multiplicateur des dégâts d’arc (%)',
   'staffDamages_+f': 'Dégâts de bâton',
   'staffDamages_+%': 'Augmentation des dégâts de bâton (%)',
   'staffDamages_+x%': 'Multiplicateur des dégâts de bâton (%)',
   'earthResistance_+f': 'Résistance à la terre',
   'earthResistance_+%': 'Résistance à la terre (%)',
   'windResistance_+f': 'Résistance au vent',
   'windResistance_+%': 'Résistance au vent (%)',
   'fireResistance_+f': 'Résistance au feu',
   'fireResistance_+%': 'Résistance au feu (%)',
   'iceResistance_+f': 'Résistance à la glace',
   'iceResistance_+%': 'Résistance à la glace (%)',
   'initiative_+f': 'Initiative',
   'precision_+f': 'Précision',
   'precision_+%': 'Précision (%)',
   'evasion_+f': 'Évasion',
   'evasion_+%': 'Évasion (%)',
   'lifeSteal_+f': 'Vol de vie',
   'lifeSteal_+%': 'Vol de vie (%)',
   'criticalStrikeChance_+f': 'Chance de coup critique',
   'criticalStrikeChance_+%': 'Chance de coup critique (%)',
   'criticalStrikeDamages_+%': 'Dégâts de coup critique (%)',
   'criticalStrikeResistance_+f': 'Résistance au coup critique',
   'criticalStrikeResistance_+%': 'Résistance au coup critique (%)',
   'areaOfEffect_+%': 'Zone d’effet (%)',
   'thornsPhysical_+%': 'Renvoi de dégâts physiques (%)',
   'thornsMagical_+%': 'Renvoi de dégâts magiques (%)',
   'prospect_+f': 'Prospection',

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
