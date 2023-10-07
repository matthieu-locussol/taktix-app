import '@mui/material/styles';

interface CustomPalette {
   link: {
      normal: string;
      hover: string;
   };
   paper: {
      transparent: string;
      background: string;
      border: string;
   };
   shadows: {
      xs: string;
      sm: string;
      md: string;
   };
}

declare module '@mui/material/styles' {
   interface Palette extends CustomPalette {}
   interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Paper' {
   interface PaperPropsVariantOverrides {
      clickable: true;
   }
}
