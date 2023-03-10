import { Box, BoxProps } from '@mui/material';
import { Chatbox } from '../hud/Chatbox';

export const GameLayout = ({ children, ...rest }: BoxProps) => (
   <Box
      sx={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         width: '100vw',
         height: '100vh',
      }}
      {...rest}
   >
      <Chatbox />
      {children}
   </Box>
);
