import CloseIcon from '@mui/icons-material/CloseRounded';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent, { dialogContentClasses } from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import Draggable from 'react-draggable';

import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';
import TalentTree from '../../components/TalentTree';

export const TalentsMenu = observer(() => {
   const nodeRef = useRef(null);
   const { talentsMenuStore } = useStore();
   const { t } = useTranslation();

   return (
      <Draggable handle=".talents-menu-handle" nodeRef={nodeRef}>
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
            open={talentsMenuStore.isOpened}
            onClose={() => talentsMenuStore.close()}
         >
            <StyledDialogTitle className="talents-menu-handle">{t('talentTree')}</StyledDialogTitle>
            <IconButton
               aria-label="close"
               sx={{
                  position: 'absolute',
                  right: 8,
                  top: 12,
                  color: (theme) => theme.palette.text.primary,
               }}
               onClick={() => talentsMenuStore.close()}
            >
               <CloseIcon />
            </IconButton>
            <StyledDialogContent dividers>
               <TalentTree />
            </StyledDialogContent>
            <DialogActions>
               <Typography sx={{ mr: 'auto' }}>
                  {t('talentPointsAvailable', { count: talentsMenuStore.talentsPoints })}
               </Typography>
               <Button color="chalk" onClick={() => talentsMenuStore.close()}>
                  {t('cancel')}
               </Button>
               <Button
                  disabled={!talentsMenuStore.canApply}
                  variant="contained"
                  onClick={() => talentsMenuStore.save()}
               >
                  {t('apply')}
               </Button>
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
   cursor: 'grab',
   ':active': {
      cursor: 'grabbing',
   },
}));

const StyledDialogContent = styled(DialogContent)(() => ({
   [`&.${dialogContentClasses.root}`]: {
      padding: 0,
   },
}));
