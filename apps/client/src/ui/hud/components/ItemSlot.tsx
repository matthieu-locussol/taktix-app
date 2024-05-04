import { Box, styled } from '@mui/material';

interface ItemSlotProps {
   width?: number | string;
   height?: number | string;
   canBeHovered?: boolean;
}

export const ItemSlot = ({
   width = 'min(3vw, 4.5vh)',
   height = 'min(3vw, 4.5vh)',
   canBeHovered = false,
}: ItemSlotProps) => {
   const a = 1;

   return (
      <Root draggable canBeHovered={canBeHovered} sx={{ width, height }}>
         {a}
      </Root>
   );
};

interface StyleProps {
   canBeHovered: boolean;
}

const Root = styled(Box)<StyleProps>(({ canBeHovered, theme }) => ({
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
}));
