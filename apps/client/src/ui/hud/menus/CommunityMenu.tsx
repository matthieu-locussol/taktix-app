import MessageIcon from '@mui/icons-material/ChatBubbleRounded';
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
import LinearProgress from '@mui/material/LinearProgress';
import Table, { tableClasses } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import Draggable from 'react-draggable';
import { Trans } from 'react-i18next';
import { zProfessionType } from 'shared/src/types/Profession';
import { isRoom } from 'shared/src/types/Room';
import { useStore } from '../../../store';
import { TFunctionWrapper, useTranslation } from '../../../types/react-i18next';
import { StatusBadge } from '../../components/StatusBadge';

interface Column {
   id: 'avatar' | 'player' | 'map' | 'level' | 'profession';
   label: (t: TFunctionWrapper) => string;
   minWidth?: number;
   align?: 'right';
   format?: (value: string, t: TFunctionWrapper) => React.ReactNode;
}

const columns: Column[] = [
   {
      id: 'avatar',
      label: () => '',
      format: (value) => <img src={value} width={24} height={24} />,
   },
   {
      id: 'player',
      label: (t) => t('player'),
   },
   {
      id: 'map',
      label: (t) => t('map'),
      format: (value, t) => {
         if (isRoom(value)) {
            return t(value);
         }

         return t('unknownMap');
      },
   },
   {
      id: 'level',
      label: (t) => t('levelRaw'),
      align: 'right',
   },
   {
      id: 'profession',
      label: (t) => t('profession'),
      format: (value, t) => t(zProfessionType.parse(value)),
   },
];

export const CommunityMenu = observer(() => {
   const nodeRef = useRef(null);
   const { characterStore, communityMenuStore, settingsMenuStore } = useStore();
   const { t } = useTranslation();

   return (
      <Draggable handle=".community-menu-handle" nodeRef={nodeRef}>
         <StyledDialog
            ref={nodeRef}
            hideBackdrop
            disableEnforceFocus
            onClose={() => communityMenuStore.close()}
            open={communityMenuStore.isOpened}
            fullScreen={settingsMenuStore.fullScreenMenus.community}
            PaperProps={{
               sx: (theme) => ({
                  borderRadius: theme.spacing(0.5),
                  transition: 'all 0.3s',
               }),
            }}
         >
            <StyledDialogTitle className="community-menu-handle">
               {t('community')}
            </StyledDialogTitle>
            <IconButton
               aria-label="fullscreen"
               onClick={() => settingsMenuStore.toggleFullScreenMenu('community')}
               sx={{
                  position: 'absolute',
                  right: 48,
                  top: 12,
                  color: (theme) => theme.palette.text.primary,
               }}
            >
               {settingsMenuStore.fullScreenMenus.community ? (
                  <FullscreenOffIcon />
               ) : (
                  <FullscreenIcon />
               )}
            </IconButton>
            <IconButton
               aria-label="close"
               onClick={() => communityMenuStore.close()}
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
               <TableContainer sx={{ maxHeight: '100%' }}>
                  <StyledTable stickyHeader size="small">
                     <TableHead>
                        <TableRow>
                           {columns.map((column) => (
                              <StyledTableHead
                                 key={`community-header-${column.id}`}
                                 align={column.align}
                              >
                                 {column.label(t)}
                              </StyledTableHead>
                           ))}
                           <StyledTableHead>{t('actions')}</StyledTableHead>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {communityMenuStore.loading ? (
                           <TableRow>
                              <StyledTableCell colSpan={columns.length + 1} sx={{ p: 0 }}>
                                 <LinearProgress sx={{ height: 8 }} />
                              </StyledTableCell>
                           </TableRow>
                        ) : (
                           communityMenuStore.sortedPlayers.map((row) => (
                              <TableRow hover tabIndex={-1} key={`community-value-${row.player}`}>
                                 {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                       <StyledTableCell
                                          key={`community-value-${column.id}-${row.player}`}
                                          align={column.align}
                                          sx={{
                                             fontStyle:
                                                row.player === characterStore.name
                                                   ? 'italic'
                                                   : 'normal',
                                          }}
                                       >
                                          {column.format ? column.format(`${value}`, t) : value}
                                       </StyledTableCell>
                                    );
                                 })}
                                 <StyledTableCell>
                                    <IconButton
                                       size="small"
                                       color="inherit"
                                       onClick={() =>
                                          communityMenuStore.sendPrivateMessage(row.player)
                                       }
                                       disabled={row.player === characterStore.name}
                                    >
                                       <MessageIcon />
                                    </IconButton>
                                 </StyledTableCell>
                              </TableRow>
                           ))
                        )}
                     </TableBody>
                  </StyledTable>
               </TableContainer>
            </StyledDialogContent>
            <StyledDialogActions>
               <Box display="flex" alignItems="center" gap={1}>
                  <StatusBadge status="online" />
                  <Typography display="flex" alignItems="center" gap={1}>
                     <Trans
                        i18nKey="onlinePlayers"
                        values={{ count: communityMenuStore.playerCount }}
                        components={{ b: <b /> }}
                     />
                  </Typography>
               </Box>
               <Button variant="contained" onClick={() => communityMenuStore.close()}>
                  {t('close')}
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
