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
import { useStore } from '../../../store';
import { keyboardLayouts } from '../../../store/SettingsMenuStore';
import { useTranslation } from '../../../types/react-i18next';
import { LanguageSelector } from '../../components/LanguageSelector';

export const SettingsMenu = observer(() => {
   const { settingsMenuStore } = useStore();
   const { t } = useTranslation();

   return (
      <StyledDialog
         onClose={() => settingsMenuStore.cancelChanges()}
         open={settingsMenuStore.isOpened}
         fullScreen={settingsMenuStore.fullScreenMenus.settings}
         PaperProps={{
            sx: (theme) => ({
               borderRadius: theme.spacing(0.5),
               transition: 'all 0.3s',
            }),
         }}
      >
         <DialogTitle sx={{ m: 0, p: 2 }}>{t('settings')}</DialogTitle>
         <IconButton
            aria-label="fullscreen"
            onClick={() => settingsMenuStore.toggleFullScreenMenu('settings')}
            sx={{
               position: 'absolute',
               right: 48,
               top: 12,
               color: (theme) => theme.palette.text.primary,
            }}
         >
            {settingsMenuStore.fullScreenMenus.settings ? (
               <FullscreenOffIcon />
            ) : (
               <FullscreenIcon />
            )}
         </IconButton>
         <IconButton
            aria-label="close"
            onClick={() => settingsMenuStore.cancelChanges()}
            sx={{
               position: 'absolute',
               right: 8,
               top: 12,
               color: (theme) => theme.palette.text.primary,
            }}
         >
            <CloseIcon />
         </IconButton>
         <DialogContent dividers>
            <Stack direction="row" alignItems="center" m={2}>
               <Typography
                  sx={{
                     minWidth: 200,
                  }}
               >
                  {t('keyboardLayout')}
               </Typography>
               <ToggleButtonGroup
                  size="small"
                  color="primary"
                  value={settingsMenuStore.keyboardLayout}
                  exclusive
                  onChange={(_e, value) => {
                     if (value !== null) {
                        settingsMenuStore.setKeyboardLayout(value);
                     }
                  }}
                  sx={{ ml: 2 }}
               >
                  {keyboardLayouts.map(({ label, value }) => (
                     <ToggleButton key={value} value={value}>
                        {t(label)}
                     </ToggleButton>
                  ))}
               </ToggleButtonGroup>
            </Stack>
            <FormControlLabel
               sx={{ m: 2 }}
               slotProps={{
                  typography: {
                     minWidth: 200,
                  },
               }}
               control={<LanguageSelector />}
               label={t('displayLanguage')}
               labelPlacement="start"
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
            <Stack spacing={2} direction="row" sx={{ m: 2 }} alignItems="center">
               <VolumeDown />
               <Slider
                  step={1}
                  marks={[...new Array(11)].map((_, index) => ({
                     value: index * 10,
                     label: index % 2 === 0 ? `${index * 10}%` : '',
                  }))}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  value={settingsMenuStore.volume}
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
               variant="text"
               color="error"
               onClick={() => settingsMenuStore.resetToDefaults()}
               sx={{ mr: 'auto' }}
            >
               {t('resetDefaults')}
            </Button>
            <Button color="chalk" onClick={() => settingsMenuStore.cancelChanges()}>
               {t('cancel')}
            </Button>
            <Button
               variant="contained"
               disabled={!settingsMenuStore.canSave()}
               onClick={() => settingsMenuStore.saveChanges()}
            >
               {t('saveChanges')}
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
