import { PaletteColor } from '@mui/material/styles';
import { Channel } from 'shared/src/types/Channel';
import { ItemRarity } from 'shared/src/types/Item';
import { RealStatistic } from 'shared/src/types/Statistic';

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
      [Channel.PRIVATE]: string;
   };
   talents: {
      color: {
         normal: string;
         hover: string;
      };
      background: {
         normal: string;
         hover: string;
      };
   };
   statisticsColors: Record<RealStatistic, string>;
   statistics: {
      border: {
         clear: string;
         normal: string;
      };
      background: {
         normal: string;
         hover: string;
      };
   };
   badges: {
      color: string;
      background: string;
   };
   fight: {
      ally: string;
      monster: string;
   };
   health: {
      background: string;
      color: string;
   };
   experience: {
      background: string;
      color: string;
   };
   dialogs: {
      hover: string;
      select: string;
   };
   item: Record<ItemRarity, string>;
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
