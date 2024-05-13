import CloseIcon from '@mui/icons-material/CloseRounded';
import RecycleIcon from '@mui/icons-material/RecyclingRounded';
import {
   Badge,
   Box,
   Button,
   CircularProgress,
   DialogContentText,
   ToggleButton,
   styled,
} from '@mui/material';
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
import { Tooltip } from '../components/Tooltip';

export const InventoryMenu = observer(() => {
   const nodeRef = useRef(null);
   const { characterStore, inventoryMenuStore } = useStore();
   const { t } = useTranslation();

   return (
      <>
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
                     <Box sx={{ display: 'flex', gap: 'min(1vw, 1.5vh)', alignItems: 'end' }}>
                        <Box sx={{ width: 'min(3vw, 4.5vh)', height: 'min(3vw, 4.5vh)' }} />
                        <EquipmentSlot
                           size="medium"
                           item={characterStore.equippedItemsMap.helmet}
                           canBeHovered={characterStore.equippedItemsMap.helmet !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.helmet?.id)
                           }
                        />
                        <EquipmentSlot
                           size="small"
                           item={characterStore.equippedItemsMap.amulet}
                           canBeHovered={characterStore.equippedItemsMap.amulet !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.amulet?.id)
                           }
                        />
                     </Box>
                     <Box
                        sx={{ display: 'flex', gap: 'min(1vw, 1.5vh)', py: 'min(0.25vw, 0.5vh)' }}
                     >
                        <EquipmentSlot
                           size="large"
                           item={characterStore.equippedItemsMap.weapon1}
                           canBeHovered={characterStore.equippedItemsMap.weapon1 !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(
                                 characterStore.equippedItemsMap.weapon1?.id,
                              )
                           }
                        />
                        <EquipmentSlot
                           size="large"
                           item={characterStore.equippedItemsMap.chestplate}
                           canBeHovered={characterStore.equippedItemsMap.chestplate !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(
                                 characterStore.equippedItemsMap.chestplate?.id,
                              )
                           }
                        />
                        <EquipmentSlot
                           size="large"
                           item={characterStore.equippedItemsMap.offhand}
                           canBeHovered={characterStore.equippedItemsMap.offhand !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(
                                 characterStore.equippedItemsMap.offhand?.id,
                              )
                           }
                        />
                     </Box>
                     <Box
                        sx={{ display: 'flex', gap: 'min(1vw, 1.5vh)', pb: 'min(0.25vw, 0.5vh)' }}
                     >
                        <EquipmentSlot
                           size="small"
                           item={characterStore.equippedItemsMap.ring1}
                           canBeHovered={characterStore.equippedItemsMap.ring1 !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.ring1?.id)
                           }
                        />
                        <EquipmentSlot
                           size="wide"
                           item={characterStore.equippedItemsMap.belt}
                           canBeHovered={characterStore.equippedItemsMap.belt !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.belt?.id)
                           }
                        />
                        <EquipmentSlot
                           size="small"
                           item={characterStore.equippedItemsMap.ring2}
                           canBeHovered={characterStore.equippedItemsMap.ring2 !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.ring2?.id)
                           }
                        />
                     </Box>
                     <Box
                        sx={{ display: 'flex', gap: 'min(1vw, 1.5vh)', pb: 'min(0.25vw, 0.5vh)' }}
                     >
                        <EquipmentSlot
                           size="medium"
                           item={characterStore.equippedItemsMap.gloves}
                           canBeHovered={characterStore.equippedItemsMap.gloves !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.gloves?.id)
                           }
                        />
                        <Box sx={{ width: 'min(1vw, 1.5vh)', height: 'min(1vw, 1.5vh)' }} />
                        <EquipmentSlot
                           size="medium"
                           item={characterStore.equippedItemsMap.boots}
                           canBeHovered={characterStore.equippedItemsMap.boots !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.boots?.id)
                           }
                        />
                     </Box>
                     <Box sx={{ display: 'flex', gap: 'min(1vw, 1.5vh)' }}>
                        <EquipmentSlot
                           size="small"
                           item={characterStore.equippedItemsMap.relic1}
                           canBeHovered={characterStore.equippedItemsMap.relic1 !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.relic1?.id)
                           }
                        />
                        <EquipmentSlot
                           size="small"
                           item={characterStore.equippedItemsMap.relic2}
                           canBeHovered={characterStore.equippedItemsMap.relic2 !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.relic2?.id)
                           }
                        />
                        <EquipmentSlot
                           size="small"
                           item={characterStore.equippedItemsMap.relic3}
                           canBeHovered={characterStore.equippedItemsMap.relic3 !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.relic3?.id)
                           }
                        />
                        <EquipmentSlot
                           size="small"
                           item={characterStore.equippedItemsMap.relic4}
                           canBeHovered={characterStore.equippedItemsMap.relic4 !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.relic4?.id)
                           }
                        />
                        <EquipmentSlot
                           size="small"
                           item={characterStore.equippedItemsMap.relic5}
                           canBeHovered={characterStore.equippedItemsMap.relic5 !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.relic5?.id)
                           }
                        />
                        <EquipmentSlot
                           size="small"
                           item={characterStore.equippedItemsMap.relic6}
                           canBeHovered={characterStore.equippedItemsMap.relic6 !== null}
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.relic6?.id)
                           }
                        />
                     </Box>
                  </Equipments>
                  <Inventory>
                     {characterStore.inventoryItems.map((item) => (
                        <Badge
                           variant="dot"
                           color={
                              inventoryMenuStore.itemsToRecycle.includes(item.id)
                                 ? 'error'
                                 : undefined
                           }
                        >
                           <EquipmentSlot
                              key={item.id}
                              item={item}
                              size="small"
                              canBeHovered
                              {...(inventoryMenuStore.mode === 'normal' && {
                                 onDoubleClick: () => characterStore.equipItem(item.id),
                              })}
                              {...(inventoryMenuStore.mode === 'recycle' && {
                                 onClick: () => inventoryMenuStore.toggleItemToRecycle(item.id),
                                 highlightColor: inventoryMenuStore.itemsToRecycle.includes(item.id)
                                    ? (theme) => theme.palette.link.hover
                                    : undefined,
                              })}
                           />
                        </Badge>
                     ))}
                  </Inventory>
               </StyledDialogContent>
               <DialogActions>
                  <Typography align="center" sx={{ mr: 1 }}>
                     <Trans
                        i18nKey="creditsValue"
                        components={{ b: <b /> }}
                        values={{ value: characterStore.money }}
                     />
                  </Typography>
                  •
                  <Typography align="center" sx={{ ml: 1, mr: 'auto' }}>
                     <Trans
                        i18nKey="gachixValue"
                        components={{ b: <b /> }}
                        values={{ value: characterStore.gachix }}
                     />
                  </Typography>
                  {inventoryMenuStore.mode === 'recycle' && (
                     <Button
                        variant="contained"
                        onClick={() => inventoryMenuStore.openRecycleDialog()}
                        disabled={inventoryMenuStore.itemsToRecycle.length === 0}
                     >
                        {t('recycle')}
                     </Button>
                  )}
                  <Tooltip title={t('recycleMode')} disableInteractive>
                     <ToggleButton
                        size="small"
                        value="check"
                        selected={inventoryMenuStore.mode === 'recycle'}
                        onChange={() => inventoryMenuStore.toggleMode('recycle')}
                        sx={{
                           transition: 'all 0.3s',
                           border: (theme) =>
                              inventoryMenuStore.mode === 'recycle'
                                 ? `1px solid ${theme.palette.link.hover}`
                                 : '1px solid inherit',
                        }}
                     >
                        <RecycleIcon
                           fontSize="small"
                           sx={{
                              transition: 'all 0.3s',
                              color: (theme) =>
                                 inventoryMenuStore.mode === 'recycle'
                                    ? theme.palette.link.hover
                                    : 'inherit',
                           }}
                        />
                     </ToggleButton>
                  </Tooltip>
                  <Button variant="contained" onClick={() => inventoryMenuStore.close()}>
                     {t('close')}
                  </Button>
               </DialogActions>
            </StyledDialog>
         </Draggable>
         <Dialog open={inventoryMenuStore.recycleDialogOpened}>
            <DialogTitle>{t('inventoryRecycle_title')}</DialogTitle>
            <DialogContent>
               <DialogContentText>{t('inventoryRecycle_content')}</DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button
                  variant="text"
                  color="chalk"
                  onClick={() => inventoryMenuStore.closeRecycleDialog()}
               >
                  {t('cancel')}
               </Button>
               <Button variant="contained" onClick={() => inventoryMenuStore.recycleItems()}>
                  {inventoryMenuStore.recycleLoading ? (
                     <CircularProgress size={24} />
                  ) : (
                     t('recycle')
                  )}
               </Button>
            </DialogActions>
         </Dialog>
         <Dialog open={inventoryMenuStore.gachixGainedDialogOpened}>
            <DialogTitle>{t('inventoryGachix_title')}</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  {t('inventoryGachix_content', { gachix: inventoryMenuStore.obtainedGachix })}
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button
                  variant="contained"
                  color="primary"
                  onClick={() => inventoryMenuStore.closeGachixGainedDialog()}
               >
                  {t('close')}
               </Button>
            </DialogActions>
         </Dialog>
      </>
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
      display: 'flex',
      width: '100%',
   },
}));

const Equipments = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'space-evenly',
   width: '59%',
   padding: theme.spacing(1),
   borderRight: `1px solid ${theme.palette.paper.border}`,
   position: 'fixed',
}));

const Inventory = styled(Box)(({ theme }) => ({
   display: 'flex',
   width: '35%',
   padding: theme.spacing('min(1vw, 1.5vh)'),
   gap: theme.spacing('min(1vw, 1.5vh)'),
   flexWrap: 'wrap',
   marginBottom: 'auto',
   overflow: 'scroll',
   marginLeft: 'auto',
}));
