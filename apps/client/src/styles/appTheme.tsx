import { buttonClasses, menuItemClasses, toggleButtonClasses } from '@mui/material';
import { createTheme, darken } from '@mui/material/styles';
import { Channel } from 'shared/src/types/Channel';
import { ItemRarity } from 'shared/src/types/Item';
import { MonsterType } from 'shared/src/types/Monster';
import { RealStatistic, Statistic } from 'shared/src/types/Statistic';

export const STATS_COLORS = {
   vitality: '#ef4444',
   magicShield: '#8b5cf6',
   strength: '#854d0e',
   dexterity: '#10b981',
   intelligence: '#ef4444',
   luck: '#06b6d4',
   lifeSteal: '#f43f5e',
   thornsPhysical: '#854d0e',
   thornsMagical: '#8b5cf6',
};

export const MONSTER_TYPE_COLORS: Record<MonsterType, string> = {
   common: '#D1D5DB',
   magic: '#1d4ed8',
   rare: '#6d28d9',
   boss: '#854d0e',
};

export const ITEM_RARITY_COLORS: Record<ItemRarity, string> = {
   common: '#D1D5DB',
   uncommon: '#1d4ed8',
   rare: '#facc15',
   epic: '#6d28d9',
   unique: '#854d0e',
};

export const RAW_STATISTIC_TO_REAL_STATISTIC_COLORS: Record<Statistic, RealStatistic> = {
   'vitality_+f': 'vitality',
   'vitality_+%': 'vitality',
   'vitality_+x%': 'vitality',
   'vitality_-f': 'vitality',
   'vitality_-%': 'vitality',
   'vitality_-x%': 'vitality',
   'magicShield_+f': 'magicShield',
   'magicShield_+%': 'magicShield',
   'magicShield_+x%': 'magicShield',
   'magicShield_-f': 'magicShield',
   'magicShield_-%': 'magicShield',
   'magicShield_-x%': 'magicShield',
   'strength_+f': 'strength',
   'strength_+%': 'strength',
   'strength_+x%': 'strength',
   'strength_-f': 'strength',
   'strength_-%': 'strength',
   'strength_-x%': 'strength',
   'dexterity_+f': 'dexterity',
   'dexterity_+%': 'dexterity',
   'dexterity_+x%': 'dexterity',
   'dexterity_-f': 'dexterity',
   'dexterity_-%': 'dexterity',
   'dexterity_-x%': 'dexterity',
   'intelligence_+f': 'intelligence',
   'intelligence_+%': 'intelligence',
   'intelligence_+x%': 'intelligence',
   'intelligence_-f': 'intelligence',
   'intelligence_-%': 'intelligence',
   'intelligence_-x%': 'intelligence',
   'luck_+f': 'luck',
   'luck_+%': 'luck',
   'luck_+x%': 'luck',
   'luck_-f': 'luck',
   'luck_-%': 'luck',
   'luck_-x%': 'luck',
   'allAttributes_+f': 'magicShield',
   'allAttributes_+%': 'magicShield',
   'allAttributes_+x%': 'magicShield',
   'allAttributes_-f': 'magicShield',
   'allAttributes_-%': 'magicShield',
   'allAttributes_-x%': 'magicShield',
   'earthDamages_+f': 'earthDamages',
   'earthDamages_+%': 'earthDamages',
   'earthDamages_+x%': 'earthDamages',
   'earthDamages_-f': 'earthDamages',
   'earthDamages_-%': 'earthDamages',
   'earthDamages_-x%': 'earthDamages',
   'windDamages_+f': 'windDamages',
   'windDamages_+%': 'windDamages',
   'windDamages_+x%': 'windDamages',
   'windDamages_-f': 'windDamages',
   'windDamages_-%': 'windDamages',
   'windDamages_-x%': 'windDamages',
   'fireDamages_+f': 'fireDamages',
   'fireDamages_+%': 'fireDamages',
   'fireDamages_+x%': 'fireDamages',
   'fireDamages_-f': 'fireDamages',
   'fireDamages_-%': 'fireDamages',
   'fireDamages_-x%': 'fireDamages',
   'iceDamages_+f': 'iceDamages',
   'iceDamages_+%': 'iceDamages',
   'iceDamages_+x%': 'iceDamages',
   'iceDamages_-f': 'iceDamages',
   'iceDamages_-%': 'iceDamages',
   'iceDamages_-x%': 'iceDamages',
   'elementalDamages_+f': 'magicShield',
   'elementalDamages_+%': 'magicShield',
   'elementalDamages_+x%': 'magicShield',
   'elementalDamages_-f': 'magicShield',
   'elementalDamages_-%': 'magicShield',
   'elementalDamages_-x%': 'magicShield',
   'sword1HDamages_+f': 'sword1HDamages',
   'sword1HDamages_+%': 'sword1HDamages',
   'sword1HDamages_+x%': 'sword1HDamages',
   'sword1HDamages_-f': 'sword1HDamages',
   'sword1HDamages_-%': 'sword1HDamages',
   'sword1HDamages_-x%': 'sword1HDamages',
   'axe1HDamages_+f': 'axe1HDamages',
   'axe1HDamages_+%': 'axe1HDamages',
   'axe1HDamages_+x%': 'axe1HDamages',
   'axe1HDamages_-f': 'axe1HDamages',
   'axe1HDamages_-%': 'axe1HDamages',
   'axe1HDamages_-x%': 'axe1HDamages',
   'mace1HDamages_+f': 'mace1HDamages',
   'mace1HDamages_+%': 'mace1HDamages',
   'mace1HDamages_+x%': 'mace1HDamages',
   'mace1HDamages_-f': 'mace1HDamages',
   'mace1HDamages_-%': 'mace1HDamages',
   'mace1HDamages_-x%': 'mace1HDamages',
   'daggerDamages_+f': 'daggerDamages',
   'daggerDamages_+%': 'daggerDamages',
   'daggerDamages_+x%': 'daggerDamages',
   'daggerDamages_-f': 'daggerDamages',
   'daggerDamages_-%': 'daggerDamages',
   'daggerDamages_-x%': 'daggerDamages',
   'wandDamages_+f': 'wandDamages',
   'wandDamages_+%': 'wandDamages',
   'wandDamages_+x%': 'wandDamages',
   'wandDamages_-f': 'wandDamages',
   'wandDamages_-%': 'wandDamages',
   'wandDamages_-x%': 'wandDamages',
   'sword2HDamages_+f': 'sword2HDamages',
   'sword2HDamages_+%': 'sword2HDamages',
   'sword2HDamages_+x%': 'sword2HDamages',
   'sword2HDamages_-f': 'sword2HDamages',
   'sword2HDamages_-%': 'sword2HDamages',
   'sword2HDamages_-x%': 'sword2HDamages',
   'axe2HDamages_+f': 'axe2HDamages',
   'axe2HDamages_+%': 'axe2HDamages',
   'axe2HDamages_+x%': 'axe2HDamages',
   'axe2HDamages_-f': 'axe2HDamages',
   'axe2HDamages_-%': 'axe2HDamages',
   'axe2HDamages_-x%': 'axe2HDamages',
   'mace2HDamages_+f': 'mace2HDamages',
   'mace2HDamages_+%': 'mace2HDamages',
   'mace2HDamages_+x%': 'mace2HDamages',
   'mace2HDamages_-f': 'mace2HDamages',
   'mace2HDamages_-%': 'mace2HDamages',
   'mace2HDamages_-x%': 'mace2HDamages',
   'bowDamages_+f': 'bowDamages',
   'bowDamages_+%': 'bowDamages',
   'bowDamages_+x%': 'bowDamages',
   'bowDamages_-f': 'bowDamages',
   'bowDamages_-%': 'bowDamages',
   'bowDamages_-x%': 'bowDamages',
   'staffDamages_+f': 'staffDamages',
   'staffDamages_+%': 'staffDamages',
   'staffDamages_+x%': 'staffDamages',
   'staffDamages_-f': 'staffDamages',
   'staffDamages_-%': 'staffDamages',
   'staffDamages_-x%': 'staffDamages',
   'earthResistance_+f': 'earthResistance',
   'earthResistance_+%': 'earthResistance',
   'earthResistance_-f': 'earthResistance',
   'earthResistance_-%': 'earthResistance',
   'windResistance_+f': 'windResistance',
   'windResistance_+%': 'windResistance',
   'windResistance_-f': 'windResistance',
   'windResistance_-%': 'windResistance',
   'fireResistance_+f': 'fireResistance',
   'fireResistance_+%': 'fireResistance',
   'fireResistance_-f': 'fireResistance',
   'fireResistance_-%': 'fireResistance',
   'iceResistance_+f': 'iceResistance',
   'iceResistance_+%': 'iceResistance',
   'iceResistance_-f': 'iceResistance',
   'iceResistance_-%': 'iceResistance',
   'elementalResistances_+f': 'magicShield',
   'elementalResistances_+%': 'magicShield',
   'elementalResistances_-f': 'magicShield',
   'elementalResistances_-%': 'magicShield',
   'initiative_+f': 'initiative',
   'initiative_-f': 'initiative',
   'precision_+f': 'precision',
   'precision_+%': 'precision',
   'precision_-f': 'precision',
   'precision_-%': 'precision',
   'evasion_+f': 'evasion',
   'evasion_+%': 'evasion',
   'evasion_-f': 'evasion',
   'evasion_-%': 'evasion',
   'lifeSteal_+f': 'lifeSteal',
   'lifeSteal_+%': 'lifeSteal',
   'lifeSteal_-f': 'lifeSteal',
   'lifeSteal_-%': 'lifeSteal',
   'criticalStrikeChance_+f': 'criticalStrikeChance',
   'criticalStrikeChance_+%': 'criticalStrikeChance',
   'criticalStrikeDamages_+%': 'criticalStrikeDamages',
   'criticalStrikeResistance_+f': 'criticalStrikeResistance',
   'criticalStrikeResistance_+%': 'criticalStrikeResistance',
   'criticalStrikeChance_-f': 'criticalStrikeChance',
   'criticalStrikeChance_-%': 'criticalStrikeChance',
   'criticalStrikeDamages_-%': 'criticalStrikeDamages',
   'criticalStrikeResistance_-f': 'criticalStrikeResistance',
   'criticalStrikeResistance_-%': 'criticalStrikeResistance',
   'areaOfEffect_+%': 'areaOfEffect',
   'areaOfEffect_-%': 'areaOfEffect',
   'thornsPhysical_+%': 'thornsPhysical',
   'thornsPhysical_-%': 'thornsPhysical',
   'thornsMagical_+%': 'thornsMagical',
   'thornsMagical_-%': 'thornsMagical',
   'prospect_+f': 'prospect',
   'prospect_-f': 'prospect',
};

