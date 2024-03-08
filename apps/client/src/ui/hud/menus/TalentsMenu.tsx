import CloseIcon from '@mui/icons-material/CloseRounded';
import FullscreenOffIcon from '@mui/icons-material/FullscreenExitRounded';
import FullscreenIcon from '@mui/icons-material/FullscreenRounded';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent, { dialogContentClasses } from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';

export const TalentsMenu = observer(() => {
   const { settingsMenuStore, talentsMenuStore } = useStore();
   const { t } = useTranslation();

   return (
      <StyledDialog
         hideBackdrop
         disableEnforceFocus
         onClose={() => talentsMenuStore.close()}
         open={talentsMenuStore.isOpened}
         fullScreen={settingsMenuStore.fullScreenMenus.talents}
         PaperProps={{
            sx: (theme) => ({
               borderRadius: theme.spacing(0.5),
               transition: 'all 0.3s',
            }),
         }}
      >
         <DialogTitle sx={{ m: 0, p: 2 }}>{t('community')}</DialogTitle>
         <IconButton
            aria-label="fullscreen"
            onClick={() => settingsMenuStore.toggleFullScreenMenu('talents')}
            sx={{
               position: 'absolute',
               right: 48,
               top: 12,
               color: (theme) => theme.palette.text.primary,
            }}
         >
            {settingsMenuStore.fullScreenMenus.talents ? <FullscreenOffIcon /> : <FullscreenIcon />}
         </IconButton>
         <IconButton
            aria-label="close"
            onClick={() => talentsMenuStore.close()}
            sx={{
               position: 'absolute',
               right: 8,
               top: 12,
               color: (theme) => theme.palette.text.primary,
            }}
         >
            <CloseIcon />
         </IconButton>
         <DialogContent dividers>Content</DialogContent>
         <DialogActions>
            <Button variant="contained" onClick={() => talentsMenuStore.close()}>
               {t('close')}
            </Button>
         </DialogActions>
      </StyledDialog>
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
