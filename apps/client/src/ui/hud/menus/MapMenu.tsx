import CloseIcon from '@mui/icons-material/CloseRounded';
import FullscreenOffIcon from '@mui/icons-material/FullscreenExitRounded';
import FullscreenIcon from '@mui/icons-material/FullscreenRounded';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent, { dialogContentClasses } from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Table, { tableClasses } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import Draggable from 'react-draggable';
import { Trans } from 'react-i18next';
import { TELEPORTATION_PLACES } from 'shared/src/data/teleportationPlaces';

import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';

export const MapMenu = observer(() => {
   const nodeRef = useRef(null);
   const { characterStore, mapMenuStore, settingsMenuStore } = useStore();
   const { t } = useTranslation();

   return (
      <Draggable handle=".map-menu-handle" nodeRef={nodeRef}>
         <StyledDialog
            ref={nodeRef}
            disableEnforceFocus
            hideBackdrop
            PaperProps={{
               sx: (theme) => ({
                  borderRadius: theme.spacing(0.5),
                  transition: 'all 0.3s',
               }),
            }}
            fullScreen={settingsMenuStore.fullScreenMenus.community}
            open={mapMenuStore.isOpened}
            onClose={() => mapMenuStore.close()}
         >
            <StyledDialogTitle className="map-menu-handle">{t('mapMenu')}</StyledDialogTitle>
            <IconButton
               aria-label="fullscreen"
               sx={{
                  position: 'absolute',
                  right: 48,
                  top: 12,
                  color: (theme) => theme.palette.text.primary,
               }}
               onClick={() => settingsMenuStore.toggleFullScreenMenu('community')}
            >
               {settingsMenuStore.fullScreenMenus.community ? (
                  <FullscreenOffIcon />
               ) : (
                  <FullscreenIcon />
               )}
            </IconButton>
            <IconButton
               aria-label="close"
               sx={{
                  position: 'absolute',
                  right: 8,
                  top: 12,
                  color: (theme) => theme.palette.text.primary,
               }}
               onClick={() => mapMenuStore.close()}
            >
               <CloseIcon />
            </IconButton>
            <StyledDialogContent dividers>
               <TableContainer sx={{ maxHeight: '100%' }}>
                  <StyledTable stickyHeader size="medium">
                     <TableHead>
                        <TableRow>
                           <StyledTableHead>{t('map')}</StyledTableHead>
                           <StyledTableHead>{t('position')}</StyledTableHead>
                           <StyledTableHead>{t('cost')}</StyledTableHead>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {mapMenuStore.teleportationPlaces.length === 0 ? (
                           <StyledTableRow active={false}>
                              <StyledTableCell
                                 align="left"
                                 colSpan={3}
                                 sx={{ fontStyle: 'italic' }}
                              >
                                 {t('noTeleportationPlaces')}
                              </StyledTableCell>
                           </StyledTableRow>
                        ) : (
                           mapMenuStore.teleportationPlaces.map((transferSpot) => (
                              <StyledTableRow
                                 key={`map-value-${transferSpot}`}
                                 active={transferSpot === mapMenuStore.selectedRoom}
                                 hover={!mapMenuStore.isTeleportationPlaceDisabled(transferSpot)}
                                 tabIndex={-1}
                                 onClick={() => mapMenuStore.setSelectedRoom(transferSpot)}
                              >
                                 <StyledTableCell
                                    align="left"
                                    sx={{
                                       fontStyle:
                                          transferSpot === characterStore.map ? 'italic' : 'normal',
                                       opacity: mapMenuStore.isTeleportationPlaceDisabled(
                                          transferSpot,
                                       )
                                          ? 0.5
                                          : 1,
                                    }}
                                 >
                                    {t(transferSpot)}
                                    {transferSpot === characterStore.map && ' (current)'}
                                 </StyledTableCell>
                                 <StyledTableCell
                                    align="left"
                                    sx={{
                                       fontStyle:
                                          transferSpot === characterStore.map ? 'italic' : 'normal',
                                       opacity: mapMenuStore.isTeleportationPlaceDisabled(
                                          transferSpot,
                                       )
                                          ? 0.5
                                          : 1,
                                    }}
                                 >
                                    [{TELEPORTATION_PLACES[transferSpot]?.x}
                                    {', '}
                                    {TELEPORTATION_PLACES[transferSpot]?.y}]
                                 </StyledTableCell>
                                 <StyledTableCell
                                    align="left"
                                    sx={{
                                       fontStyle:
                                          transferSpot === characterStore.map ? 'italic' : 'normal',
                                       opacity: mapMenuStore.isTeleportationPlaceDisabled(
                                          transferSpot,
                                       )
                                          ? 0.5
                                          : 1,
                                    }}
                                 >
                                    {TELEPORTATION_PLACES[transferSpot]?.price ?? 0}
                                 </StyledTableCell>
                              </StyledTableRow>
                           ))
                        )}
                     </TableBody>
                  </StyledTable>
               </TableContainer>
            </StyledDialogContent>
            <StyledDialogActions>
               <Box alignItems="center" display="flex" gap={1}>
                  <Typography alignItems="center" display="flex" gap={1}>
                     <Trans
                        components={{ b: <b /> }}
                        i18nKey="creditsValue"
                        values={{ value: characterStore.money }}
                     />
                  </Typography>
               </Box>
               <Button
                  color="chalk"
                  sx={{ display: 'flex', ml: 'auto !important' }}
                  variant="text"
                  onClick={() => mapMenuStore.close()}
               >
                  {t('close')}
               </Button>
               <Button
                  disabled={mapMenuStore.selectedRoom === null || !mapMenuStore.hasEnoughMoney}
                  variant="contained"
                  onClick={() => mapMenuStore.teleport()}
               >
                  {t('teleport')}
               </Button>
            </StyledDialogActions>
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

const StyledDialogActions = styled(DialogActions)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
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
}));

const StyledTableRow = styled(TableRow, { shouldForwardProp: (prop) => prop !== 'active' })<{
   active: boolean;
}>(({ theme, hover, active }) => ({
   '&:hover': {
      cursor: 'pointer',
   },
   ...(!active &&
      hover && {
         '&:hover': {
            [`.${tableCellClasses.root}`]: {
               cursor: 'pointer',
               backgroundColor: theme.palette.statistics.background.normal,
            },
         },
      }),
   ...(active && {
      [`.${tableCellClasses.root}`]: {
         fontWeight: 'bold',
         backgroundColor: theme.palette.statistics.background.hover,
         borderColor: theme.palette.primary.main,
      },
   }),
}));
