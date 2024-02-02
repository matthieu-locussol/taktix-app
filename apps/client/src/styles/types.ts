import { PaletteColor } from '@mui/material/styles';
import { Channel } from 'shared/src/types/Channel';

interface CustomPalette {
   chalk: PaletteColor;
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
   channels: {
      [Channel.SERVER]: string;
      [Channel.ERROR]: string;
      [Channel.GENERAL]: string;
      [Channel.TRADE]: string;
   };
}

declare module '@mui/material/styles' {
   interface Palette extends CustomPalette {}
   interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
   interface ButtonPropsColorOverrides {
      chalk: true;
   }
}

declare module '@mui/material/Paper' {
   interface PaperPropsVariantOverrides {
      clickable: true;
   }
}
