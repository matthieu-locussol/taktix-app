import { BoxProps } from '@mui/material';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { useStore } from '../../store';
import { Chatbox } from '../hud/Chatbox';

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
               scene.input.emit(Phaser.Input.Events.POINTER_DOWN, scene.input.activePointer);
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
         {hudStore.isChatboxVisible && <Chatbox />}
         {children}
      </Box>
   );
});
