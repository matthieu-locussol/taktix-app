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
      colyseusStore.createCharacter(
         characterCreationStore.name,
         characterCreationStore.profession,
         characterCreationStore.spritesheet,
      );
   };

   return (
      <Box
         noValidate
         component="form"
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
         onSubmit={onSubmit}
      >
         <Card sx={{ display: 'flex' }} variant="outlined">
            <CardContent>
               <Typography gutterBottom align="center" sx={{ mb: 2 }} variant="h1">
                  {t(screenStore.screen)}
               </Typography>
               {characterCreationStore.errorMessage && (
                  <Typography align="center" color="error" sx={{ mb: 2 }} variant="body1">
                     {t(
                        characterCreationStore.errorMessage,
                        characterCreationStore.errorMessageOptions,
                     )}
                  </Typography>
               )}
               <Box display="grid" gap={2}>
                  <CharacterSelector />
                  <TextField
                     placeholder={t('characterName')}
                     type="text"
                     value={characterCreationStore.name}
                     onChange={(e) => characterCreationStore.setName(e.target.value)}
                  />
               </Box>
               <Button
                  color="primary"
                  disabled={!characterCreationStore.canSubmit}
                  sx={{ mt: 2 }}
                  type="submit"
                  variant="contained"
               >
                  {characterCreationStore.loading ? (
                     <CircularProgress color="inherit" size={24} />
                  ) : (
                     t('create')
                  )}
               </Button>
               <Link
                  sx={{ mt: 2, mr: 'auto' }}
                  onClick={() => screenStore.setScreen('characterSelection')}
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
