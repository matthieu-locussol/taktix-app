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
import { relaunch } from '@tauri-apps/api/process';
import { UpdateManifest, checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { version } from '../../package.json';
import { INTERNAL_PLAYER_NAME } from '../game/Scene';
import { useStore } from '../store';
import { isTauri } from '../utils/tauri';
import { Chatbox } from './Chatbox';
import { LoadingScreen } from './LoadingScreen';

export const Game = observer(() => {
   const [input, setInput] = useState('');
   const [updating, setUpdating] = useState(false);
   const [shouldUpdate, setShouldUpdate] = useState<boolean>();
   const [manifest, setManifest] = useState<UpdateManifest>();
   const [open, setOpen] = useState(false);
   const store = useStore();
   const {
      loadingScreenStore: { loadingAssets, sceneVisible },
      characterStore,
   } = store;

   useEffect(() => {
      if (isTauri()) {
         (async () => {
            const updateResult = await checkUpdate();
            setShouldUpdate(updateResult.shouldUpdate);
            setManifest(updateResult.manifest);
         })();
      } else {
         setShouldUpdate(false);
      }
   }, []);

   if (loadingAssets) {
      return <LoadingScreen />;
   }

   const update = async () => {
      try {
         setUpdating(true);
         await installUpdate();
         setUpdating(false);
         setOpen(true);
      } catch (e) {
         // eslint-disable-next-line no-alert
         alert(
            'Sorry, an error occurred while updating Taktix. If it happens again, try reinstalling the game.',
         );
      }
   };

   const restart = () => {
      try {
         relaunch();
         setOpen(false);
      } catch (e) {
         // eslint-disable-next-line no-alert
         alert('Sorry, an error occurred while restarting Taktix. Try restarting it by yourself.');
      }
   };

   if (characterStore.name === '') {
      return (
         <Box
            component="form"
            onSubmit={(e) => {
               e.preventDefault();

               if (input !== INTERNAL_PLAYER_NAME) {
                  characterStore.setName(input);
                  store.initialize(input);
               }
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
            {/* eslint-disable-next-line no-nested-ternary */}
            {shouldUpdate === undefined ? (
               <LinearProgress sx={{ width: '250px', mb: 4, height: 8, mt: 1 }} />
            ) : shouldUpdate ? (
               <Typography color="orangered" fontWeight="bold" sx={{ mb: 3 }}>
                  A new update is available: {manifest?.version}
               </Typography>
            ) : (
               <Typography color="green" fontWeight="bold" sx={{ mb: 3 }}>
                  Your version is up to date!
               </Typography>
            )}
            <Box>
               {shouldUpdate === false && (
                  <>
                     <TextField
                        size="small"
                        placeholder="Enter your name"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        sx={{
                           [`.${outlinedInputClasses.root}`]: {
                              backgroundColor: 'white',
                              minWidth: 280,
                           },
                        }}
                     />
                     <Button
                        disabled={input === '' || shouldUpdate}
                        variant="contained"
                        type="submit"
                        sx={{ ml: 2, height: '100%' }}
                     >
                        Play !
                     </Button>
                  </>
               )}
               {shouldUpdate && (
                  <Button
                     disabled={updating}
                     variant="contained"
                     type="submit"
                     onClick={() => update()}
                     sx={{ ml: 2, height: '100%' }}
                  >
                     {updating ? <CircularProgress color="inherit" size={24} /> : 'Update'}
                  </Button>
               )}
            </Box>
            <Dialog open={open}>
               <DialogTitle>Game restart needed</DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     In order to finish the update, the game will need to restart!
                  </DialogContentText>
               </DialogContent>
               <DialogActions sx={{ width: '100%', justifyContent: 'center', pb: 2 }}>
                  <Button variant="contained" onClick={() => restart()} autoFocus>
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
