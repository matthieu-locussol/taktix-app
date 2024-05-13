import { Box, BoxProps, Theme, styled } from '@mui/material';
import { forwardRef } from 'react';

interface ItemSlotProps extends BoxProps, StyleProps {
   width?: number | string;
   height?: number | string;
   highlightColor?: (theme: Theme) => string;
}

export const ItemSlot = forwardRef<unknown, ItemSlotProps>(
   ({ width = 'min(3vw, 4.5vh)', height = 'min(3vw, 4.5vh)', highlightColor, ...rest }, ref) => {
      return (
         <Root draggable sx={{ width, height, borderColor: highlightColor }} {...rest} ref={ref} />
      );
   },
);

interface StyleProps {
   canBeHovered?: boolean;
}

const Root = styled(Box, { shouldForwardProp: (prop) => prop !== 'canBeHovered' })<StyleProps>(
   ({ canBeHovered, theme }) => ({
      border: `1px solid ${theme.palette.paper.border}`,
      backgroundColor: theme.palette.paper.background,
      borderRadius: theme.spacing(0.5),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...(canBeHovered && {
         ':hover': {
            cursor: 'pointer',
            border: `1px solid ${theme.palette.link.hover}`,
            backgroundColor: theme.palette.talents.background.hover,
         },
      }),
   }),
);
