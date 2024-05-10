import { Button, ButtonProps, styled } from '@mui/material';

export const RoundButton = (props: ButtonProps) => {
   return <StyledButton variant="outlined" color="inherit" {...props} />;
};

const StyledButton = styled(Button)(() => ({
   padding: 0,
   minWidth: 0,
   borderRadius: 999,
}));
