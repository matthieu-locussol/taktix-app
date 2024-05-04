import CloseIcon from '@mui/icons-material/CloseRounded';
import { Box, styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent, { dialogContentClasses } from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import Draggable from 'react-draggable';
import { Trans } from 'react-i18next';
import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';
import { EquipmentSlot } from '../components/EquipmentSlot';
import { ItemSlot } from '../components/ItemSlot';

export const InventoryMenu = observer(() => {
   const nodeRef = useRef(null);
   const { characterStore, inventoryMenuStore } = useStore();
   const { t } = useTranslation();

   return (
      <Draggable handle=".inventory-menu-handle" nodeRef={nodeRef}>
         <StyledDialog
            ref={nodeRef}
            fullScreen
            hideBackdrop
            disableEnforceFocus
            onClose={() => inventoryMenuStore.close()}
            open={inventoryMenuStore.isOpened}
            PaperProps={{
               sx: (theme) => ({
                  borderRadius: theme.spacing(0.5),
                  transition: 'all 0.3s',
               }),
            }}
         >
            <StyledDialogTitle className="inventory-menu-handle">
               {t('inventory')}
            </StyledDialogTitle>
            <IconButton
               aria-label="close"
               onClick={() => inventoryMenuStore.close()}
               sx={{
                  position: 'absolute',
                  right: 8,
                  top: 12,
                  color: (theme) => theme.palette.text.primary,
               }}
            >
               <CloseIcon />
            </IconButton>
            <StyledDialogContent dividers>
               <Equipments>
                  <EquipmentSlot size="small" />
                  <EquipmentSlot size="medium" />
                  <EquipmentSlot size="large" />
               </Equipments>
               <Inventory>
                  <ItemSlot canBeHovered />
                  <ItemSlot canBeHovered />
                  <ItemSlot canBeHovered />
                  <ItemSlot canBeHovered />
                  <ItemSlot canBeHovered />
                  <ItemSlot canBeHovered />
                  <ItemSlot canBeHovered />
                  <ItemSlot canBeHovered />
               </Inventory>
            </StyledDialogContent>
            <DialogActions>
               <Typography align="center" sx={{ mr: 'auto' }}>
                  <Trans
                     i18nKey="creditsValue"
                     components={{ b: <b /> }}
                     values={{ value: characterStore.money }}
                  />
               </Typography>
            </DialogActions>
         </StyledDialog>
      </Draggable>
   );
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
   position: 'absolute',
   top: '10vh',
   left: '20vw',
   right: '20vw',
   bottom: 'calc(15vh + 10vh)',
   [`& .${dialogContentClasses.root}`]: {
      padding: theme.spacing(2),
   },
   '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
   },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
   margin: 0,
   padding: theme.spacing(2),
   display: 'flex',
   alignItems: 'center',
   gap: theme.spacing(2),
   cursor: 'grab',
   ':active': {
      cursor: 'grabbing',
   },
}));

const StyledDialogContent = styled(DialogContent)(() => ({
   [`&.${dialogContentClasses.root}`]: {
      padding: 0,
      overflow: 'auto',
      display: 'flex',
      width: '100%',
   },
}));

const Equipments = styled(Box)(({ theme }) => ({
   display: 'flex',
   width: '59%',
   padding: theme.spacing(1),
   borderRight: `1px solid ${theme.palette.paper.border}`,
}));

const Inventory = styled(Box)(({ theme }) => ({
   display: 'flex',
   width: '41%',
   padding: theme.spacing('min(1vw, 1.5vh)'),
   gap: theme.spacing('min(1vw, 1.5vh)'),
   flexWrap: 'wrap',
   marginBottom: 'auto',
}));
