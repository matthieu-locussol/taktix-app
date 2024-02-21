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
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import { useTranslation } from '../../types/react-i18next';
import { getVersion } from '../../utils/version';
import { ServerStatus } from '../components/ServerStatus';
import { Changelog } from '../hud/components/Changelog';
import { ProgressBar } from '../hud/components/ProgressBar';
import { NEWS_HEIGHT } from './LoginScreen';

export const RegisterScreen = observer(() => {
   const store = useStore();
   const { loginStore, newsStore, registerStore, screenStore, updaterStore } = store;
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
            <CardContent sx={{ height: NEWS_HEIGHT }}>
               <Box
                  sx={{ display: 'flex', alignItems: 'baseline', mb: 4, justifyContent: 'center' }}
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
               <Changelog />
               <ServerStatus sx={{ mt: 'auto', pt: 4 }} />
            </CardContent>
            <Divider orientation="vertical" sx={{ borderColor: 'rgba(55, 65, 81)' }} />
            {updaterStore.shouldUpdate === undefined && (
               <CardContent>
                  <Typography variant="h1" align="center">
                     {t('accessUniverse')}
                  </Typography>
                  <CircularProgress />
               </CardContent>
            )}
            {updaterStore.shouldUpdate === false && (
               <CardContent>
                  <Typography variant="h1" align="center" gutterBottom>
                     {t('accessUniverse')}
                  </Typography>
                  {registerStore.errorMessage && (
                     <Typography variant="body1" align="center" color="error">
                        {newsStore.status === 'maintenance'
                           ? t('serverInMaintenance')
                           : t(registerStore.errorMessage, registerStore.errorMessageOptions)}
                     </Typography>
                  )}
                  <TextField
                     type="email"
                     placeholder={t('emailAddress')}
                     autoComplete="email"
                     value={registerStore.email}
                     onChange={(e) => registerStore.setEmail(e.target.value)}
                     sx={{ mt: 2 }}
                  />
                  <TextField
                     type="text"
                     placeholder={t('username')}
                     autoComplete="username"
                     value={registerStore.username}
                     onChange={(e) => registerStore.setUsername(e.target.value)}
                     sx={{ mt: 2 }}
                  />
                  <TextField
                     type="password"
                     placeholder={t('password')}
                     autoComplete="new-password"
                     value={registerStore.password}
                     onChange={(e) => registerStore.setPassword(e.target.value)}
                     sx={{ mt: 2 }}
                  />
                  <Button
                     disabled={!registerStore.canSubmit}
                     type="submit"
                     variant="contained"
                     color="primary"
                     sx={{ my: 2 }}
                  >
                     {registerStore.loading ? (
                        <CircularProgress size={24} color="inherit" />
                     ) : (
                        t(screenStore.screen)
                     )}
                  </Button>
                  <Link
                     onClick={() => screenStore.switchBetweenLoginAndRegister()}
                     sx={{ mt: 'auto', mr: 'auto' }}
                  >
                     {t(screenStore.loginOrRegisterOppositeName)}
                  </Link>
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
