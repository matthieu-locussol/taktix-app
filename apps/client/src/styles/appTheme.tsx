import { buttonClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';

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
         primary: '#D1D5DB',
         secondary: '#F3F4F6',
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
         styleOverrides: {
            root: ({ theme }) => ({
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
               props: { variant: 'outlined' },
               style: ({ theme }) =>
                  theme.unstable_sx({
                     border: '1px solid rgb(55, 65, 81)',
                     background: 'rgba(17, 24, 39, 0.9)',
                  }),
            },
         ],
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
            root: () => ({
               color: '#FFFFFF',
               fontWeight: 500,
               transition:
                  'color 0.15s, textDecoration 0.15s, background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
               '&:hover': {
                  color: '#14B8A6',
                  cursor: 'pointer',
               },
            }),
         },
      },
      MuiOutlinedInput: {
         styleOverrides: {
            root: () => ({
               [`& fieldset`]: {
                  borderColor: 'rgb(55, 65, 81)',
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
      MuiTextField: {
         styleOverrides: {
            root: {},
         },
      },
   },
});
