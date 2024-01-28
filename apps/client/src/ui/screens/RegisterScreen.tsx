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
import { getVersion } from '../../utils/version';
import { ServerStatus } from '../components/ServerStatus';
import { NEWS_HEIGHT } from './LoginScreen';

export const RegisterScreen = observer(() => {
   const store = useStore();
   const { loginStore, newsStore, registerStore, screenStore, updaterStore } = store;

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
         loginStore.setSuccessMessage('Account created! You can now login.');
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
               <Typography
                  variant="body1"
                  color="textSecondary"
                  dangerouslySetInnerHTML={{
                     __html: newsStore.changelog,
                  }}
                  sx={{
                     overflowY: 'auto',
                  }}
               />
               <ServerStatus sx={{ mt: 'auto', pt: 4 }} />
            </CardContent>
            <Divider orientation="vertical" sx={{ borderColor: 'rgba(55, 65, 81)' }} />
            {updaterStore.shouldUpdate === undefined && (
               <CardContent>
                  <Typography variant="h1" align="center">
                     Access the universe
                  </Typography>
                  <CircularProgress />
               </CardContent>
            )}
            {updaterStore.shouldUpdate === false && (
               <CardContent>
                  <Typography variant="h1" align="center" gutterBottom>
                     Access the universe
                  </Typography>
                  {registerStore.errorMessage && (
                     <Typography variant="body1" align="center" color="error">
                        {registerStore.errorMessage}
                     </Typography>
                  )}
                  {registerStore.successMessage && (
                     <Typography
                        variant="body1"
                        align="center"
                        sx={(theme) => ({ color: theme.palette.success.main })}
                     >
                        {registerStore.successMessage}
                     </Typography>
                  )}
                  <TextField
                     type="email"
                     placeholder="Email address"
                     autoComplete="email"
                     value={registerStore.email}
                     onChange={(e) => registerStore.setEmail(e.target.value)}
                     sx={{ mt: 2 }}
                  />
                  <TextField
                     type="text"
                     placeholder="Username"
                     autoComplete="username"
                     value={registerStore.username}
                     onChange={(e) => registerStore.setUsername(e.target.value)}
                     sx={{ mt: 2 }}
                  />
                  <TextField
                     type="password"
                     placeholder="Password"
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
                        screenStore.screenName
                     )}
                  </Button>
                  <Link
                     onClick={() => screenStore.switchBetweenLoginAndRegister()}
                     sx={{ mt: 'auto', mr: 'auto' }}
                  >
                     {screenStore.loginOrRegisterOppositeName}
                  </Link>
               </CardContent>
            )}
            {updaterStore.shouldUpdate && (
               <CardContent>
                  <Typography variant="h1" align="center">
                     Access the universe
                  </Typography>
                  <Typography>
                     A new update is available: {updaterStore.updateManifest?.version}
                  </Typography>
                  <Typography>Please update to continue</Typography>
                  <Button
                     disabled={updaterStore.updating}
                     variant="contained"
                     color="primary"
                     onClick={() => updaterStore.update()}
                     sx={{ mt: 2 }}
                  >
                     {updaterStore.updating ? (
                        <CircularProgress color="inherit" size={24} />
                     ) : (
                        'Update'
                     )}
                  </Button>
               </CardContent>
            )}
            <Dialog open={updaterStore.openUpdateModal}>
               <DialogTitle>Game restart needed</DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     In order to finish the update, the game will need to restart!
                  </DialogContentText>
               </DialogContent>
               <DialogActions sx={{ width: '100%', justifyContent: 'center', pb: 2 }}>
                  <Button variant="contained" onClick={() => updaterStore.restart()}>
                     Restart
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
