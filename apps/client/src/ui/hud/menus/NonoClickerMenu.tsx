import CloseIcon from '@mui/icons-material/CloseRounded';
import { Button, styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent, { dialogContentClasses } from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import Draggable from 'react-draggable';
import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';

export const NonoClickerMenu = observer(() => {
   const nodeRef = useRef(null);
   const { nonoClickerMenuStore } = useStore();
   const { t } = useTranslation();

   return (
      <Draggable handle=".nono-clicker-menu-handle" nodeRef={nodeRef}>
         <StyledDialog
            ref={nodeRef}
            fullScreen
            hideBackdrop
            disableEnforceFocus
            onClose={() => nonoClickerMenuStore.close()}
            open={nonoClickerMenuStore.isOpened}
            PaperProps={{
               sx: (theme) => ({
                  borderRadius: theme.spacing(0.5),
                  transition: 'all 0.3s',
               }),
            }}
         >
            <StyledDialogTitle className="nono-clicker-menu-handle">
               {t('nonoclicker')}
            </StyledDialogTitle>
            <IconButton
               aria-label="close"
               onClick={() => nonoClickerMenuStore.close()}
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
               <iframe
                  src="https://nonoclicker.netlify.app/"
                  title="NonoClicker"
                  allow="autoplay;"
                  style={{
                     zoom: 0.98,
                     transform: 'scale(0.98)',
                     transformOrigin: '0 0',
                     width: '110%',
                     height: '110%',
                  }}
               />
            </StyledDialogContent>
            <DialogActions>
               <Button
                  variant="contained"
                  onClick={() => nonoClickerMenuStore.close()}
                  sx={{ display: 'flex', ml: 'auto !important' }}
               >
                  {t('close')}
               </Button>
            </DialogActions>
         </StyledDialog>
      </Draggable>
   );
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
   position: 'absolute',
   top: '5vh',
   left: '10vw',
   right: '10vw',
   bottom: 'calc(15vh + 5vh)',
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
