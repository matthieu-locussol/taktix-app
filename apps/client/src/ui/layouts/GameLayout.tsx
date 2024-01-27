import { BoxProps } from '@mui/material';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { GameStore } from '../../store/GameStore';
import { Chatbox } from '../hud/Chatbox';

interface GameLayoutProps extends BoxProps {
   gameStore: GameStore;
}

export const GameLayout = observer(({ gameStore, children, ...rest }: GameLayoutProps) => {
   const gameLayoutRef = useRef<HTMLDivElement>(null);

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
         <Chatbox />
         {children}
      </Box>
   );
});
