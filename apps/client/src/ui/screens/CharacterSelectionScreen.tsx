import AddIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { MAX_CHARACTERS_PER_ACCOUNT } from 'shared/src/config';
import { useStore } from '../../store';
import { GameBackground } from '../GameBackground';

export const CharacterSelectionScreen = observer(() => {
   const store = useStore();
   const { loginStore, socketStore } = store;

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      loginStore.setLoading(true);
      socketStore.send({
         type: 'selectCharacter',
         name: loginStore.selectedCharacter,
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
         <GameBackground />
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
                     <Card
                        key={name}
                        variant="clickable"
                        onClick={() => loginStore.setSelectedCharacter(name)}
                        sx={(theme) => ({
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
                        onClick={() => loginStore.setMode('characterCreation')}
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
