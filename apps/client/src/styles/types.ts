import type { PaletteColor } from '@mui/material/styles';
import type { Channel } from 'shared/src/types/Channel';
import type { ItemRarity } from 'shared/src/types/Item';
import type { MonsterType } from 'shared/src/types/Monster';
import type { RealStatistic } from 'shared/src/types/Statistic';
import type { WeaponDamagesType } from 'shared/src/types/Weapon';

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
   statisticsColors: Record<RealStatistic | 'elementalDamages' | 'elementalResistances', string>;
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
   itemGradient: Record<ItemRarity, string>;
   monster: Record<MonsterType, string>;
   damages: Record<WeaponDamagesType, string>;
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
