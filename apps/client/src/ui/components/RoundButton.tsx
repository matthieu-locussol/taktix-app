import type { ButtonProps } from '@mui/material';

import { Button, styled } from '@mui/material';

export const RoundButton = (props: ButtonProps) => {
   return <StyledButton color="inherit" variant="outlined" {...props} />;
};

const StyledButton = styled(Button)(() => ({
   padding: 0,
   minWidth: 0,
   borderRadius: 999,
}));
