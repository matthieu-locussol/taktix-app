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
   turn: 'Tour {{count}}',
   fighting: 'En combat',
   to: 'À {{name}}',
   from: 'De {{name}}',
   unknown: 'Inconnu',
   talk: 'Parler',
   mapMenu: 'Carte du monde',
   teleport: 'Se téléporter',
   startFight: 'Commencer le combat',
   save: 'Sauvegarder',
   noTeleportationPlaces: 'Aucun point de téléportation enregistré.',
   teleporterSaved: 'Point de téléportation enregistré !',
   teleporterNotSaved:
      'Impossible d’enregistrer le point de téléportation. Si le problème persiste, veuillez contacter le support.',
   position: 'Position',
   cost: 'Coût',
   creditsValue: '<b>Crédits :</b> {{value}}',
   inventory: 'Inventaire',
   requiredLevel: 'Niveau requis: {{level}}',
   strengthDamagesRange: '{{min}} à {{max}} dégâts de terre',
   dexterityDamagesRange: '{{min}} à {{max}} dégâts de vent',
   intelligenceDamagesRange: '{{min}} à {{max}} dégâts de feu',
   luckDamagesRange: '{{min}} à {{max}} dégâts de glace',
   nonoclicker: 'Nono clicker | Par EquimoX',
   gachixValue: '<b>Gachix :</b> {{value}}',
   recycle: 'Recycler',
   recycleMode: 'Mode recyclage',
   inventoryRecycle_title: 'Êtes vous-sûr ?',
   inventoryRecycle_content: 'Voulez-vous vraiment recycler ces objets ?',
   inventoryGachix_title: 'Recyclage terminé',
   inventoryGachix_content: 'Vous avez obtenu {{value}} Gachix.',
   fight: 'Combattre',
   sleep: 'Dormir',
   gamble: 'Jeter un gachix',
   typeAsc: 'Type (A-Z)',
   typeDesc: 'Type (Z-A)',
   rarityAsc: 'Rareté (Commun -> Unique)',
   rarityDesc: 'Rareté (Unique -> Commun)',
   levelAsc: 'Niveau (1 -> 200)',
   levelDesc: 'Niveau (200 -> 1)',
   noSort: 'Aucun tri',
   sortItems: 'Trier les objets',
   lootBonus: 'Bonus de butin',
   spin: 'Tourner la roue',
   gatcha_title: 'Puits à vœux',
   drinkWine: 'Boire un coup ({{value}} {{type}})',
   developer: 'Développeur',
   graveyardLadder_dialog:
      'Cette échelle semble mener quelque part, mais vous devrez attendre la prochaine mise à jour...',
   nono_dialog: 'Bordel il est passé où mon pinard ?',

   // Rarities
   common: 'Commun',
   uncommon: 'Peu commun',
   rare: 'Rare',
   epic: 'Épique',
   unique: 'Unique',

   // Items
   helmetE: 'Casque',
   helmetH: 'Heaume',
   helmetM: 'Chapeau',
   helmetEH: 'Casque lourd',
   helmetEM: 'Casque magique',
   helmetHM: 'Heaume magique',
   chestplateE: 'Plastron',
   chestplateH: 'Cuirasse',
   chestplateM: 'Tunique',
   chestplateEH: 'Plastron lourd',
   chestplateEM: 'Plastron magique',
   chestplateHM: 'Cuirasse magique',
   bootsE: 'Bottes',
   bootsH: 'Grèves',
   bootsM: 'Chaussures',
   bootsEH: 'Bottes lourdes',
   bootsEM: 'Bottes magiques',
   bootsHM: 'Grèves magiques',
   glovesE: 'Gants',
   glovesH: 'Gantelets',
   glovesM: 'Mitaines',
   glovesEH: 'Gants lourds',
   glovesEM: 'Gants magiques',
   glovesHM: 'Gantelets magiques',
   belt: 'Ceinture',
   amulet: 'Amulette',
   ring: 'Anneau',
   shield: 'Bouclier',
   quiver: 'Carquois',
   orb: 'Orbe',
   relic: 'Relique',
   sword1H: 'Épée à une main',
   axe1H: 'Hache à une main',
   mace1H: 'Masse à une main',
   dagger: 'Dague',
   wand: 'Baguette',
   sword2H: 'Épée à deux mains',
   axe2H: 'Hache à deux mains',
   mace2H: 'Masse à deux mains',
   bow: 'Arc',
   staff: 'Bâton',

   // Enemies
   'enemy-green-slime': 'Slime vert',
   'enemy-red-slime': 'Slime rouge',
   'enemy-blue-slime': 'Slime bleu',
   'enemy-pink-slime': 'Slime rose',
   'enemy-eyeboros': 'Oeilloboros',

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

   'vitality_+f_value': '+{{value}} vitalité',
   'vitality_+%_value': '+{{value}}% vitalité',
   'vitality_+x%_value': '+{{value}}% multiplicateur de la vitalité',
   'vitality_-f_value': '-{{value}} vitalité',
   'vitality_-%_value': '-{{value}}% vitalité',
   'vitality_-x%_value': '-{{value}}% multiplicateur de la vitalité',
   'magicShield_+f_value': '+{{value}} bouclier magique',
   'magicShield_+%_value': '+{{value}}% bouclier magique',
   'magicShield_+x%_value': '+{{value}}% multiplicateur du bouclier magique',
   'magicShield_-f_value': '-{{value}} bouclier magique',
   'magicShield_-%_value': '-{{value}}% bouclier magique',
   'magicShield_-x%_value': '-{{value}}% multiplicateur du bouclier magique',
   'strength_+f_value': '+{{value}} force',
   'strength_+%_value': '+{{value}}% force',
   'strength_+x%_value': '+{{value}}% multiplicateur de la force',
   'strength_-f_value': '-{{value}} force',
   'strength_-%_value': '-{{value}}% force',
   'strength_-x%_value': '-{{value}}% multiplicateur de la force',
   'dexterity_+f_value': '+{{value}} dextérité',
   'dexterity_+%_value': '+{{value}}% dextérité',
   'dexterity_+x%_value': '+{{value}}% multiplicateur de la dextérité',
   'dexterity_-f_value': '-{{value}} dextérité',
   'dexterity_-%_value': '-{{value}}% dextérité',
   'dexterity_-x%_value': '-{{value}}% multiplicateur de la dextérité',
   'intelligence_+f_value': '+{{value}} intelligence',
   'intelligence_+%_value': '+{{value}}% intelligence',
   'intelligence_+x%_value': '+{{value}}% multiplicateur de l’intelligence',
   'intelligence_-f_value': '-{{value}} intelligence',
   'intelligence_-%_value': '-{{value}}% intelligence',
   'intelligence_-x%_value': '-{{value}}% multiplicateur de l’intelligence',
   'luck_+f_value': '+{{value}} chance',
   'luck_+%_value': '+{{value}}% chance',
   'luck_+x%_value': '+{{value}}% multiplicateur de la chance',
   'luck_-f_value': '-{{value}} chance',
   'luck_-%_value': '-{{value}}% chance',
   'luck_-x%_value': '-{{value}}% multiplicateur de la chance',
   'allAttributes_+f_value': '+{{value}} à tous les attributs',
   'allAttributes_+%_value': '+{{value}}% à tous les attributs',
   'allAttributes_+x%_value': '+{{value}}% multiplicateur de tous les attributs',
   'allAttributes_-f_value': '-{{value}} à tous les attributs',
   'allAttributes_-%_value': '-{{value}}% à tous les attributs',
   'allAttributes_-x%_value': '-{{value}}% multiplicateur de tous les attributs',
   'earthDamages_+f_value': '+{{value}} dégâts de terre',
   'earthDamages_+%_value': '+{{value}}% dégâts de terre',
   'earthDamages_+x%_value': '+{{value}}% multiplicateur des dégâts de terre',
   'earthDamages_-f_value': '-{{value}} dégâts de terre',
   'earthDamages_-%_value': '-{{value}}% dégâts de terre',
   'earthDamages_-x%_value': '-{{value}}% multiplicateur des dégâts de terre',
   'windDamages_+f_value': '+{{value}} dégâts de vent',
   'windDamages_+%_value': '+{{value}}% dégâts de vent',
   'windDamages_+x%_value': '+{{value}}% multiplicateur des dégâts de vent',
   'windDamages_-f_value': '-{{value}} dégâts de vent',
   'windDamages_-%_value': '-{{value}}% dégâts de vent',
   'windDamages_-x%_value': '-{{value}}% multiplicateur des dégâts de vent',
   'fireDamages_+f_value': '+{{value}} dégâts de feu',
   'fireDamages_+%_value': '+{{value}}% dégâts de feu',
   'fireDamages_+x%_value': '+{{value}}% multiplicateur des dégâts de feu',
   'fireDamages_-f_value': '-{{value}} dégâts de feu',
   'fireDamages_-%_value': '-{{value}}% dégâts de feu',
   'fireDamages_-x%_value': '-{{value}}% multiplicateur des dégâts de feu',
   'iceDamages_+f_value': '+{{value}} dégâts de glace',
   'iceDamages_+%_value': '+{{value}}% dégâts de glace',
   'iceDamages_+x%_value': '+{{value}}% multiplicateur des dégâts de glace',
   'iceDamages_-f_value': '-{{value}} dégâts de glace',
   'iceDamages_-%_value': '-{{value}}% dégâts de glace',
   'iceDamages_-x%_value': '-{{value}}% multiplicateur des dégâts de glace',
   'elementalDamages_+f_value': '+{{value}} dégâts élémentaires',
   'elementalDamages_+%_value': '+{{value}}% dégâts élémentaires',
   'elementalDamages_+x%_value': '+{{value}}% multiplicateur des dégâts élémentaires',
   'elementalDamages_-f_value': '-{{value}} dégâts élémentaires',
   'elementalDamages_-%_value': '-{{value}}% dégâts élémentaires',
   'elementalDamages_-x%_value': '-{{value}}% multiplicateur des dégâts élémentaires',
   'sword1HDamages_+f_value': '+{{value}} dégâts d’épée à une main',
   'sword1HDamages_+%_value': '+{{value}}% dégâts d’épée à une main',
   'sword1HDamages_+x%_value': '+{{value}}% multiplicateur des dégâts d’épée à une main',
   'sword1HDamages_-f_value': '-{{value}} dégâts d’épée à une main',
   'sword1HDamages_-%_value': '-{{value}}% dégâts d’épée à une main',
   'sword1HDamages_-x%_value': '-{{value}}% multiplicateur des dégâts d’épée à une main',
   'axe1HDamages_+f_value': '+{{value}} dégâts de hache à une main',
   'axe1HDamages_+%_value': '+{{value}}% dégâts de hache à une main',
   'axe1HDamages_+x%_value': '+{{value}}% multiplicateur des dégâts de hache à une main',
   'axe1HDamages_-f_value': '-{{value}} dégâts de hache à une main',
   'axe1HDamages_-%_value': '-{{value}}% dégâts de hache à une main',
   'axe1HDamages_-x%_value': '-{{value}}% multiplicateur des dégâts de hache à une main',
   'mace1HDamages_+f_value': '+{{value}} dégâts de masse à une main',
   'mace1HDamages_+%_value': '+{{value}}% dégâts de masse à une main',
   'mace1HDamages_+x%_value': '+{{value}}% multiplicateur des dégâts de masse à une main',
   'mace1HDamages_-f_value': '-{{value}} dégâts de masse à une main',
   'mace1HDamages_-%_value': '-{{value}}% dégâts de masse à une main',
   'mace1HDamages_-x%_value': '-{{value}}% multiplicateur des dégâts de masse à une main',
   'daggerDamages_+f_value': '+{{value}} dégâts de dague',
   'daggerDamages_+%_value': '+{{value}}% dégâts de dague',
   'daggerDamages_+x%_value': '+{{value}}% multiplicateur des dégâts de dague',
   'daggerDamages_-f_value': '-{{value}} dégâts de dague',
   'daggerDamages_-%_value': '-{{value}}% dégâts de dague',
   'daggerDamages_-x%_value': '-{{value}}% multiplicateur des dégâts de dague',
   'wandDamages_+f_value': '+{{value}} dégâts de baguette',
   'wandDamages_+%_value': '+{{value}}% dégâts de baguette',
   'wandDamages_+x%_value': '+{{value}}% multiplicateur des dégâts de baguette',
   'wandDamages_-f_value': '-{{value}} dégâts de baguette',
   'wandDamages_-%_value': '-{{value}}% dégâts de baguette',
   'wandDamages_-x%_value': '-{{value}}% multiplicateur des dégâts de baguette',
   'sword2HDamages_+f_value': '+{{value}} dégâts d’épée à deux mains',
   'sword2HDamages_+%_value': '+{{value}}% dégâts d’épée à deux mains',
   'sword2HDamages_+x%_value': '+{{value}}% multiplicateur des dégâts d’épée à deux mains',
   'sword2HDamages_-f_value': '-{{value}} dégâts d’épée à deux mains',
   'sword2HDamages_-%_value': '-{{value}}% dégâts d’épée à deux mains',
   'sword2HDamages_-x%_value': '-{{value}}% multiplicateur des dégâts d’épée à deux mains',
   'axe2HDamages_+f_value': '+{{value}} dégâts de hache à deux mains',
   'axe2HDamages_+%_value': '+{{value}}% dégâts de hache à deux mains',
   'axe2HDamages_+x%_value': '+{{value}}% multiplicateur des dégâts de hache à deux mains',
   'axe2HDamages_-f_value': '-{{value}} dégâts de hache à deux mains',
   'axe2HDamages_-%_value': '-{{value}}% dégâts de hache à deux mains',
   'axe2HDamages_-x%_value': '-{{value}}% multiplicateur des dégâts de hache à deux mains',
   'mace2HDamages_+f_value': '+{{value}} dégâts de masse à deux mains',
   'mace2HDamages_+%_value': '+{{value}}% dégâts de masse à deux mains',
   'mace2HDamages_+x%_value': '+{{value}}% multiplicateur des dégâts de masse à deux mains',
   'mace2HDamages_-f_value': '-{{value}} dégâts de masse à deux mains',
   'mace2HDamages_-%_value': '-{{value}}% dégâts de masse à deux mains',
   'mace2HDamages_-x%_value': '-{{value}}% multiplicateur des dégâts de masse à deux mains',
   'bowDamages_+f_value': '+{{value}} dégâts d’arc',
   'bowDamages_+%_value': '+{{value}}% dégâts d’arc',
   'bowDamages_+x%_value': '+{{value}}% multiplicateur des dégâts d’arc',
   'bowDamages_-f_value': '-{{value}} dégâts d’arc',
   'bowDamages_-%_value': '-{{value}}% dégâts d’arc',
   'bowDamages_-x%_value': '-{{value}}% multiplicateur des dégâts d’arc',
   'staffDamages_+f_value': '+{{value}} dégâts de bâton',
   'staffDamages_+%_value': '+{{value}}% dégâts de bâton',
   'staffDamages_+x%_value': '+{{value}}% multiplicateur des dégâts de bâton',
   'staffDamages_-f_value': '-{{value}} dégâts de bâton',
   'staffDamages_-%_value': '-{{value}}% dégâts de bâton',
   'staffDamages_-x%_value': '-{{value}}% multiplicateur des dégâts de bâton',
   'earthResistance_+f_value': '+{{value}} résistance à la terre',
   'earthResistance_+%_value': '+{{value}}% résistance à la terre',
   'earthResistance_-f_value': '-{{value}} résistance à la terre',
   'earthResistance_-%_value': '-{{value}}% résistance à la terre',
   'windResistance_+f_value': '+{{value}} résistance au vent',
   'windResistance_+%_value': '+{{value}}% résistance au vent',
   'windResistance_-f_value': '-{{value}} résistance au vent',
   'windResistance_-%_value': '-{{value}}% résistance au vent',
   'fireResistance_+f_value': '+{{value}} résistance au feu',
   'fireResistance_+%_value': '+{{value}}% résistance au feu',
   'fireResistance_-f_value': '-{{value}} résistance au feu',
   'fireResistance_-%_value': '-{{value}}% résistance au feu',
   'iceResistance_+f_value': '+{{value}} résistance à la glace',
   'iceResistance_+%_value': '+{{value}}% résistance à la glace',
   'iceResistance_-f_value': '-{{value}} résistance à la glace',
   'iceResistance_-%_value': '-{{value}}% résistance à la glace',
   'elementalResistances_+f_value': '+{{value}} aux résistances élémentaires',
   'elementalResistances_+%_value': '+{{value}}% aux résistances élémentaires',
   'elementalResistances_-f_value': '-{{value}} aux résistances élémentaires',
   'elementalResistances_-%_value': '-{{value}}% aux résistances élémentaires',
   'initiative_+f_value': '+{{value}} initiative',
   'initiative_-f_value': '-{{value}} initiative',
   'precision_+f_value': '+{{value}} précision',
   'precision_+%_value': '+{{value}}% précision',
   'precision_-f_value': '-{{value}} précision',
   'precision_-%_value': '-{{value}}% précision',
   'evasion_+f_value': '+{{value}} évasion',
   'evasion_+%_value': '+{{value}}% évasion',
   'evasion_-f_value': '-{{value}} évasion',
   'evasion_-%_value': '-{{value}}% évasion',
   'lifeSteal_+f_value': '+{{value}} vol de vie',
   'lifeSteal_+%_value': '+{{value}}% vol de vie',
   'lifeSteal_-f_value': '-{{value}} vol de vie',
   'lifeSteal_-%_value': '-{{value}}% vol de vie',
   'criticalStrikeChance_+f_value': '+{{value}} chance de coup critique',
   'criticalStrikeChance_+%_value': '+{{value}}% chance de coup critique',
   'criticalStrikeDamages_+%_value': '+{{value}}% dégâts de coup critique',
   'criticalStrikeResistance_+f_value': '+{{value}} résistance au coup critique',
   'criticalStrikeResistance_+%_value': '+{{value}}% résistance au coup critique',
   'criticalStrikeChance_-f_value': '-{{value}} chance de coup critique',
   'criticalStrikeChance_-%_value': '-{{value}}% chance de coup critique',
   'criticalStrikeDamages_-%_value': '-{{value}}% dégâts de coup critique',
   'criticalStrikeResistance_-f_value': '-{{value}} résistance au coup critique',
   'criticalStrikeResistance_-%_value': '-{{value}}% résistance au coup critique',
   'areaOfEffect_+%_value': '+{{value}}% zone d’effet',
   'areaOfEffect_-%_value': '-{{value}}% zone d’effet',
   'thornsPhysical_+%_value': '+{{value}}% renvoi de dégâts physiques',
   'thornsMagical_+%_value': '+{{value}}% renvoi de dégâts magiques',
   'thornsPhysical_-%_value': '-{{value}}% renvoi de dégâts physiques',
   'thornsMagical_-%_value': '-{{value}}% renvoi de dégâts magiques',
   'prospect_+f_value': '+{{value}} prospection',
   'prospect_-f_value': '-{{value}} prospection',

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
   MoonshadowHamletRoom: "Hameau d'Ombrelune",
   MoonshadowInnRoom: 'Auberge d’Ombrelune',
   MoonshadowHotelRoom: 'Hôtel d’Ombrelune',
   MoonshadowBarRoom: 'Bar d’Ombrelune',
   MoonshadowShopRoom: 'Boutique d’Ombrelune',
   GraveyardRoom: 'Cimetière',

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
   TeleporterCell: 'Cellule de téléportation',
   Bed: 'Lit',
   Well: 'Puits',
   WineBottle: 'Bouteille de vin',
   GraveyardLadder: 'Échelle',

   // Entities
   Character: 'Joueur',
   NPC: 'PNJ',
   Monster: 'Monstre',

   // Talents
   'talent-1': 'Force',
   'talent-2': 'Vitalité & Force',
   'talent-3': 'Dégâts de terre',
   'talent-4': 'Dégâts de terre',
   'talent-5': 'Vitalité & Force',
   'talent-7': 'Amoureux de la terre',
   'talent-7-desc': 'Roches et pierres !',
   'talent-11': 'Talent 11',
   'talent-12': 'Talent 12',
   'talent-13': 'Talent 13',
   'talent-14': 'Talent 14',
   'talent-15': 'Talent 15',
   'talent-16': 'Talent 16',
   'talent-17': 'Talent 17',
   'talent-18': 'Talent 18',
   'talent-19': 'Talent 19',
   'talent-20': 'Talent 20',
   'talent-21': 'Talent 21',
   'talent-22': 'Talent 22',
   'talent-23': 'Talent 23',
   'talent-24': 'Talent 24',
   'talent-25': 'Talent 25',
   'talent-26': 'Talent 26',
   'talent-27': 'Talent 27',
   'talent-28': 'Talent 28',
   'talent-29': 'Talent 29',
   'talent-30': 'Talent 30',
   'talent-31': 'Talent 31',
   'talent-32': 'Talent 32',
   'talent-33': 'Talent 33',
   'talent-34': 'Talent 34',
   'talent-35': 'Talent 35',
   'talent-36': 'Talent 36',
   'talent-37': 'Talent 37',
   'talent-38': 'Talent 38',
   'talent-39': 'Talent 39',
   'talent-40': 'Talent 40',
   'talent-41': 'Talent 41',
   'talent-42': 'Talent 42',
   'talent-43': 'Talent 43',
   'talent-44': 'Talent 44',
   'talent-45': 'Talent 45',
   'talent-46': 'Talent 46',
   'talent-47': 'Talent 47',
   'talent-48': 'Talent 48',
   'talent-49': 'Intelligence',
   'talent-50': 'Bouclier magique',
   'talent-51': 'Dégâts de feu',
   'talent-52': 'Bouclier magique',
   'talent-53': 'Dégâts de feu',
   'talent-54': 'À travers le feu et les flammes',
   'talent-54-desc': 'À travers le feu et les flammes, nous avançons.',
   'talent-55': 'Talent 55',
   'talent-56': 'Talent 56',
   'talent-57': 'Talent 57',
   'talent-58': 'Talent 58',
   'talent-59': 'Talent 59',
   'talent-60': 'Talent 60',
   'talent-61': 'Talent 61',
   'talent-62': 'Talent 62',
   'talent-63': 'Talent 63',
   'talent-64': 'Talent 64',
   'talent-65': 'Talent 65',
   'talent-66': 'Talent 66',
   'talent-67': 'Talent 67',
   'talent-68': 'Talent 68',
   'talent-69': 'Talent 69',
   'talent-70': 'Talent 70',
   'talent-71': 'Talent 71',
   'talent-72': 'Talent 72',
   'talent-73': 'Talent 73',
   'talent-74': 'Talent 74',
   'talent-75': 'Talent 75',
   'talent-76': 'Talent 76',
   'talent-77': 'Talent 77',
   'talent-78': 'Talent 78',
   'talent-79': 'Talent 79',
   'talent-80': 'Talent 80',
   'talent-81': 'Talent 81',
   'talent-82': 'Talent 82',
   'talent-83': 'Talent 83',
   'talent-84': 'Talent 84',
   'talent-85': 'Talent 85',
   'talent-86': 'Talent 86',
   'talent-87': 'Talent 87',
   'talent-88': 'Talent 88',
   'talent-89': 'Talent 89',
   'talent-90': 'Talent 90',
   'talent-91': 'Talent 91',
   'talent-92': 'Talent 92',
   'talent-93': 'Talent 93',
   'talent-94': 'Talent 94',
   'talent-95': 'Talent 95',
   'talent-96': 'Talent 96',
   'talent-97': 'Talent 97',
   'talent-98': 'Talent 98',
   'talent-99': 'Talent 99',
   'talent-100': 'Talent 100',
   'talent-101': 'Talent 101',
   'talent-102': 'Talent 102',
   'talent-103': 'Talent 103',
   'talent-104': 'Talent 104',
   'talent-105': 'Talent 105',
   'talent-108': 'Talent 108',
   'talent-109': 'Talent 109',
   'talent-110': 'Chance',
   'talent-111': 'Dégâts de glace',
   'talent-112': 'Évasion',
   'talent-113': 'Prospection',
   'talent-114': 'Bouclier magique',
   'talent-115': 'Veines de glace',
   'talent-115-desc': 'Tu es la glace, tu es le froid.',
   'talent-116': 'Talent 116',
   'talent-117': 'Talent 117',
   'talent-118': 'Talent 118',
   'talent-119': 'Talent 119',
   'talent-120': 'Talent 120',
   'talent-121': 'Talent 121',
   'talent-122': 'Talent 122',
   'talent-123': 'Talent 123',
   'talent-124': 'Talent 124',
   'talent-125': 'Talent 125',
   'talent-126': 'Talent 126',
   'talent-127': 'Talent 127',
   'talent-128': 'Talent 128',
   'talent-129': 'Talent 129',
   'talent-130': 'Talent 130',
   'talent-131': 'Talent 131',
   'talent-132': 'Talent 132',
   'talent-133': 'Talent 133',
   'talent-134': 'Talent 134',
   'talent-135': 'Talent 135',
   'talent-136': 'Talent 136',
   'talent-137': 'Talent 137',
   'talent-138': 'Talent 138',
   'talent-139': 'Talent 139',
   'talent-140': 'Dextérité',
   'talent-141': 'Dégâts de vent',
   'talent-142': 'Évasion',
   'talent-143': 'Dégâts de vent',
   'talent-144': 'Évasion',
   'talent-145': 'Maître de l’air',
   'talent-145-desc': 'La vie apparaît où que vous soyez, que vous la créiez ou non.',
   'talent-146': 'Talent 146',
   'talent-147': 'Talent 147',
   'talent-148': 'Talent 148',
   'talent-149': 'Talent 149',
   'talent-150': 'Talent 150',
   'talent-151': 'Talent 151',
   'talent-152': 'Talent 152',
   'talent-153': 'Talent 153',
   'talent-154': 'Talent 154',
   'talent-155': 'Talent 155',
   'talent-156': 'Talent 156',
   'talent-157': 'Talent 157',
   'talent-158': 'Talent 158',
   'talent-159': 'Talent 159',
   'talent-160': 'Talent 160',
   'talent-161': 'Talent 161',
   'talent-162': 'Talent 162',
   'talent-163': 'Talent 163',
   'talent-164': 'Talent 164',
   'talent-165': 'Talent 165',
   'talent-166': 'Talent 166',
   'talent-167': 'Talent 167',
   'talent-168': 'Talent 168',
   'talent-169': 'Talent 169',
   'talent-171': 'Talent 171',
   'talent-172': 'Talent 172',
   'talent-173': 'Talent 173',
   'talent-174': 'Talent 174',
   'talent-175': 'Talent 175',
   'talent-176': 'Talent 176',
   'talent-178': 'Talent 178',
   'talent-179': 'Talent 179',
   'talent-180': 'Talent 180',
   'talent-181': 'Talent 181',
   'talent-182': 'Talent 182',
   'talent-183': 'Talent 183',
   'talent-184': 'Talent 184',
   'talent-185': 'Talent 185',
   'talent-186': 'Talent 186',
   'talent-187': 'Talent 187',
   'talent-188': 'Talent 188',
   'talent-189': 'Talent 189',
   'talent-190': 'Talent 190',
   'talent-191': 'Talent 191',
   'talent-192': 'Talent 192',
   'talent-193': 'Talent 193',
   'talent-194': 'Talent 194',
   'talent-195': 'Talent 195',
   'talent-196': 'Talent 196',
   'talent-197': 'Talent 197',
   'talent-198': 'Talent 198',
   'talent-199': 'Talent 199',
   'talent-200': 'Talent 200',
   'talent-201': 'Talent 201',
   'talent-202': 'Talent 202',
   'talent-203': 'Talent 203',
   'talent-204': 'Talent 204',
   'talent-205': 'Talent 205',
   'talent-206': 'Talent 206',
   'talent-207': 'Talent 207',
   'talent-208': 'Talent 208',
   'talent-209': 'Talent 209',
   'talent-210': 'Talent 210',
   'talent-211': 'Talent 211',
   'talent-212': 'Talent 212',
   'talent-213': 'Talent 213',
   'talent-214': 'Talent 214',
   'talent-215': 'Talent 215',
   'talent-216': 'Talent 216',
   'talent-217': 'Talent 217',
   'talent-218': 'Talent 218',
   'talent-219': 'Talent 219',
   'talent-220': 'Talent 220',
   'talent-221': 'Talent 221',
   'talent-222': 'Talent 222',
   'talent-223': 'Talent 223',
   'talent-224': 'Talent 224',
   'talent-225': 'Talent 225',
   'talent-226': 'Talent 226',
   'talent-227': 'Talent 227',
   'talent-228': 'Talent 228',
   'talent-229': 'Talent 229',
   'talent-230': 'Talent 230',
   'talent-231': 'Talent 231',
   'talent-232': 'Talent 232',
   'talent-233': 'Talent 233',
   'talent-234': 'Dégâts de vent',
   'talent-235': 'Dégâts de glace',
   'talent-236': 'Dégâts de glace & de feu',
   'talent-237': 'Dégâts de vent',
   'talent-238': 'Dégâts de vent & de feu',
   'talent-239': 'Dégâts de feu',
   'talent-240': 'Dégâts de glace',
   'talent-241': 'Dégâts de terre',
   'talent-242': 'Dégâts de glace & de terre',
   'talent-243': 'Dégâts de terre',
   'talent-244': 'Dégâts de terre & de feu',
   'talent-245': 'Dégâts de feu',
   'talent-246': 'Talent 246',
   'talent-247': 'Talent 247',
   'talent-248': 'Talent 248',
   'talent-249': 'Talent 249',
   'talent-251': 'Talent 251',
   'talent-252': 'Talent 252',
   'talent-253': 'Talent 253',
   'talent-254': 'Talent 254',
   'talent-256': 'Talent 256',
   'talent-257': 'Talent 257',
   'talent-258': 'Talent 258',
   'talent-259': 'Talent 259',
   'talent-260': 'Talent 260',
   'talent-261': 'Talent 261',
   'talent-262': 'Talent 262',
   'talent-263': 'Talent 263',
   'talent-264': 'Talent 264',
   'talent-265': 'Talent 265',
   'talent-266': 'Talent 266',
   'talent-267': 'Talent 267',
   'talent-268': 'Talent 268',
   'talent-269': 'Talent 269',
   'talent-270': 'Talent 270',
   'talent-271': 'Talent 271',
   'talent-272': 'Talent 272',
   'talent-273': 'Talent 273',
   'talent-274': 'Talent 274',
   'talent-275': 'Talent 275',
   'talent-276': 'Talent 276',
   'talent-277': 'Talent 277',
   'talent-278': 'Talent 278',
   'talent-279': 'Talent 279',
   'talent-280': 'Talent 280',
   'talent-281': 'Talent 281',
   'talent-282': 'Talent 282',
   'talent-283': 'Talent 283',
   'talent-284': 'Talent 284',
   'talent-285': 'Talent 285',
   'talent-286': 'Talent 286',
   'talent-287': 'Talent 287',
   'talent-288': 'Talent 288',
   'talent-289': 'Talent 289',
   'talent-290': 'Talent 290',
   'talent-291': 'Talent 291',
   'talent-292': 'Talent 292',
   'talent-293': 'Talent 293',
   'talent-294': 'Talent 294',
   'talent-295': 'Talent 295',
   'talent-296': 'Talent 296',
   'talent-297': 'Talent 297',
   'talent-298': 'Talent 298',
   'talent-299': 'Talent 299',
   'talent-300': 'Talent 300',
   'talent-301': 'Talent 301',
   'talent-302': 'Talent 302',
   'talent-303': 'Talent 303',
   'talent-304': 'Talent 304',
   'talent-305': 'Talent 305',
   'talent-306': 'Talent 306',
   'talent-307': 'Talent 307',
   'talent-308': 'Talent 308',
   'talent-309': 'Talent 309',
   'talent-310': 'Talent 310',
   'talent-311': 'Talent 311',
   'talent-312': 'Talent 312',
   'talent-313': 'Talent 313',
   'talent-314': 'Talent 314',
   'talent-316': 'Talent 316',
   'talent-317': 'Talent 317',
   'talent-318': 'Talent 318',
   'talent-319': 'Talent 319',
   'talent-320': 'Talent 320',
   'talent-321': 'Talent 321',
   'talent-322': 'Talent 322',
   'talent-323': 'Talent 323',
};
