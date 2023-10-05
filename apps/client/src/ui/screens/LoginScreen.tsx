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
import { version } from '../../../package.json';
import { useStore } from '../../store';
import { GameBackground } from '../GameBackground';
import { ServerStatus } from '../hud/ServerStatus';

export const LoginScreen = observer(() => {
   const store = useStore();
   const { loginStore, updaterStore } = store;

   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      store.initialize(loginStore.username, loginStore.password);
   };

   return (
      <Box
         component="form"
         onSubmit={onSubmit}
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
         <GameBackground />
         <Card variant="outlined" sx={{ display: 'flex' }}>
            <CardContent>
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
                     v{version}
                  </Typography>
               </Box>
               <Typography variant="body1" color="textSecondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo.
               </Typography>
               <ServerStatus sx={{ mt: 'auto' }} />
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
                  {loginStore.errorMessage && (
                     <Typography variant="body1" align="center" color="error">
                        {loginStore.errorMessage}
                     </Typography>
                  )}
                  <TextField
                     type="username"
                     placeholder="Username"
                     value={loginStore.username}
                     onChange={(e) => loginStore.setUsername(e.target.value)}
                     sx={{ mt: 2 }}
                  />
                  <TextField
                     type="password"
                     placeholder="Password"
                     value={loginStore.password}
                     onChange={(e) => loginStore.setPassword(e.target.value)}
                     sx={{ mt: 2 }}
                  />
                  <Button
                     disabled={!loginStore.canLogin}
                     type="submit"
                     variant="contained"
                     color="primary"
                     sx={{ mt: 2 }}
                  >
                     {loginStore.loading ? (
                        <CircularProgress size={24} color="inherit" />
                     ) : (
                        'Log In'
                     )}
                  </Button>
                  <Link sx={{ mt: 2 }}>Register</Link>
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
