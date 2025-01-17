import type { TranslationKey } from 'shared/src/data/translations';

import LosersIcon from '@mui/icons-material/BlockRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import WinnersIcon from '@mui/icons-material/EmojiEventsRounded';
import { styled, tableClasses } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent, { dialogContentClasses } from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import Draggable from 'react-draggable';
import { LevelMgt } from 'shared/src/utils/levelMgt';

import { store, useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';
import { EquipmentSlot } from '../components/EquipmentSlot';

export const FightResultsMenu = observer(() => {
   const nodeRef = useRef(null);
   const { pveFightStore } = useStore();
   const { t } = useTranslation();

   if (!pveFightStore.isFightResultsMenuOpened) {
      return null;
   }

   const AlliesComponent = () => (
      <>
         {pveFightStore.fightResults?.allies.map(({ id, name, experience }, idx) => {
            const gainedExperience = pveFightStore.fightResults?.experiences[idx] ?? 0;
            const oldLevel = LevelMgt.getLevel(experience);
            const newLevel = LevelMgt.getLevel(experience + gainedExperience);
            const levelCell = oldLevel === newLevel ? newLevel : `${oldLevel} -> ${newLevel}`;
            const gainedMoney = pveFightStore.alliesMoney[name] ?? 0;
            const loots = pveFightStore.fightResults.loots[idx];

            const Items = () => (
               <Box sx={{ display: 'flex', gap: 1 }}>
                  {loots.map((loot, lootIdx) => (
                     <EquipmentSlot
                        key={`loot-${idx}-${lootIdx}`}
                        canBeHovered
                        item={loot}
                        size="tiny"
                     />
                  ))}
               </Box>
            );

            return (
               <TableRow key={`fight-results-value-${id}-${name}`} hover tabIndex={-1}>
                  <StyledTableCell>{name}</StyledTableCell>
                  <StyledTableCell>{levelCell}</StyledTableCell>
                  <StyledTableCell>+{gainedExperience} XP</StyledTableCell>
                  <StyledTableCell>+{gainedMoney} Credits</StyledTableCell>
                  <StyledTableCell>
                     <Items />
                  </StyledTableCell>
               </TableRow>
            );
         })}
      </>
   );

   const EnemiesComponent = () => (
      <>
         {pveFightStore.fightResults?.monsters.map(({ id, name, level }) => (
            <TableRow key={`fight-results-value-${id}-${name}`} hover tabIndex={-1}>
               <StyledTableCell>{t(name as TranslationKey)}</StyledTableCell>
               <StyledTableCell>{level}</StyledTableCell>
               <StyledTableCell />
               <StyledTableCell />
               <StyledTableCell />
            </TableRow>
         ))}
      </>
   );

   return (
      <Draggable handle=".fight-results-menu-handle" nodeRef={nodeRef}>
         <StyledDialog
            ref={nodeRef}
            fullScreen
            PaperProps={{
               sx: (theme) => ({
                  borderRadius: theme.spacing(0.5),
                  transition: 'all 0.3s',
               }),
            }}
            open={pveFightStore.isFightResultsMenuOpened}
            onClose={() => pveFightStore.closeFightResults()}
         >
            <StyledDialogTitle className="fight-results-menu-handle">
               {store.pveFightStore.fightResults?.won ? t('victory') : t('defeat')} -{' '}
               {t('turns', { count: store.pveFightStore.fightResults?.turns.length })}
            </StyledDialogTitle>
            <IconButton
               aria-label="close"
               sx={{
                  position: 'absolute',
                  right: 8,
                  top: 12,
                  color: (theme) => theme.palette.text.primary,
               }}
               onClick={() => pveFightStore.closeFightResults()}
            >
               <CloseIcon />
            </IconButton>
            <StyledDialogContent
               dividers
               sx={{
                  width: '100%',
                  overflow: 'hidden',
               }}
            >
               <TableContainer sx={{ maxHeight: '100%' }}>
                  <StyledTable stickyHeader size="small">
                     <TableHead>
                        <TableRow>
                           <StyledTableHead>{t('name')}</StyledTableHead>
                           <StyledTableHead>{t('levelRaw')}</StyledTableHead>
                           <StyledTableHead>{t('experience')}</StyledTableHead>
                           <StyledTableHead>{t('credits')}</StyledTableHead>
                           <StyledTableHead>{t('loots')}</StyledTableHead>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        <TableRow>
                           <StyledTableCell
                              colSpan={5}
                              sx={{
                                 backgroundColor: 'rgba(0, 0, 0, 0.3)',
                              }}
                           >
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                 <WinnersIcon fontSize="small" sx={{ mr: 2 }} />
                                 <Typography fontWeight="bold" lineHeight={1} variant="overline">
                                    {t('winners')}
                                 </Typography>
                              </Box>
                           </StyledTableCell>
                        </TableRow>
                        {pveFightStore.fightResults?.won ? (
                           <AlliesComponent />
                        ) : (
                           <EnemiesComponent />
                        )}
                        <TableRow>
                           <StyledTableCell
                              colSpan={5}
                              sx={{
                                 backgroundColor: 'rgba(0, 0, 0, 0.3)',
                              }}
                           >
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                 <LosersIcon fontSize="small" sx={{ mr: 2 }} />
                                 <Typography fontWeight="bold" lineHeight={1} variant="overline">
                                    {t('losers')}
                                 </Typography>
                              </Box>
                           </StyledTableCell>
                        </TableRow>
                        {pveFightStore.fightResults?.won ? (
                           <EnemiesComponent />
                        ) : (
                           <AlliesComponent />
                        )}
                     </TableBody>
                  </StyledTable>
               </TableContainer>
            </StyledDialogContent>
            <DialogActions>
               <Button variant="contained" onClick={() => pveFightStore.closeFightResults()}>
                  {t('close')}
               </Button>
            </DialogActions>
         </StyledDialog>
      </Draggable>
   );
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
   position: 'absolute',
   top: '15vh',
   left: '20vw',
   right: '20vw',
   bottom: 'calc(15vh + 15vh)',
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
   cursor: 'grab',
   ':active': {
      cursor: 'grabbing',
   },
}));

const StyledDialogContent = styled(DialogContent)(() => ({
   [`&.${dialogContentClasses.root}`]: {
      padding: '0px !important',
   },
}));

const StyledTable = styled(Table)(({ theme }) => ({
   [`&.${tableClasses.root}`]: {
      borderColor: theme.palette.paper.border,
   },
}));

const StyledTableHead = styled(TableCell)(({ theme }) => ({
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
   borderColor: theme.palette.paper.border,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   backgroundColor: theme.palette.paper.background,
   borderColor: theme.palette.paper.border,
   whiteSpace: 'nowrap',
}));
