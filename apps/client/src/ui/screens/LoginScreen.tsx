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
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { AuthRoomUserData } from 'shared';
import { useStore } from '../../store';
import { getVersion } from '../../utils/version';
import { ServerStatus } from '../components/ServerStatus';
import { Changelog } from '../hud/components/Changelog';

export const NEWS_HEIGHT = 324;

export const LoginScreen = observer(() => {
   const store = useStore();
   const { characterSelectionStore, colyseusStore, loginStore, screenStore, updaterStore } = store;

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
            loginStore.setErrorMessage(`Incorrect credentials for user "${username}"!`);
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
            <CardContent sx={{ height: NEWS_HEIGHT }}>
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'baseline',
                     mb: 4,
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
               <Changelog />
               <ServerStatus sx={{ mt: 'auto', pt: 4 }} />
            </CardContent>
            <Divider orientation="vertical" sx={{ borderColor: 'rgba(55, 65, 81)' }} />
            {updaterStore.shouldUpdate === undefined && (
               <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h1" align="center">
                     Access the universe
                  </Typography>
                  <CircularProgress size={64} sx={{ mt: 8 }} />
               </CardContent>
            )}
            {updaterStore.shouldUpdate === false && (
               <CardContent>
                  <Typography variant="h1" align="center" gutterBottom>
                     Access the universe
                  </Typography>
                  {loginStore.errorMessage && (
                     <Typography variant="body1" align="center" color="error">
                        {loginStore.errorMessage}
                     </Typography>
                  )}
                  {loginStore.successMessage && (
                     <Typography
                        variant="body1"
                        align="center"
                        sx={(theme) => ({ color: theme.palette.success.main })}
                     >
                        {loginStore.successMessage}
                     </Typography>
                  )}
                  <TextField
                     type="text"
                     placeholder="Username"
                     autoComplete="username"
                     value={loginStore.username}
                     onChange={(e) => loginStore.setUsername(e.target.value)}
                     sx={{ mt: 2 }}
                  />
                  <TextField
                     type="password"
                     placeholder="Password"
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
                     label="Memorize credentials"
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
            <Dialog open={loginStore.openMemorizeCredentials}>
               <DialogTitle>Saving credentials</DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     If you memorize your credentials, they will be stored in your browser. It might
                     expose you to a risk of being hacked if someone gets access to your computer.
                     Are you sure you want to continue?
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button color="chalk" onClick={() => loginStore.cancelSaveCredentials()}>
                     Cancel
                  </Button>
                  <Button variant="contained" onClick={() => loginStore.saveCredentials()}>
                     Memorize
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
