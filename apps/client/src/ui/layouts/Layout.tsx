import type { BoxProps } from '@mui/material';

import { styled } from '@mui/material';
import Box from '@mui/material/Box';

export const Layout = ({ children }: BoxProps) => <Root>{children}</Root>;

const Root = styled(Box)(() => ({
   position: 'absolute',
   width: '100vw',
   height: '100vh',
}));
