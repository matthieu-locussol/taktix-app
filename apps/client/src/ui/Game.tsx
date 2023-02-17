import {
   Box,
   Button,
   CircularProgress,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   LinearProgress,
   TextField,
   Typography,
   outlinedInputClasses,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { version } from '../../package.json';
import { useStore } from '../store';
import { Chatbox } from './Chatbox';
import { LoadingScreen } from './LoadingScreen';

export const Game = observer(() => {
   const store = useStore();
   const {
      loadingScreenStore: { loadingAssets, sceneVisible },
      loginStore,
      characterStore,
      updaterStore,
   } = store;

   useEffect(() => {
      updaterStore.checkUpdate();
   }, []);

   if (loadingAssets) {
      return <LoadingScreen />;
   }

   if (characterStore.name === '') {
      return (
         <Box
            component="form"
            onSubmit={(e) => {
               e.preventDefault();
               characterStore.setName(loginStore.input);
               store.initialize(loginStore.input);
            }}
            sx={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               width: '100vw',
               height: '100vh',
            }}
         >
            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2, mr: 2 }}>
               <img
                  src="/android-chrome-192x192.png"
                  alt=""
                  width={48}
                  height={48}
                  style={{ margin: 'auto', marginRight: 16 }}
               />
               <Typography color="white" variant="h3">
                  Taktix
               </Typography>
               <Typography
                  color="white"
                  fontWeight="bold"
                  variant="overline"
                  sx={{ mt: 'auto', ml: 1 }}
               >
                  v{version}
               </Typography>
            </Box>
            {updaterStore.shouldUpdate === undefined && (
               <LinearProgress sx={{ width: '250px', mb: 4, height: 8, mt: 1 }} />
            )}
            {updaterStore.shouldUpdate === true && (
               <Typography color="orangered" fontWeight="bold" sx={{ mb: 3 }}>
                  A new update is available: {updaterStore.updateManifest?.version}
               </Typography>
            )}
            {updaterStore.shouldUpdate === false && (
               <Typography color="green" fontWeight="bold" sx={{ mb: 3 }}>
                  Your version is up to date!
               </Typography>
            )}
            <Typography color="red">{loginStore.errorMessage}</Typography>
            <Box>
               {updaterStore.shouldUpdate === false && (
                  <>
                     <TextField
                        size="small"
                        placeholder="Enter your name"
                        value={loginStore.input}
                        onChange={(e) => loginStore.setInput(e.target.value)}
                        sx={{
                           [`.${outlinedInputClasses.root}`]: {
                              backgroundColor: 'white',
                              minWidth: 280,
                           },
                        }}
                     />
                     <Button
                        disabled={loginStore.input === '' || updaterStore.shouldUpdate}
                        variant="contained"
                        type="submit"
                        sx={{ ml: 2, height: '100%' }}
                     >
                        Play !
                     </Button>
                  </>
               )}
               {updaterStore.shouldUpdate && (
                  <Button
                     disabled={updaterStore.updating}
                     variant="contained"
                     type="submit"
                     onClick={() => updaterStore.update()}
                     sx={{ ml: 2, height: '100%' }}
                  >
                     {updaterStore.updating ? (
                        <CircularProgress color="inherit" size={24} />
                     ) : (
                        'Update'
                     )}
                  </Button>
               )}
            </Box>
            <Dialog open={updaterStore.openUpdateModal}>
               <DialogTitle>Game restart needed</DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     In order to finish the update, the game will need to restart!
                  </DialogContentText>
               </DialogContent>
               <DialogActions sx={{ width: '100%', justifyContent: 'center', pb: 2 }}>
                  <Button variant="contained" onClick={() => updaterStore.restart()} autoFocus>
                     Restart
                  </Button>
               </DialogActions>
            </Dialog>
         </Box>
      );
   }

   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
         }}
      >
         <Chatbox />
         {!sceneVisible ? <CircularProgress /> : <Box id="root-game" />}
      </Box>
   );
});
