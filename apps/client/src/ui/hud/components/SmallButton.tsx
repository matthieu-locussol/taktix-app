import { ButtonProps, darken, styled } from '@mui/material';
import Button from '@mui/material/Button';

export const SmallButton = (props: ButtonProps) => <StyledButton size="small" {...props} />;

const StyledButton = styled(Button)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: 'min(1.8vw, 3vh)',
   minWidth: 0,
   height: 'min(1.8vw, 3vh)',
   textAlign: 'center',
   fontSize: 'min(1.5vw, 2vh)',
   fontWeight: 'bold',
   padding: 0,
   lineHeight: 'min(1.8vw, 3vh)',
   borderRadius: theme.spacing(0.5),
   border: `1px solid ${theme.palette.paper.border}`,
   background: darken(`${theme.palette.paper.background}C6`, 0.2),
   color: theme.palette.primary.light,
   '&:hover': {
      background: darken(`${theme.palette.paper.background}C6`, 0.8),
   },
}));
