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
import { useStore } from '../../store';

export const Updater = observer(() => {
   const { loginStore, updaterStore } = useStore();

   return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
      </Box>
   );
});
