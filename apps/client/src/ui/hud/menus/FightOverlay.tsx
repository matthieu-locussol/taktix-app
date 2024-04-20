import { Backdrop } from '@mui/material';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store';
import { PvEFightSpeedSelector } from '../components/PvEFightSpeedSelector';
import { PvEFightTimeline } from '../components/PvEFightTimeline';
import { PvEFightTurn } from '../components/PvEFightTurn';

export const FightOverlay = observer(() => {
   const { pveFightStore, hudStore } = useStore();

   return (
      <Backdrop
         open={pveFightStore.fightOngoing}
         sx={{
            backgroundColor: 'inherit',
         }}
      >
         <Box
            sx={{
               position: 'absolute',
               top: (theme) => theme.spacing(2),
               left: (theme) => theme.spacing(2),
            }}
         >
            <PvEFightTurn />
         </Box>
         <Box
            sx={{
               position: 'absolute',
               left: (theme) => theme.spacing(2),
               bottom: (theme) => `calc(${theme.spacing(2)} + ${hudStore.menuHeight}vh)`,
            }}
         >
            <PvEFightTimeline />
         </Box>
         <Box
            sx={{
               position: 'absolute',
               top: (theme) => theme.spacing(2),
               right: (theme) => theme.spacing(2),
            }}
         >
            <PvEFightSpeedSelector />
         </Box>
      </Backdrop>
   );
});
