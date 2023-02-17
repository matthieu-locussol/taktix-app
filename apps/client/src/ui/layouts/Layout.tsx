import { Box, BoxProps, styled } from '@mui/material';

export const Layout = ({ children }: BoxProps) => <Root>{children}</Root>;

const Root = styled(Box)(() => ({
   position: 'absolute',
   width: '100vw',
   height: '100vh',
}));
