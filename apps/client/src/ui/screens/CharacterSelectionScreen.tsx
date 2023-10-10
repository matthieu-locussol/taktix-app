import AddIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
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
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { MAX_CHARACTERS_PER_ACCOUNT } from 'shared/src/config';
import { useStore } from '../../store';

export const CharacterSelectionScreen = observer(() => {
   const store = useStore();
   const { loginStore, screenStore, socketStore } = store;

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      loginStore.setLoading(true);
      socketStore.send({
         type: 'selectCharacter',
         name: loginStore.selectedCharacter,
      });
   };

   const deleteCharacter = async () => {
      loginStore.setLoading(true);
      socketStore.send({
         type: 'deleteCharacter',
         name: loginStore.selectedCharacter,
         password: loginStore.password,
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
               <Typography variant="h1" align="center" gutterBottom sx={{ mb: 2 }}>
                  Character Selection
               </Typography>
               {loginStore.errorMessage && (
                  <Typography variant="body1" align="center" color="error" sx={{ mb: 2 }}>
                     {loginStore.errorMessage}
                  </Typography>
               )}
               {loginStore.successMessage && (
                  <Typography
                     variant="body1"
                     align="center"
                     sx={(theme) => ({ color: theme.palette.success.main, mb: 2 })}
                  >
                     {loginStore.successMessage}
                  </Typography>
               )}
               <Box display="grid" gap={2}>
                  {loginStore.characters.map(({ name }) => (
                     <Box key={name} display="flex">
                        <Card
                           variant="clickable"
                           onClick={() => loginStore.setSelectedCharacter(name)}
                           sx={(theme) => ({
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              opacity: 0.8,
                              ...(loginStore.selectedCharacter === name && {
                                 border: `1px solid ${theme.palette.primary.light}}`,
                                 opacity: 1,
                              }),
                           })}
                        >
                           <img
                              src="/assets/characters/face.png"
                              alt=""
                              width={32}
                              height={32}
                              style={{
                                 imageRendering: 'pixelated',
                                 marginRight: 12,
                              }}
                           />
                           <Typography
                              fontWeight={loginStore.selectedCharacter === name ? 'bold' : 'normal'}
                              variant="body1"
                           >
                              {name}
                           </Typography>
                           <Typography variant="body1" sx={{ ml: 'auto' }}>
                              Level 1
                           </Typography>
                        </Card>
                        <IconButton
                           onClick={() => loginStore.openDeleteCharacterDialog(name)}
                           color="error"
                           sx={{ mx: 1, my: 'auto' }}
                        >
                           <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                     </Box>
                  ))}
                  {loginStore.characters.length === 0 && (
                     <Card variant="outlined">
                        <Typography variant="body1" align="center" sx={{ py: 2 }}>
                           You don't have any characters yet.
                        </Typography>
                     </Card>
                  )}
                  {loginStore.characters.length < MAX_CHARACTERS_PER_ACCOUNT && (
                     <Card
                        variant="clickable"
                        onClick={() => screenStore.setScreen('characterCreation')}
                        sx={{
                           display: 'flex',
                           borderStyle: 'dashed',
                           alignItems: 'center',
                           justifyContent: 'space-between',
                        }}
                     >
                        <Typography>Create a new character</Typography>
                        <AddIcon fontSize="small" />
                     </Card>
                  )}
               </Box>
               {loginStore.characters.length !== 0 && (
                  <Button
                     disabled={loginStore.selectedCharacter === ''}
                     type="submit"
                     variant="contained"
                     color="primary"
                     sx={{ mt: 2 }}
                  >
                     {loginStore.loading ? <CircularProgress size={24} color="inherit" /> : 'Play'}
                  </Button>
               )}
            </CardContent>
            <Dialog
               fullWidth
               maxWidth="sm"
               open={loginStore.openDeleteDialog}
               onClose={() => loginStore.closeDeleteCharacterDialog()}
            >
               <DialogTitle>Delete character</DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     <Typography color="error" gutterBottom>
                        Are you sure you want to delete <b>{loginStore.selectedCharacter}</b>? This
                        action cannot be undone and you will lose all your progress and items.
                     </Typography>
                     <Typography>Please confirm your password to proceed.</Typography>
                     <TextField
                        fullWidth
                        type="password"
                        placeholder="Password"
                        value={loginStore.password}
                        onChange={(e) => loginStore.setPassword(e.target.value)}
                        sx={{ mt: 2 }}
                     />
                  </DialogContentText>
               </DialogContent>
               <DialogActions sx={{ width: '100%', justifyContent: 'center', pb: 2 }}>
                  <Button
                     disabled={loginStore.password === ''}
                     variant="contained"
                     onClick={() => deleteCharacter()}
                  >
                     {loginStore.loading ? (
                        <CircularProgress size={24} color="inherit" />
                     ) : (
                        'Delete'
                     )}
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
      width: theme.spacing(60),
   }),
);
