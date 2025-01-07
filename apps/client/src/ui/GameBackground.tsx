import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';

import { useStore } from '../store';

export const GameBackground = observer(() => {
   const { screenStore } = useStore();

   if (screenStore.loggedIn) {
      return null;
   }

   return (
      <Box
         sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: '105vh',
            background: 'radial-gradient(ellipse at bottom,#1f2937 0,#111827 100%)',
         }}
      >
         <div className="animate-stars-sm" id="bg-stars-sm" />
         <div className="animate-stars-md" id="bg-stars-md" />
         <div className="animate-stars-lg" id="bg-stars-lg" />
      </Box>
   );
});
