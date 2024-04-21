import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { listen } from '@tauri-apps/api/event';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { AuthRoomUserData } from 'shared/src/rooms/AuthRoom';
import { useStore } from '../../store';
import { useTranslation } from '../../types/react-i18next';
import { isTauri } from '../../utils/tauri';
import { getVersion } from '../../utils/version';
import { LanguageSelector } from '../components/LanguageSelector';
import { LauncherFormFooter } from '../components/LauncherFormFooter';
import { ServerStatus } from '../components/ServerStatus';
import { Changelog } from '../hud/components/Changelog';
import { ProgressBar } from '../hud/components/ProgressBar';

export const LoginScreen = observer(() => {
   const store = useStore();
   const {
      characterSelectionStore,
      colyseusStore,
      loginStore,
      newsStore,
      notificationStore,
      screenStore,
      settingsMenuStore,
      updaterStore,
   } = store;
   const { t } = useTranslation();

   useEffect(() => {
      notificationStore.askPermission();
   }, []);

   useEffect(() => {
      if (newsStore.changelogs.length === 0) {
         newsStore.fetchChangelogs();
      }
   }, []);

   useEffect(() => {
      if (isTauri()) {
         const unlisten = listen<number>('updateProgress', (event) => {
            if (event.payload >= 0) {
               updaterStore.updateProgress(event.payload);
            }
         });

         return () => {
            unlisten.then((f) => f());
         };
      }

      return undefined;
   }, []);

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { username, password } = loginStore;
      loginStore.setLoading(true);

      colyseusStore
         .login(username, password)
         .then((room) => {
            if (loginStore.memorizeCredentials) {
               localStorage.setItem('username', loginStore.username);
               localStorage.setItem('password', loginStore.password);
            }

            room.onMessage('userData', ({ characters }: AuthRoomUserData) => {
               colyseusStore.setAuthRoom(room);
               characterSelectionStore.setCharacters(characters);
               screenStore.setScreen('characterSelection');
               loginStore.setLoading(false);
            });
         })
         .catch(() => {
            loginStore.setErrorMessage('incorrectCredentials', { username });
            loginStore.setLoading(false);
         });
   };

   return (
      <Box
         component="form"
         onSubmit={onSubmit}
         noValidate
         sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            '& > *': {
               zIndex: 1,
            },
         }}
      >
         <Card variant="outlined" sx={{ display: 'flex' }}>
            <CardContent>
               <Box display="flex" justifyContent="space-between" alignItems="start" mb={4}>
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'center',
                     }}
                  >
                     <Typography variant="h1">Taktix</Typography>
                     <Typography
                        color="white"
                        fontWeight="bold"
                        fontFamily="Orbitron"
                        variant="overline"
                        sx={{ mt: 'auto', mb: -0.5, ml: 1 }}
                     >
                        {getVersion()}
                     </Typography>
                  </Box>
                  <LanguageSelector
                     variant="outlined"
                     onChange={(e) => {
                        settingsMenuStore.setLanguage(e.target.value);
                        settingsMenuStore.saveChanges();
                     }}
                     sx={{ my: 'auto' }}
                  />
               </Box>
               <Changelog />
               <ServerStatus sx={{ mt: 'auto', pt: 4 }} />
            </CardContent>
            <Divider orientation="vertical" sx={{ borderColor: 'rgba(55, 65, 81)' }} />
            {updaterStore.shouldUpdate === undefined && (
               <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h1" align="center">
                     {t('accessUniverse')}
                  </Typography>
                  <CircularProgress size={64} sx={{ mt: 8 }} />
               </CardContent>
            )}
            {updaterStore.shouldUpdate === false && (
               <CardContent>
                  <Typography variant="h1" align="center" gutterBottom>
                     {t('accessUniverse')}
                  </Typography>
                  {loginStore.errorMessage && (
                     <Typography variant="body1" align="center" color="error">
                        {newsStore.status === 'maintenance'
                           ? t('serverInMaintenance')
                           : t(loginStore.errorMessage, loginStore.errorMessageOptions)}
                     </Typography>
                  )}
                  {loginStore.successMessage && (
                     <Typography
                        variant="body1"
                        align="center"
                        sx={(theme) => ({ color: theme.palette.success.main })}
                     >
                        {t(loginStore.successMessage, loginStore.successMessageOptions)}
                     </Typography>
                  )}
                  <TextField
                     type="text"
                     placeholder={t('username')}
                     autoComplete="username"
                     value={loginStore.username}
                     onChange={(e) => loginStore.setUsername(e.target.value)}
                     sx={{ mt: 2 }}
                  />
                  <TextField
                     type="password"
                     placeholder={t('password')}
                     autoComplete="current-password"
                     value={loginStore.password}
                     onChange={(e) => loginStore.setPassword(e.target.value)}
                     sx={{ mt: 2 }}
                  />
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={loginStore.memorizeCredentials}
                           onChange={(e) => loginStore.setMemorizeCredentials(e.target.checked)}
                        />
                     }
                     label={t('memorizeCredentials')}
                     sx={{ mt: 2 }}
                  />
                  <Button
                     disabled={!loginStore.canSubmit}
                     type="submit"
                     variant="contained"
                     color="primary"
                     sx={{ my: 2 }}
                  >
                     {loginStore.loading ? (
                        <CircularProgress size={24} color="inherit" />
                     ) : (
                        t(screenStore.screen)
                     )}
                  </Button>
                  <LauncherFormFooter />
               </CardContent>
            )}
            {updaterStore.shouldUpdate && (
               <CardContent>
                  <Typography variant="h1" align="center">
                     {t('accessUniverse')}
                  </Typography>
                  <Typography sx={{ mt: 4 }}>
                     {t('updateAvailable', { version: updaterStore.updateManifest?.version })}
                  </Typography>
                  <Typography>{t('updateAvailable_content')}</Typography>
                  {updaterStore.updating ? (
                     <ProgressBar
                        label={`${updaterStore.progress.toFixed(2)}%`}
                        value={updaterStore.progress}
                        sx={{ mt: 2 }}
                     />
                  ) : (
                     <Button
                        disabled={updaterStore.updating}
                        variant="contained"
                        color="primary"
                        onClick={() => updaterStore.update()}
                        sx={{ mt: 2 }}
                     >
                        {t('update')}
                     </Button>
                  )}
               </CardContent>
            )}
            <Dialog open={updaterStore.openUpdateModal}>
               <DialogTitle>{t('gameRestartNeeded_title')}</DialogTitle>
               <DialogContent>
                  <DialogContentText>{t('gameRestartNeeded_content')}</DialogContentText>
               </DialogContent>
               <DialogActions sx={{ justifyContent: 'center' }}>
                  <Button variant="contained" onClick={() => updaterStore.restart()}>
                     {t('restart')}
                  </Button>
               </DialogActions>
            </Dialog>
            <Dialog open={loginStore.openMemorizeCredentials}>
               <DialogTitle>{t('saveCredentials_title')}</DialogTitle>
               <DialogContent>
                  <DialogContentText>{t('saveCredentials_content')}</DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button color="chalk" onClick={() => loginStore.cancelSaveCredentials()}>
                     {t('cancel')}
                  </Button>
                  <Button variant="contained" onClick={() => loginStore.saveCredentials()}>
                     {t('memorize')}
                  </Button>
               </DialogActions>
            </Dialog>
         </Card>
      </Box>
   );
});

const CardContent = styled(Box)(({ theme }) =>
   theme.unstable_sx({
      p: 8,
      display: 'flex',
      flexDirection: 'column',
      width: theme.spacing(46),
   }),
);
