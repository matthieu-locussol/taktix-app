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
         contextMenuStore.setCurrentSubMenu(
            contextMenuStore.menu[0].text,
            contextMenuStore.menu[0].subMenu,
         );
      }
   }, [contextMenuStore.menu]);

   return (
      <Menu
         slotProps={{
            root: {},
            paper: {
               variant: 'outlined',
               elevation: 0,
            },
         }}
         MenuListProps={{
            dense: true,
            sx: {
               p: 0,
               minWidth: 130,
            },
         }}
         open={contextMenuStore.isOpened}
         onClose={() => contextMenuStore.closeContextMenu()}
         anchorReference="anchorPosition"
         anchorPosition={{
            top: contextMenuStore.positionY,
            left: contextMenuStore.positionX,
         }}
      >
         {contextMenuStore.currentSubMenu.length > 0 && (
            <Typography variant="body2" align="center" fontWeight="bold" sx={{ py: 0.75, px: 1 }}>
               {contextMenuStore.currentSubMenuTitle}
            </Typography>
         )}
         {contextMenuStore.currentSubMenu.length === 0
            ? contextMenuStore.menu.map(({ text, subMenu }) => (
                 <MenuItem
                    key={`menu-${text}`}
                    onClick={() => {
                       contextMenuStore.setCurrentSubMenu(text, subMenu);
                    }}
                    sx={{
                       px: 1,
                       '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                       },
                    }}
                 >
                    {text}
                 </MenuItem>
              ))
            : contextMenuStore.currentSubMenu.map(({ text, callback }) => (
                 <MenuItem
                    key={`sub-menu-${text}`}
                    onClick={() => {
                       contextMenuStore.closeContextMenu();
                       callback();
                    }}
                    sx={{
                       px: 1,
                       '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                       },
                    }}
                 >
                    {text}
                 </MenuItem>
              ))}
      </Menu>
   );
});