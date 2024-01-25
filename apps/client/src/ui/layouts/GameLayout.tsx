import { BoxProps } from '@mui/material';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { GameStore } from '../../store/GameStore';
import { Chatbox } from '../hud/Chatbox';

interface GameLayoutProps extends BoxProps {
   gameStore: GameStore;
}

export const GameLayout = observer(({ gameStore, children, ...rest }: GameLayoutProps) => (
   <Box
      sx={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         width: '100vw',
         height: '100vh',
      }}
      id="game-layout"
      onClick={() => {
         gameStore.getCurrentScene.input.emit(
            Phaser.Input.Events.POINTER_DOWN,
            gameStore.getCurrentScene.input.activePointer,
         );
      }}
      {...rest}
   >
      <Chatbox />
      {children}
   </Box>
));
