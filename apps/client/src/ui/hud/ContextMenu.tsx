import { styled } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useStore } from '../../store';

export const ContextMenu = observer(() => {
   const { contextMenuStore } = useStore();

   useEffect(() => {
      if (contextMenuStore.menu.length === 1) {
         const { text, subMenu } = contextMenuStore.menu[0];

         contextMenuStore.setCurrentSubMenu(text, subMenu);
      }
   }, [contextMenuStore.menu]);

   return (
      <Menu
         MenuListProps={{
            dense: true,
            sx: {
               p: 0,
               minWidth: 130,
            },
         }}
         anchorPosition={{
            top: contextMenuStore.positionY,
            left: contextMenuStore.positionX,
         }}
         anchorReference="anchorPosition"
         open={contextMenuStore.isOpened}
         slotProps={{
            paper: {
               variant: 'outlined',
               elevation: 0,
            },
         }}
         transitionDuration={{
            exit: 0,
            enter: 300,
         }}
         onClose={() => contextMenuStore.closeContextMenu()}
      >
         {contextMenuStore.currentSubMenu.length > 0 && (
            <Typography
               fontWeight="bold"
               sx={{
                  py: 0.75,
                  px: 1,
                  color: (theme) => theme.palette.link.hover,
               }}
               variant="body2"
            >
               {contextMenuStore.currentSubMenuTitle}
            </Typography>
         )}
         {contextMenuStore.currentSubMenu.length === 0
            ? contextMenuStore.menu.map(({ text, subMenu }) => (
                 <StyledMenuItem
                    key={`menu-${text}`}
                    onClick={() => contextMenuStore.setCurrentSubMenu(text, subMenu)}
                 >
                    {text}
                 </StyledMenuItem>
              ))
            : contextMenuStore.currentSubMenu.map(({ text, callback, disabled }) => (
                 <StyledMenuItem
                    key={`sub-menu-${text}`}
                    disabled={disabled}
                    onClick={() => {
                       contextMenuStore.closeContextMenu();
                       callback();
                    }}
                 >
                    {text}
                 </StyledMenuItem>
              ))}
      </Menu>
   );
});

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
   paddingLeft: theme.spacing(1),
   paddingRight: theme.spacing(1),
   borderTop: `1px solid ${theme.palette.paper.border}`,
}));