export const appTheme = createTheme({
   palette: {
      primary: {
         main: '#115E59',
      },
      secondary: {
         main: '#333333',
      },
      chalk: {
         main: '#F3F4F6',
         light: '#F9FAFB',
         dark: '#E5E7EB',
         contrastText: '#1F2937',
      },
      error: {
         main: '#EF4444',
      },
      text: {
         primary: '#F3F4F6',
         secondary: '#D1D5DB',
      },
      link: {
         normal: '#F3F4F6',
         hover: '#14B8A6',
      },
      paper: {
         transparent: '#111827E6',
         background: '#111827',
         border: '#374151',
      },
      shadows: {
         xs: '0 5px 10px 0 rgba(20, 184, 166, 0.06)',
         sm: '0 5px 10px 0 rgba(20, 184, 166, 0.12)',
         md: '0 1px 2px 0 rgba(20, 184, 166, 0.16)',
      },
      channels: {
         [Channel.SERVER]: '#16a34a',
         [Channel.GENERAL]: '#f5f5f5',
         [Channel.ERROR]: '#dc2626',
         [Channel.TRADE]: '#a16207',
         [Channel.PRIVATE]: '#0ea5e9',
      },
      talents: {
         color: {
            normal: '#D1D5DB',
            hover: '#14B8A6',
         },
         background: {
            normal: '#111827',
            hover: 'rgba(20, 184, 166, 0.085)',
         },
      },
      statisticsColors: {
         vitality: STATS_COLORS.vitality,
         magicShield: STATS_COLORS.magicShield,
         strength: STATS_COLORS.strength,
         dexterity: STATS_COLORS.dexterity,
         intelligence: STATS_COLORS.intelligence,
         luck: STATS_COLORS.luck,
         earthDamages: STATS_COLORS.strength,
         windDamages: STATS_COLORS.dexterity,
         fireDamages: STATS_COLORS.intelligence,
         iceDamages: STATS_COLORS.luck,
         sword1HDamages: '#94a3b8',
         axe1HDamages: '#94a3b8',
         mace1HDamages: '#94a3b8',
         daggerDamages: '#94a3b8',
         wandDamages: '#94a3b8',
         sword2HDamages: '#94a3b8',
         axe2HDamages: '#94a3b8',
         mace2HDamages: '#94a3b8',
         bowDamages: '#94a3b8',
         staffDamages: '#94a3b8',
         earthResistance: STATS_COLORS.strength,
         earthResistancePercent: STATS_COLORS.strength,
         windResistance: STATS_COLORS.dexterity,
         windResistancePercent: STATS_COLORS.dexterity,
         fireResistance: STATS_COLORS.intelligence,
         fireResistancePercent: STATS_COLORS.intelligence,
         iceResistance: STATS_COLORS.luck,
         iceResistancePercent: STATS_COLORS.luck,
         lifeSteal: STATS_COLORS.lifeSteal,
         lifeStealPercent: STATS_COLORS.lifeSteal,
         precision: '#4f46e5',
         evasion: '#16a34a',
         prospect: '#14b8a6',
         initiative: '#eab308',
         thornsPhysical: STATS_COLORS.thornsPhysical,
         thornsMagical: STATS_COLORS.thornsMagical,
         areaOfEffect: '#71717a',
         criticalStrikeResistance: '#dc2626',
         criticalStrikeChance: '#dc2626',
         criticalStrikeChancePercent: '#dc2626',
         criticalStrikeDamages: '#dc2626',
      },
      statistics: {
         border: {
            clear: '#D1D5DB',
            normal: '#111827',
         },
         background: {
            normal: darken(`#111827C6`, 0.15),
            hover: 'rgba(20, 184, 166, 0.1)',
         },
      },
      badges: {
         color: '#F3F4F6',
         background: '#111827',
      },
      fight: {
         ally: '#06b6d4',
         monster: '#ef4444',
      },
      health: {
         background: '#fca5a5',
         color: '#ef4444',
      },
      experience: {
         background: '#93c5fd',
         color: '#3b82f6',
      },
      dialogs: {
         hover: 'rgba(20, 184, 166, 0.36)',
         select: '#F3F4F6',
      },
      item: {
         common: ITEM_RARITY_COLORS.common,
         uncommon: ITEM_RARITY_COLORS.uncommon,
         rare: ITEM_RARITY_COLORS.rare,
         epic: ITEM_RARITY_COLORS.epic,
         unique: ITEM_RARITY_COLORS.unique,
      },
      itemGradient: {
         common: '',
         // #4b5563, #4d4f5a, #57534e, #6b7280, #9ca3af, #6b7280, #57534e, #4d4f5a, #4b5563)',
         uncommon:
            'linear-gradient(45deg, #1e3a8a, #1e40af, #1d4ed8, #2563eb, #3b82f6, #2563eb, #1d4ed8, #1e40af, #1e3a8a)',
         rare: 'linear-gradient(45deg, #b45309, #d97706, #f59e0b, #fbbf24, #fcd34d, #fbbf24, #f59e0b, #d97706, #b45309)',
         epic: 'linear-gradient(45deg, #5b21b6, #6d28d9, #7c3aed, #8b5cf6, #9f7aea, #8b5cf6, #7c3aed, #6d28d9, #5b21b6)',
         unique:
            'linear-gradient(45deg, #442c1a, #593c1f, #6b4c24, #854d0e, #a16207, #854d0e, #6b4c24, #593c1f, #442c1a)',
      },
      monster: {
         common: MONSTER_TYPE_COLORS.common,
         magic: MONSTER_TYPE_COLORS.magic,
         rare: MONSTER_TYPE_COLORS.rare,
         boss: MONSTER_TYPE_COLORS.boss,
      },
      mode: 'light',
   },
   typography: (palette) => ({
      allVariants: {
         fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
      },
      h1: {
         fontFamily: 'Orbitron',
         fontSize: 32,
         color: palette.text.primary,
      },
      body1: {
         lineHeight: '1.75rem',
         letterSpacing: '0.025em',
      },
   }),
   components: {
      MuiButton: {
         defaultProps: {
            centerRipple: false,
         },
         styleOverrides: {
            root: ({ theme }) => ({
               textTransform: 'none',
               boxShadow: 'none',
               ':hover': {
                  boxShadow: 'none',
               },
               ':active': {
                  boxShadow: 'none',
               },
               [`&.${buttonClasses.disabled}`]: {
                  backgroundColor: `${theme.palette.primary.main}`,
                  color: theme.palette.text.secondary,
                  opacity: 0.5,
               },
            }),
         },
      },
      MuiCard: {
         variants: [
            {
               props: { variant: 'clickable' },
               style: ({ theme }) =>
                  theme.unstable_sx({
                     cursor: 'pointer',
                     border: `1px solid ${theme.palette.paper.border}`,
                     background: darken(theme.palette.paper.transparent, 0.15),
                     padding: theme.spacing(2),
                     transition:
                        'background-color 0.3s, border-color 0.15s, box-shadow 0.3s, margin 0.15s',
                     ':hover': {
                        cursor: 'pointer',
                        boxShadow: theme.palette.shadows.xs,
                        borderColor: theme.palette.primary.light,
                     },
                     ':active': {
                        boxShadow: theme.palette.shadows.md,
                        mt: 0.25,
                        mb: -0.25,
                     },
                  }),
            },
         ],
      },
      MuiDialog: {
         styleOverrides: {
            paper: ({ theme }) => ({
               border: `1px solid ${theme.palette.paper.border}`,
               background: `${theme.palette.paper.background}DD`,
            }),
         },
      },
      MuiDialogContent: {
         styleOverrides: {
            dividers: ({ theme }) => ({
               borderColor: theme.palette.paper.border,
            }),
         },
      },
      MuiDialogTitle: {
         styleOverrides: {
            root: ({ theme }) => ({
               color: theme.palette.text.primary,
            }),
         },
      },
      MuiInputBase: {
         styleOverrides: {
            root: () => ({
               letterSpacing: '0.1em',
               transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
            }),
         },
      },
      MuiLink: {
         defaultProps: {
            underline: 'none',
         },
         styleOverrides: {
            root: ({ theme }) => ({
               color: theme.palette.link.normal,
               fontWeight: 500,
               transition:
                  'color 0.15s, textDecoration 0.15s, background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
               '&:hover': {
                  color: theme.palette.link.hover,
                  cursor: 'pointer',
               },
            }),
         },
      },
      MuiMenu: {
         styleOverrides: {
            root: ({ theme }) => ({
               [`&& .${menuItemClasses.selected}`]: {
                  backgroundColor: `${theme.palette.primary.main}33`,
                  '&:hover': {
                     backgroundColor: `${theme.palette.primary.main}33`,
                  },
               },
            }),
            paper: ({ theme }) => ({
               background: `${theme.palette.paper.background}DD`,
            }),
         },
      },
      MuiMenuItem: {
         styleOverrides: {
            root: ({ theme }) => ({
               color: theme.palette.text.primary,
               transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
               '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
               },
            }),
         },
      },
      MuiOutlinedInput: {
         styleOverrides: {
            root: ({ theme }) => ({
               '& fieldset': {
                  borderColor: theme.palette.paper.border,
                  transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
               },
               '&:hover fieldset': {
                  borderColor: 'rgb(107, 114, 128)',
                  transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
               },
               '&.Mui-focused fieldset': {
                  border: '1px solid red',
                  transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
               },
            }),
         },
      },
      MuiPaper: {
         styleOverrides: {
            outlined: ({ theme }) => ({
               border: `1px solid ${theme.palette.paper.border}`,
               background: theme.palette.paper.transparent,
            }),
         },
      },
      MuiSelect: {
         styleOverrides: {
            icon: ({ theme }) => ({
               color: theme.palette.text.primary,
            }),
         },
      },
      MuiTextField: {
         styleOverrides: {
            root: {},
         },
      },
      MuiToggleButton: {
         styleOverrides: {
            root: ({ theme }) => ({
               color: theme.palette.text.primary,
               border: `1px solid ${theme.palette.paper.border}`,
               paddingLeft: theme.spacing(2),
               paddingRight: theme.spacing(2),
               textTransform: 'none',
            }),
         },
      },
      MuiToggleButtonGroup: {
         styleOverrides: {
            root: ({ theme }) => ({
               background: darken(`${theme.palette.paper.background}C6`, 0.15),
               [`& .${toggleButtonClasses.selected}`]: {
                  color: `${theme.palette.link.hover} !important`,
                  background: `${theme.palette.primary.main}33 !important`,
               },
            }),
         },
      },
   },
});
