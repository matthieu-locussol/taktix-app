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
import { ItemMgt } from 'shared/src/utils/itemMgt.ts';

import { useStore } from '../../../store/index.tsx';
import { ITEM_RARITY_COLORS } from '../../../styles/appTheme.tsx';
import { useTranslation } from '../../../types/react-i18next.ts';
import { EquipmentSlot } from '../components/EquipmentSlot.tsx';
import { ItemsSortSelector } from '../components/ItemsSortSelector.tsx';
import { Tooltip } from '../components/Tooltip.tsx';

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
               disableEnforceFocus
               fullScreen
               hideBackdrop
               PaperProps={{
                  sx: (theme) => ({
                     borderRadius: theme.spacing(0.5),
                     transition: 'all 0.3s',
                  }),
               }}
               open={inventoryMenuStore.isOpened}
               onClose={() => inventoryMenuStore.close()}
            >
               <StyledDialogTitle className="inventory-menu-handle">
                  {t('inventory')}
               </StyledDialogTitle>
               <IconButton
                  aria-label="close"
                  sx={{
                     position: 'absolute',
                     right: 8,
                     top: 12,
                     color: (theme) => theme.palette.text.primary,
                  }}
                  onClick={() => inventoryMenuStore.close()}
               >
                  <CloseIcon />
               </IconButton>
               <StyledDialogContent dividers>
                  <Equipments>
                     <Box sx={{ display: 'flex', gap: 'min(1vw, 1.5vh)', alignItems: 'end' }}>
                        <Box sx={{ width: 'min(3vw, 4.5vh)', height: 'min(3vw, 4.5vh)' }} />
                        <EquipmentSlot
                           canBeHovered={characterStore.equippedItemsMap.helmet !== null}
                           item={characterStore.equippedItemsMap.helmet}
                           size="medium"
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.helmet?.id)
                           }
                        />
                        <EquipmentSlot
                           canBeHovered={characterStore.equippedItemsMap.amulet !== null}
                           item={characterStore.equippedItemsMap.amulet}
                           size="small"
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.amulet?.id)
                           }
                        />
                     </Box>
                     <Box
                        sx={{ display: 'flex', gap: 'min(1vw, 1.5vh)', py: 'min(0.25vw, 0.5vh)' }}
                     >
                        <EquipmentSlot
                           canBeHovered={characterStore.equippedItemsMap.weapon1 !== null}
                           item={characterStore.equippedItemsMap.weapon1}
                           size="large"
                           onDoubleClick={() =>
                              characterStore.unequipItem(
                                 characterStore.equippedItemsMap.weapon1?.id,
                              )
                           }
                        />
                        <EquipmentSlot
                           canBeHovered={characterStore.equippedItemsMap.chestplate !== null}
                           item={characterStore.equippedItemsMap.chestplate}
                           size="large"
                           onDoubleClick={() =>
                              characterStore.unequipItem(
                                 characterStore.equippedItemsMap.chestplate?.id,
                              )
                           }
                        />
                        <EquipmentSlot
                           canBeHovered={characterStore.equippedItemsMap.offhand !== null}
                           item={characterStore.equippedItemsMap.offhand}
                           size="large"
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
                           canBeHovered={characterStore.equippedItemsMap.ring1 !== null}
                           item={characterStore.equippedItemsMap.ring1}
                           size="small"
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.ring1?.id)
                           }
                        />
                        <EquipmentSlot
                           canBeHovered={characterStore.equippedItemsMap.belt !== null}
                           item={characterStore.equippedItemsMap.belt}
                           size="wide"
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.belt?.id)
                           }
                        />
                        <EquipmentSlot
                           canBeHovered={characterStore.equippedItemsMap.ring2 !== null}
                           item={characterStore.equippedItemsMap.ring2}
                           size="small"
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.ring2?.id)
                           }
                        />
                     </Box>
                     <Box
                        sx={{ display: 'flex', gap: 'min(1vw, 1.5vh)', pb: 'min(0.25vw, 0.5vh)' }}
                     >
                        <EquipmentSlot
                           canBeHovered={characterStore.equippedItemsMap.gloves !== null}
                           item={characterStore.equippedItemsMap.gloves}
                           size="medium"
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.gloves?.id)
                           }
                        />
                        <Box sx={{ width: 'min(1vw, 1.5vh)', height: 'min(1vw, 1.5vh)' }} />
                        <EquipmentSlot
                           canBeHovered={characterStore.equippedItemsMap.boots !== null}
                           item={characterStore.equippedItemsMap.boots}
                           size="medium"
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.boots?.id)
                           }
                        />
                     </Box>
                     <Box sx={{ display: 'flex', gap: 'min(1vw, 1.5vh)' }}>
                        <EquipmentSlot
                           canBeHovered={characterStore.equippedItemsMap.relic1 !== null}
                           item={characterStore.equippedItemsMap.relic1}
                           size="small"
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.relic1?.id)
                           }
                        />
                        <EquipmentSlot
                           canBeHovered={characterStore.equippedItemsMap.relic2 !== null}
                           item={characterStore.equippedItemsMap.relic2}
                           size="small"
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.relic2?.id)
                           }
                        />
                        <EquipmentSlot
                           canBeHovered={characterStore.equippedItemsMap.relic3 !== null}
                           item={characterStore.equippedItemsMap.relic3}
                           size="small"
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.relic3?.id)
                           }
                        />
                        <EquipmentSlot
                           canBeHovered={characterStore.equippedItemsMap.relic4 !== null}
                           item={characterStore.equippedItemsMap.relic4}
                           size="small"
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.relic4?.id)
                           }
                        />
                        <EquipmentSlot
                           canBeHovered={characterStore.equippedItemsMap.relic5 !== null}
                           item={characterStore.equippedItemsMap.relic5}
                           size="small"
                           onDoubleClick={() =>
                              characterStore.unequipItem(characterStore.equippedItemsMap.relic5?.id)
                           }
                        />
                        <EquipmentSlot
                           canBeHovered={characterStore.equippedItemsMap.relic6 !== null}
                           item={characterStore.equippedItemsMap.relic6}
                           size="small"
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
                           color={
                              inventoryMenuStore.itemsToRecycle.includes(item.id)
                                 ? 'error'
                                 : undefined
                           }
                           variant="dot"
                        >
                           <EquipmentSlot
                              key={item.id}
                              canBeHovered
                              equippedItem={inventoryMenuStore.equippedItemsByType[item.type]}
                              item={item}
                              size="small"
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
                        components={{ b: <b /> }}
                        i18nKey="creditsValue"
                        values={{ value: characterStore.money }}
                     />
                  </Typography>
                  •
                  <Typography align="center" sx={{ ml: 1, mr: 'auto' }}>
                     <Trans
                        components={{ b: <b /> }}
                        i18nKey="gachixValue"
                        values={{ value: characterStore.gachix }}
                     />
                  </Typography>
                  {inventoryMenuStore.mode === 'recycle' && (
                     <Grow in={inventoryMenuStore.mode === 'recycle'} mountOnEnter={false}>
                        <Box alignItems="center" display="flex">
                           <Checkbox
                              checked={inventoryMenuStore.areAllEpicItemsSelectedToRecycle}
                              size="small"
                              sx={{
                                 color: (theme) => theme.palette.item.epic,
                                 [`&.${checkboxClasses.checked}`]: {
                                    color: (theme) => theme.palette.item.epic,
                                 },
                              }}
                              onChange={() => inventoryMenuStore.toggleAllEpicItemsToRecycle()}
                           />
                           <Checkbox
                              checked={inventoryMenuStore.areAllRareItemsSelectedToRecycle}
                              size="small"
                              sx={{
                                 color: (theme) => theme.palette.item.rare,
                                 [`&.${checkboxClasses.checked}`]: {
                                    color: (theme) => theme.palette.item.rare,
                                 },
                              }}
                              onChange={() => inventoryMenuStore.toggleAllRareItemsToRecycle()}
                           />
                           <Checkbox
                              checked={inventoryMenuStore.areAllUncommonItemsSelectedToRecycle}
                              size="small"
                              sx={{
                                 color: (theme) => theme.palette.item.uncommon,
                                 [`&.${checkboxClasses.checked}`]: {
                                    color: (theme) => theme.palette.item.uncommon,
                                 },
                              }}
                              onChange={() => inventoryMenuStore.toggleAllUncommonItemsToRecycle()}
                           />
                           <Checkbox
                              checked={inventoryMenuStore.areAllCommonItemsSelectedToRecycle}
                              size="small"
                              sx={{
                                 mr: 1.5,
                                 color: (theme) => theme.palette.item.common,
                                 [`&.${checkboxClasses.checked}`]: {
                                    color: (theme) => theme.palette.item.common,
                                 },
                              }}
                              onChange={() => inventoryMenuStore.toggleAllCommonItemsToRecycle()}
                           />
                           <Button
                              disabled={inventoryMenuStore.itemsToRecycle.length === 0}
                              variant="contained"
                              onClick={() => inventoryMenuStore.openRecycleDialog()}
                           >
                              {t('recycle')}
                           </Button>
                        </Box>
                     </Grow>
                  )}
                  <Tooltip disableInteractive title={t('recycleMode')}>
                     <ToggleButton
                        selected={inventoryMenuStore.mode === 'recycle'}
                        size="small"
                        sx={{
                           transition: 'all 0.3s',
                           border: (theme) =>
                              inventoryMenuStore.mode === 'recycle'
                                 ? `1px solid ${theme.palette.link.hover}`
                                 : '1px solid inherit',
                        }}
                        value="check"
                        onChange={() => inventoryMenuStore.toggleMode('recycle')}
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
                  <Tooltip disableInteractive title={t('sortItems')}>
                     <ToggleButton
                        aria-controls={
                           inventoryMenuStore.isSortMenuOpened ? 'items-sort-selector' : undefined
                        }
                        aria-expanded={inventoryMenuStore.isSortMenuOpened ? 'true' : undefined}
                        aria-haspopup="true"
                        id="items-sort-selector"
                        size="small"
                        sx={{
                           borderColor: (theme) =>
                              inventoryMenuStore.isSortMenuOpened
                                 ? theme.palette.link.hover
                                 : undefined,
                        }}
                        value="check"
                        onClick={(e) => {
                           setSortByAnchor(e.currentTarget);
                           inventoryMenuStore.openSortMenu();
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
                     sx={{ my: 0.25 }}
                     variant="contained"
                     onClick={() => inventoryMenuStore.close()}
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
                  color="chalk"
                  variant="text"
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
                  color="primary"
                  variant="contained"
                  onClick={() => inventoryMenuStore.closeGachixGainedDialog()}
               >
                  {t('close')}
               </Button>
            </DialogActions>
         </Dialog>
         <ItemsSortSelector
            anchorEl={sortByAnchor}
            handleClose={() => {
               setSortByAnchor(null);
               inventoryMenuStore.closeSortMenu();
            }}
            open={inventoryMenuStore.isSortMenuOpened}
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
