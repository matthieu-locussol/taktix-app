import { BoxProps, styled } from '@mui/material';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { useStore } from '../../store';
import { Character } from '../hud/Character';
import { Chatbox } from '../hud/Chatbox';
import { ContextMenu } from '../hud/ContextMenu';
import { Menu } from '../hud/Menu';
import { CommunityMenu } from '../hud/menus/CommunityMenu';
import { DialogMenu } from '../hud/menus/DialogMenu';
import { FightOverlay } from '../hud/menus/FightOverlay';
import { FightResultsMenu } from '../hud/menus/FightResultsMenu';
import { GatchaMenu } from '../hud/menus/GatchaMenu';
import { InventoryMenu } from '../hud/menus/InventoryMenu';
import { MapMenu } from '../hud/menus/MapMenu';
import { SettingsMenu } from '../hud/menus/SettingsMenu';
import { StatisticsMenu } from '../hud/menus/StatisticsMenu';
import { TalentsMenu } from '../hud/menus/TalentsMenu';

interface GameLayoutProps extends BoxProps {}

export const GameLayout = observer(({ children, ...rest }: GameLayoutProps) => {
   const gameLayoutRef = useRef<HTMLDivElement>(null);
   const { gameStore, hudStore } = useStore();

   return (
      <Box
         ref={gameLayoutRef}
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
         }}
         id="game-layout"
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
         {...rest}
      >
         <StyledBox id="game-layout-box" height={`${hudStore.chatboxHeight}vh`}>
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
