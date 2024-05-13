import CloseIcon from '@mui/icons-material/CloseRounded';
import RecycleIcon from '@mui/icons-material/RecyclingRounded';
import SortIcon from '@mui/icons-material/SortByAlphaRounded';
import {
   Badge,
   Box,
   Button,
   Checkbox,
   CircularProgress,
   DialogContentText,
   Grow,
   ToggleButton,
   checkboxClasses,
   styled,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent, { dialogContentClasses } from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { Trans } from 'react-i18next';
import { ItemMgt } from 'shared/src/utils/itemMgt';
import { useStore } from '../../../store';
import { ITEM_RARITY_COLORS } from '../../../styles/appTheme';
import { useTranslation } from '../../../types/react-i18next';
import { EquipmentSlot } from '../components/EquipmentSlot';
import { ItemsSortSelector } from '../components/ItemsSortSelector';
import { Tooltip } from '../components/Tooltip';

export const InventoryMenu = observer(() => {
   const nodeRef = useRef(null);
   const [sortByAnchor, setSortByAnchor] = useState<null | HTMLElement>(null);
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
                     {inventoryMenuStore.sortedInventoryItems.map((item) => (
                        <Badge
                           key={`${item.id}-badge`}
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
                              equippedItem={inventoryMenuStore.equippedItemsByType[item.type]}
                              size="small"
                              canBeHovered
                              {...(inventoryMenuStore.mode === 'normal' && {
                                 onDoubleClick: () => characterStore.equipItem(item.id),
                              })}
                              {...(inventoryMenuStore.mode === 'recycle' && {
                                 onClick: () => inventoryMenuStore.toggleItemToRecycle(item.id),
                                 highlightColor: inventoryMenuStore.itemsToRecycle.includes(item.id)
                                    ? (theme) => theme.palette.link.hover
                                    : () => ITEM_RARITY_COLORS[ItemMgt.getRarity(item)],
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
                     <Grow in={inventoryMenuStore.mode === 'recycle'} mountOnEnter={false}>
                        <Box display="flex" alignItems="center">
                           <Checkbox
                              checked={inventoryMenuStore.areAllEpicItemsSelectedToRecycle}
                              onChange={() => inventoryMenuStore.toggleAllEpicItemsToRecycle()}
                              size="small"
                              sx={{
                                 color: (theme) => theme.palette.item.epic,
                                 [`&.${checkboxClasses.checked}`]: {
                                    color: (theme) => theme.palette.item.epic,
                                 },
                              }}
                           />
                           <Checkbox
                              checked={inventoryMenuStore.areAllRareItemsSelectedToRecycle}
                              onChange={() => inventoryMenuStore.toggleAllRareItemsToRecycle()}
                              size="small"
                              sx={{
                                 color: (theme) => theme.palette.item.rare,
                                 [`&.${checkboxClasses.checked}`]: {
                                    color: (theme) => theme.palette.item.rare,
                                 },
                              }}
                           />
                           <Checkbox
                              checked={inventoryMenuStore.areAllUncommonItemsSelectedToRecycle}
                              onChange={() => inventoryMenuStore.toggleAllUncommonItemsToRecycle()}
                              size="small"
                              sx={{
                                 color: (theme) => theme.palette.item.uncommon,
                                 [`&.${checkboxClasses.checked}`]: {
                                    color: (theme) => theme.palette.item.uncommon,
                                 },
                              }}
                           />
                           <Checkbox
                              checked={inventoryMenuStore.areAllCommonItemsSelectedToRecycle}
                              onChange={() => inventoryMenuStore.toggleAllCommonItemsToRecycle()}
                              size="small"
                              sx={{
                                 mr: 1.5,
                                 color: (theme) => theme.palette.item.common,
                                 [`&.${checkboxClasses.checked}`]: {
                                    color: (theme) => theme.palette.item.common,
                                 },
                              }}
                           />
                           <Button
                              variant="contained"
                              onClick={() => inventoryMenuStore.openRecycleDialog()}
                              disabled={inventoryMenuStore.itemsToRecycle.length === 0}
                           >
                              {t('recycle')}
                           </Button>
                        </Box>
                     </Grow>
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
                  <Tooltip title={t('sortItems')} disableInteractive>
                     <ToggleButton
                        size="small"
                        value="check"
                        id="items-sort-selector"
                        aria-controls={
                           inventoryMenuStore.isSortMenuOpened ? 'items-sort-selector' : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={inventoryMenuStore.isSortMenuOpened ? 'true' : undefined}
                        onClick={(e) => {
                           setSortByAnchor(e.currentTarget);
                           inventoryMenuStore.openSortMenu();
                        }}
                        sx={{
                           borderColor: (theme) =>
                              inventoryMenuStore.isSortMenuOpened
                                 ? theme.palette.link.hover
                                 : undefined,
                        }}
                     >
                        <SortIcon
                           fontSize="small"
                           sx={{
                              transition: 'all 0.3s',
                              color: (theme) =>
                                 inventoryMenuStore.isSortMenuOpened
                                    ? theme.palette.link.hover
                                    : 'inherit',
                           }}
                        />
                     </ToggleButton>
                  </Tooltip>
                  <Button
                     variant="contained"
                     onClick={() => inventoryMenuStore.close()}
                     sx={{ my: 0.25 }}
                  >
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
         <ItemsSortSelector
            anchorEl={sortByAnchor}
            open={inventoryMenuStore.isSortMenuOpened}
            handleClose={() => {
               setSortByAnchor(null);
               inventoryMenuStore.closeSortMenu();
            }}
         />
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
