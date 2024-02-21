import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import { useTranslation } from '../../types/react-i18next';
import { CharacterSelector } from '../hud/components/CharacterSelector';

export const CharacterCreationScreen = observer(() => {
   const store = useStore();
   const { characterCreationStore, colyseusStore, screenStore } = store;
   const { t } = useTranslation();

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      characterCreationStore.setLoading(true);
      colyseusStore.createCharacter(characterCreationStore.name, characterCreationStore.profession);
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
                  {t(screenStore.screen)}
               </Typography>
               {characterCreationStore.errorMessage && (
                  <Typography variant="body1" align="center" color="error" sx={{ mb: 2 }}>
                     {t(
                        characterCreationStore.errorMessage,
                        characterCreationStore.errorMessageOptions,
                     )}
                  </Typography>
               )}
               <Box display="grid" gap={2}>
                  <CharacterSelector />
                  <TextField
                     type="text"
                     placeholder={t('characterName')}
                     value={characterCreationStore.name}
                     onChange={(e) => characterCreationStore.setName(e.target.value)}
                  />
               </Box>
               <Button
                  disabled={!characterCreationStore.canSubmit}
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
               >
                  {characterCreationStore.loading ? (
                     <CircularProgress size={24} color="inherit" />
                  ) : (
                     t('create')
                  )}
               </Button>
               <Link
                  onClick={() => screenStore.setScreen('characterSelection')}
                  sx={{ mt: 2, mr: 'auto' }}
               >
                  {t('back')}
               </Link>
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
