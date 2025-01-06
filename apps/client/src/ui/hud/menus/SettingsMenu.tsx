import CloseIcon from '@mui/icons-material/CloseRounded';
import FullscreenOffIcon from '@mui/icons-material/FullscreenExitRounded';
import FullscreenIcon from '@mui/icons-material/FullscreenRounded';
import VolumeDown from '@mui/icons-material/VolumeDownRounded';
import VolumeUp from '@mui/icons-material/VolumeUpRounded';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent, { dialogContentClasses } from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import Draggable from 'react-draggable';

import { useStore } from '../../../store';
import { keyboardLayouts } from '../../../store/SettingsMenuStore';
import { useTranslation } from '../../../types/react-i18next';
import { LanguageSelector } from '../../components/LanguageSelector';

export const SettingsMenu = observer(() => {
   const nodeRef = useRef(null);
   const { settingsMenuStore } = useStore();
   const { t } = useTranslation();

   return (
      <Draggable handle=".settings-menu-handle" nodeRef={nodeRef}>
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
            fullScreen={settingsMenuStore.fullScreenMenus.settings}
            open={settingsMenuStore.isOpened}
            onClose={() => settingsMenuStore.cancelChanges()}
         >
            <StyledDialogTitle className="settings-menu-handle">{t('settings')}</StyledDialogTitle>
            <IconButton
               aria-label="fullscreen"
               sx={{
                  position: 'absolute',
                  right: 48,
                  top: 12,
                  color: (theme) => theme.palette.text.primary,
               }}
               onClick={() => settingsMenuStore.toggleFullScreenMenu('settings')}
            >
               {settingsMenuStore.fullScreenMenus.settings ? (
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
               onClick={() => settingsMenuStore.cancelChanges()}
            >
               <CloseIcon />
            </IconButton>
            <DialogContent dividers>
               <Stack alignItems="center" direction="row" m={2}>
                  <Typography
                     sx={{
                        minWidth: 200,
                     }}
                  >
                     {t('keyboardLayout')}
                  </Typography>
                  <ToggleButtonGroup
                     exclusive
                     color="primary"
                     size="small"
                     sx={{ ml: 2 }}
                     value={settingsMenuStore.keyboardLayout}
                     onChange={(_e, value) => {
                        if (value !== null) {
                           settingsMenuStore.setKeyboardLayout(value);
                        }
                     }}
                  >
                     {keyboardLayouts.map(({ label, value }) => (
                        <ToggleButton key={value} value={value}>
                           {t(label)}
                        </ToggleButton>
                     ))}
                  </ToggleButtonGroup>
               </Stack>
               <FormControlLabel
                  control={
                     <LanguageSelector
                        variant="outlined"
                        onChange={(e) => settingsMenuStore.setLanguage(e.target.value)}
                     />
                  }
                  label={t('displayLanguage')}
                  labelPlacement="start"
                  slotProps={{
                     typography: {
                        minWidth: 200,
                     },
                  }}
                  sx={{ m: 2 }}
               />
               <br />
               <FormControlLabel
                  control={
                     <Checkbox
                        checked={settingsMenuStore.fullScreen}
                        onChange={(e) => settingsMenuStore.setFullScreen(e.target.checked)}
                     />
                  }
                  label={t('fullscreenMode')}
                  labelPlacement="start"
                  slotProps={{
                     typography: {
                        minWidth: 204,
                     },
                  }}
                  sx={{ my: 2 }}
               />
               <Stack alignItems="center" direction="row" spacing={2} sx={{ m: 2 }}>
                  <VolumeDown />
                  <Slider
                     marks={[...new Array(11)].map((_, index) => ({
                        value: index * 10,
                        label: index % 2 === 0 ? `${index * 10}%` : '',
                     }))}
                     max={100}
                     min={0}
                     step={1}
                     value={settingsMenuStore.volume}
                     valueLabelDisplay="auto"
                     onChange={(_e, value) => {
                        if (typeof value === 'number') {
                           settingsMenuStore.setVolume(value);
                        }
                     }}
                  />
                  <VolumeUp />
               </Stack>
            </DialogContent>
            <DialogActions>
               <Button
                  color="error"
                  sx={{ mr: 'auto' }}
                  variant="text"
                  onClick={() => settingsMenuStore.resetToDefaults()}
               >
                  {t('resetDefaults')}
               </Button>
               <Button color="chalk" onClick={() => settingsMenuStore.cancelChanges()}>
                  {t('cancel')}
               </Button>
               <Button
                  disabled={!settingsMenuStore.canSave()}
                  variant="contained"
                  onClick={() => settingsMenuStore.saveChanges()}
               >
                  {t('saveChanges')}
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
