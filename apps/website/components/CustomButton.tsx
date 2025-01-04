import type { StyledComponent } from '@emotion/styled';
import type { ButtonProps } from '@mui/material';

import { Button, buttonClasses, styled } from '@mui/material';

export const CustomButton: StyledComponent<ButtonProps> = styled(Button)(({ theme }) => ({
   textTransform: 'none',
   boxShadow: 'none',
   ':hover': {
      boxShadow: 'none',
   },
   ':active': {
      boxShadow: 'none',
   },
   [`&.${buttonClasses.disabled}`]: {
      backgroundColor: `${theme.palette.primary.main}`,
      color: theme.palette.text.secondary,
      opacity: 0.5,
   },
}));
