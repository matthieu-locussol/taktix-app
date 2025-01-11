import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../store';
import { useTranslation } from '../../types/react-i18next';
import { getVersion } from '../../utils/version';
import { LanguageSelector } from '../components/LanguageSelector';
import { LauncherFormFooter } from '../components/LauncherFormFooter';
import { ServerStatus } from '../components/ServerStatus';
import { Changelog } from '../hud/components/Changelog';
import { ProgressBar } from '../hud/components/ProgressBar';

export const RegisterScreen = observer(() => {
   const store = useStore();
   const { loginStore, newsStore, registerStore, screenStore, settingsMenuStore, updaterStore } =
      store;
   const { t } = useTranslation();

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      registerStore.setLoading(true);

      const results = await fetch(`${import.meta.env.VITE_SERVER_URL}/register`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            username: registerStore.username,
            password: registerStore.password,
            email: registerStore.email,
         }),
      });
      const json = await results.json();

      if (json.error) {
         registerStore.setLoading(false);
         registerStore.setErrorMessage(json.error);
      } else {
         registerStore.reset();
         loginStore.setSuccessMessage('accountCreated');
         screenStore.setScreen('login');
      }
   };

   return (
      <Box
         noValidate
         component="form"
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
         onSubmit={onSubmit}
      >
         <Card sx={{ display: 'flex' }} variant="outlined">
            <CardContent>
               <Box alignItems="start" display="flex" justifyContent="space-between" mb={4}>
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
                        fontFamily="Orbitron"
                        fontWeight="bold"
                        sx={{ mt: 'auto', mb: -0.5, ml: 1 }}
                        variant="overline"
                     >
                        {getVersion()}
                     </Typography>
                  </Box>
                  <LanguageSelector
                     sx={{ my: 'auto' }}
                     variant="outlined"
                     onChange={(e) => {
                        settingsMenuStore.setLanguage(e.target.value);
                        settingsMenuStore.saveChanges();
                     }}
                  />
               </Box>
               <Changelog />
               <ServerStatus sx={{ mt: 'auto', pt: 4 }} />
            </CardContent>
            <Divider orientation="vertical" sx={{ borderColor: 'rgba(55, 65, 81)' }} />
            {updaterStore.isCheckingUpdate && (
               <CardContent>
                  <Typography align="center" variant="h1">
                     {t('accessUniverse')}
                  </Typography>
                  <CircularProgress />
               </CardContent>
            )}
            {!updaterStore.isCheckingUpdate && !updaterStore.shouldUpdate && (
               <CardContent>
                  <Typography gutterBottom align="center" variant="h1">
                     {t('accessUniverse')}
                  </Typography>
                  {registerStore.errorMessage && (
                     <Typography align="center" color="error" variant="body1">
                        {newsStore.status === 'maintenance'
                           ? t('serverInMaintenance')
                           : t(registerStore.errorMessage, registerStore.errorMessageOptions)}
                     </Typography>
                  )}
                  <TextField
                     autoComplete="email"
                     placeholder={t('emailAddress')}
                     sx={{ mt: 2 }}
                     type="email"
                     value={registerStore.email}
                     onChange={(e) => registerStore.setEmail(e.target.value)}
                  />
                  <TextField
                     autoComplete="username"
                     placeholder={t('username')}
                     sx={{ mt: 2 }}
                     type="text"
                     value={registerStore.username}
                     onChange={(e) => registerStore.setUsername(e.target.value)}
                  />
                  <TextField
                     autoComplete="new-password"
                     placeholder={t('password')}
                     sx={{ mt: 2 }}
                     type="password"
                     value={registerStore.password}
                     onChange={(e) => registerStore.setPassword(e.target.value)}
                  />
                  <Button
                     color="primary"
                     disabled={!registerStore.canSubmit}
                     sx={{ my: 2 }}
                     type="submit"
                     variant="contained"
                  >
                     {registerStore.loading ? (
                        <CircularProgress color="inherit" size={24} />
                     ) : (
                        t(screenStore.screen)
                     )}
                  </Button>
                  <LauncherFormFooter />
               </CardContent>
            )}
            {!updaterStore.isCheckingUpdate && updaterStore.shouldUpdate && (
               <CardContent>
                  <Typography align="center" variant="h1">
                     {t('accessUniverse')}
                  </Typography>
                  <Typography sx={{ mt: 4 }}>
                     {t('updateAvailable', { version: updaterStore.updateManifest?.version })}
                  </Typography>
                  <Typography>{t('updateAvailable_content')}</Typography>
                  {updaterStore.updating ? (
                     <ProgressBar
                        label={`${updaterStore.progress.toFixed(2)}%`}
                        sx={{ mt: 2 }}
                        value={updaterStore.progress}
                     />
                  ) : (
                     <Button
                        color="primary"
                        disabled={updaterStore.updating}
                        sx={{ mt: 2 }}
                        variant="contained"
                        onClick={() => updaterStore.update()}
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
