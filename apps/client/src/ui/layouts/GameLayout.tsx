import type { BoxProps } from '@mui/material';

import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

import { useStore } from '../../store/index.tsx';
import { Character } from '../hud/Character.tsx';
import { Chatbox } from '../hud/Chatbox.tsx';
import { ContextMenu } from '../hud/ContextMenu.tsx';
import { Menu } from '../hud/Menu.tsx';
import { CommunityMenu } from '../hud/menus/CommunityMenu.tsx';
import { DialogMenu } from '../hud/menus/DialogMenu.tsx';
import { FightOverlay } from '../hud/menus/FightOverlay.tsx';
import { FightResultsMenu } from '../hud/menus/FightResultsMenu.tsx';
import { GatchaMenu } from '../hud/menus/GatchaMenu.tsx';
import { InventoryMenu } from '../hud/menus/InventoryMenu.tsx';
import { MapMenu } from '../hud/menus/MapMenu.tsx';
import { SettingsMenu } from '../hud/menus/SettingsMenu.tsx';
import { StatisticsMenu } from '../hud/menus/StatisticsMenu.tsx';
import { TalentsMenu } from '../hud/menus/TalentsMenu.tsx';

interface GameLayoutProps extends BoxProps {}

export const GameLayout = observer(({ children, ...rest }: GameLayoutProps) => {
   const gameLayoutRef = useRef<HTMLDivElement>(null);
   const { gameStore, hudStore } = useStore();

   return (
      <Box
         ref={gameLayoutRef}
         id="game-layout"
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
         }}
         onClick={async (event) => {
            if (event.target === gameLayoutRef.current) {
               const scene = await gameStore.getCurrentScene();

               scene.input.emit(
                  Phaser.Input.Events.POINTER_DOWN,
                  scene.input.activePointer,
                  scene.children.list,
               );
            }
         }}
         onMouseMove={async (event) => {
            if (event.target === gameLayoutRef.current) {
               const scene = await gameStore.getCurrentScene();

               scene.input.manager.transformPointer(
                  scene.input.activePointer,
                  event.pageX,
                  event.pageY,
                  true,
               );
               scene.input.emit(
                  Phaser.Input.Events.POINTER_MOVE,
                  scene.input.activePointer,
                  scene.children.list,
               );
            }
         }}
         onWheel={async (event) => {
            if (event.target === gameLayoutRef.current) {
               const scene = await gameStore.getCurrentScene();

               scene.input.emit(
                  Phaser.Input.Events.POINTER_WHEEL,
                  scene.input.activePointer,
                  [],
                  event.deltaX,
                  event.deltaY,
                  event.deltaZ,
               );
            }
         }}
         {...rest}
      >
         <StyledBox height={`${hudStore.chatboxHeight}vh`} id="game-layout-box">
            {hudStore.isChatboxVisible && <Chatbox />}
            {hudStore.isCharacterVisible && <Character />}
            {hudStore.isMenuVisible && <Menu />}
         </StyledBox>
         <CommunityMenu />
         <ContextMenu />
         <SettingsMenu />
         <TalentsMenu />
         <StatisticsMenu />
         <FightOverlay />
         <FightResultsMenu />
         <MapMenu />
         <DialogMenu />
         <InventoryMenu />
         <GatchaMenu />
         {children}
      </Box>
   );
});

const StyledBox = styled(Box)(({ theme }) => ({
   position: 'absolute',
   bottom: 0,
   width: '100%',
   border: `1px solid ${theme.palette.paper.border}`,
   background: `${theme.palette.paper.background}88`,
   overflow: 'hidden',
   height: '15vh',
}));
