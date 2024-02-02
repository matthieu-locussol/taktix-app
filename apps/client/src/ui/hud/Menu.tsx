import SkillsIcon from '@mui/icons-material/AutoFixHighTwoTone';
import AuctionHouseIcon from '@mui/icons-material/BalanceTwoTone';
import InventoryIcon from '@mui/icons-material/BusinessCenterTwoTone';
import FriendsIcon from '@mui/icons-material/Diversity1TwoTone';
import MinimapOffIcon from '@mui/icons-material/ExploreOffTwoTone';
import MinimapIcon from '@mui/icons-material/ExploreTwoTone';
import StatsIcon from '@mui/icons-material/FaceRetouchingNaturalTwoTone';
import ForgeIcon from '@mui/icons-material/GavelTwoTone';
import GridOffIcon from '@mui/icons-material/GridOffTwoTone';
import GridIcon from '@mui/icons-material/GridOnTwoTone';
import TransparentOffIcon from '@mui/icons-material/InvertColorsOffTwoTone';
import TransparentIcon from '@mui/icons-material/InvertColorsTwoTone';
import MapIcon from '@mui/icons-material/PublicTwoTone';
import SettingsIcon from '@mui/icons-material/SettingsTwoTone';
import { darken, styled } from '@mui/material';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import { ShortcutIcon } from './components/ShortcutIcon';

export const Menu = observer(() => {
   const { hudStore } = useStore();

   return (
      <Root widthPercent={hudStore.menuWidth} heightPercent={hudStore.menuHeight}>
         {/* Top line */}
         <ShortcutIcon icon={<StatsIcon />} />
         <ShortcutIcon icon={<SkillsIcon />} />
         <ShortcutIcon icon={<InventoryIcon />} />
         <ShortcutIcon icon={<MapIcon />} />
         <ShortcutIcon icon={<ForgeIcon />} />
         <ShortcutIcon icon={<AuctionHouseIcon />} />
         <ShortcutIcon icon={<FriendsIcon />} />
         <ShortcutIcon icon={<SettingsIcon />} />
         {/* Bottom line */}
         <ShortcutIcon
            active={hudStore.isMinimapVisible}
            icon={hudStore.isMinimapVisible ? <MinimapOffIcon /> : <MinimapIcon />}
            onClick={() => hudStore.toggleMinimap()}
         />
         <ShortcutIcon
            active={hudStore.isTransparencyEnabled}
            icon={hudStore.isTransparencyEnabled ? <TransparentOffIcon /> : <TransparentIcon />}
            onClick={() => hudStore.toggleTransparency()}
         />
         <ShortcutIcon
            active={hudStore.isGridVisible}
            icon={hudStore.isGridVisible ? <GridOffIcon /> : <GridIcon />}
            onClick={() => hudStore.toggleGrid()}
         />
      </Root>
   );
});

interface StyleProps {
   widthPercent: number;
   heightPercent: number;
}

const Root = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'widthPercent' && prop !== 'heightPercent',
})<StyleProps>(({ theme, widthPercent, heightPercent }) => ({
   position: 'absolute',
   top: 8,
   right: 8,
   zIndex: 100,
   border: `1px solid ${theme.palette.paper.border}`,
   background: darken(`${theme.palette.paper.background}C6`, 0.15),
   width: `calc(${widthPercent}vw - 18px - 16px)`,
   height: `calc(${heightPercent}vh - 18px - 16px)`,
   borderRadius: 8,
   padding: 8,
   display: 'grid',
   gridTemplateColumns: 'repeat(8, calc(5vw - 11.5px))',
   gridTemplateRows: 'repeat(2, calc(50% - 4px))',
   gap: 8,
}));
