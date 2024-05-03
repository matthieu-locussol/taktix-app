import { buttonClasses, menuItemClasses, toggleButtonClasses } from '@mui/material';
import { createTheme, darken } from '@mui/material/styles';
import { Channel } from 'shared/src/types/Channel';

export const STATS_COLORS = {
   vitality: '#ef4444',
   magicShield: '#8b5cf6',
   strength: '#854d0e',
   dexterity: '#10b981',
   intelligence: '#ef4444',
   luck: '#06b6d4',
   lifeSteal: '#f43f5e',
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
         thornsPhysical: '#854d0e',
         thornsMagical: '#8b5cf6',
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
