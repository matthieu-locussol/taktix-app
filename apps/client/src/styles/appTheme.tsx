import { buttonClasses } from '@mui/material';
import { createTheme, darken } from '@mui/material/styles';
import { Channel } from 'shared/src/types/Channel';

export const appTheme = createTheme({
   palette: {
      primary: {
         main: '#115E59',
      },
      secondary: {
         main: '#333333',
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
               background: theme.palette.paper.background,
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
      MuiOutlinedInput: {
         styleOverrides: {
            root: ({ theme }) => ({
               [`& fieldset`]: {
                  borderColor: theme.palette.paper.border,
                  transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
               },
               [`&:hover fieldset`]: {
                  borderColor: 'rgb(107, 114, 128)',
                  transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
               },
               [`&.Mui-focused fieldset`]: {
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
      MuiTextField: {
         styleOverrides: {
            root: {},
         },
      },
   },
});
