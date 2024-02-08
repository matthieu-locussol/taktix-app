import CloseIcon from '@mui/icons-material/CloseRounded';
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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store';
import { keyboardLayouts, languages } from '../../../store/SettingsMenuStore';

export const SettingsMenu = observer(() => {
   const { settingsMenuStore } = useStore();

   return (
      <StyledDialog
         fullScreen
         onClose={() => settingsMenuStore.cancelChanges()}
         open={settingsMenuStore.isOpened}
         PaperProps={{
            sx: (theme) => ({
               borderRadius: theme.spacing(0.5),
            }),
         }}
      >
         <DialogTitle sx={{ m: 0, p: 2 }}>Settings</DialogTitle>
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
                  Keyboard layout
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
                        {label}
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
               control={
                  <Select
                     size="small"
                     value={settingsMenuStore.language}
                     onChange={(e) => settingsMenuStore.setLanguage(e.target.value)}
                     MenuProps={{
                        slotProps: {
                           paper: {
                              elevation: 0,
                              variant: 'outlined',
                           },
                        },
                     }}
                     sx={{ ml: 2 }}
                  >
                     {languages.map(({ label, value }) => (
                        <MenuItem key={value} value={value}>
                           {label}
                        </MenuItem>
                     ))}
                  </Select>
               }
               label="Display language"
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
               label="Fullscreen mode"
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
               Reset to defaults
            </Button>
            <Button color="chalk" onClick={() => settingsMenuStore.cancelChanges()}>
               Cancel
            </Button>
            <Button
               variant="contained"
               disabled={!settingsMenuStore.canSave()}
               onClick={() => settingsMenuStore.saveChanges()}
            >
               Save changes
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
