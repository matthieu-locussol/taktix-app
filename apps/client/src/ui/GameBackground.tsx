import { Box } from '@mui/material';

export const GameBackground = () => (
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
      <div id="bg-stars-sm" className="animate-stars-sm"></div>
      <div id="bg-stars-md" className="animate-stars-md"></div>
      <div id="bg-stars-lg" className="animate-stars-lg"></div>
   </Box>
);
