import type { TFunctionWrapper } from '../../../types/react-i18next.ts';

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
import { zCharacterSprite } from 'shared/src/data/charactersSprites.ts';
import { zProfessionType } from 'shared/src/types/Profession.ts';
import { isRoom } from 'shared/src/types/Room.ts';

import { useStore } from '../../../store/index.tsx';
import { useTranslation } from '../../../types/react-i18next.ts';
import { StatusBadge } from '../../components/StatusBadge.tsx';
import { CharacterSpriteStatic } from '../components/CharacterSpriteStatic.tsx';

interface Column {
   id: 'spritesheet' | 'player' | 'map' | 'level' | 'profession';
   label: (t: TFunctionWrapper) => string;
   minWidth?: number;
   align?: 'right';
   format?: (value: string, t: TFunctionWrapper) => React.ReactNode;
}

const columns: Column[] = [
   {
      id: 'spritesheet',
      label: () => '',
      format: (value) => (
         <CharacterSpriteStatic
            scale={1.5}
            sprite={zCharacterSprite.parse(value)}
            sx={{ mb: 1.5 }}
         />
      ),
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
            disableEnforceFocus
            hideBackdrop
            PaperProps={{
               sx: (theme) => ({
                  borderRadius: theme.spacing(0.5),
                  transition: 'all 0.3s',
               }),
            }}
            fullScreen={settingsMenuStore.fullScreenMenus.community}
            open={communityMenuStore.isOpened}
            onClose={() => communityMenuStore.close()}
         >
            <StyledDialogTitle className="community-menu-handle">
               {t('community')}
            </StyledDialogTitle>
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
               onClick={() => communityMenuStore.close()}
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
                              <TableRow key={`community-value-${row.player}`} hover tabIndex={-1}>
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
                                       color="inherit"
                                       disabled={row.player === characterStore.name}
                                       size="small"
                                       onClick={() =>
                                          communityMenuStore.sendPrivateMessage(row.player)
                                       }
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
               <Box alignItems="center" display="flex" gap={1}>
                  <StatusBadge status="online" />
                  <Typography alignItems="center" display="flex" gap={1}>
                     <Trans
                        components={{ b: <b /> }}
                        i18nKey="onlinePlayers"
                        values={{ count: communityMenuStore.playerCount }}
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
