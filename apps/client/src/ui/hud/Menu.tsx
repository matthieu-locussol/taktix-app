import FaceIcon from '@mui/icons-material/Face';
import TransparentIcon from '@mui/icons-material/OpacityTwoTone';
import MapIcon from '@mui/icons-material/PublicTwoTone';
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
         <ShortcutIcon icon={<FaceIcon />} />
         <ShortcutIcon icon={<FaceIcon />} />
         <ShortcutIcon icon={<FaceIcon />} />
         <ShortcutIcon icon={<FaceIcon />} />
         <ShortcutIcon icon={<FaceIcon />} />
         <ShortcutIcon icon={<FaceIcon />} />
         <ShortcutIcon icon={<FaceIcon />} />
         <ShortcutIcon icon={<FaceIcon />} />
         {/* Bottom line */}
         <ShortcutIcon
            active={hudStore.isMinimapVisible}
            icon={<MapIcon />}
            onClick={() => hudStore.toggleMinimap()}
         />
         <ShortcutIcon
            active={hudStore.isTransparencyEnabled}
            icon={<TransparentIcon />}
            onClick={() => hudStore.toggleTransparency()}
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
