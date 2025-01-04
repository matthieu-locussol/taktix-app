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
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Trans } from 'react-i18next';
import { MAX_CHARACTERS_PER_ACCOUNT } from 'shared/src/config.ts';
import { LevelMgt } from 'shared/src/utils/levelMgt.ts';

import { useStore } from '../../store/index.tsx';
import { useTranslation } from '../../types/react-i18next.ts';
import { CharacterSpriteStatic } from '../hud/components/CharacterSpriteStatic.tsx';

export const CharacterSelectionScreen = observer(() => {
   const store = useStore();
   const { characterSelectionStore, colyseusStore, screenStore } = store;
   const { t } = useTranslation();

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      characterSelectionStore.setLoading(true);
      colyseusStore.selectCharacter(characterSelectionStore.selectedCharacter);
   };

   const deleteCharacter = async () => {
      characterSelectionStore.setLoadingDeleteCharacter(true);
      colyseusStore.deleteCharacter(
         characterSelectionStore.characterToDelete,
         characterSelectionStore.password,
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
               {characterSelectionStore.errorMessage && (
                  <Typography align="center" color="error" sx={{ mb: 2 }} variant="body1">
                     {t(
                        characterSelectionStore.errorMessage,
                        characterSelectionStore.errorMessageOptions,
                     )}
                  </Typography>
               )}
               {characterSelectionStore.successMessage && (
                  <Typography
                     align="center"
                     sx={(theme) => ({ color: theme.palette.success.main, mb: 2 })}
                     variant="body1"
                  >
                     {t(characterSelectionStore.successMessage)}
                  </Typography>
               )}
               <Box display="grid" gap={2}>
                  {characterSelectionStore.characters.map((character) => (
                     <Box key={character.name} display="flex">
                        <Card
                           sx={(theme) => ({
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              opacity: 0.8,
                              ...(characterSelectionStore.isSelectedCharacter(character.name) && {
                                 border: `1px solid ${theme.palette.primary.light}}`,
                                 opacity: 1,
                              }),
                           })}
                           variant="clickable"
                           onClick={() =>
                              characterSelectionStore.setSelectedCharacter(character.name)
                           }
                        >
                           <CharacterSpriteStatic
                              scale={2}
                              sprite={character.spritesheet}
                              sx={{ mb: 1.5, mr: 1 }}
                           />
                           <Typography
                              fontWeight={
                                 characterSelectionStore.isSelectedCharacter(character.name)
                                    ? 'bold'
                                    : 'normal'
                              }
                              variant="body1"
                           >
                              {character.name}
                           </Typography>
                           <Typography sx={{ ml: 'auto' }} variant="body1">
                              {t('level', { level: LevelMgt.getLevel(character.experience) })}
                           </Typography>
                        </Card>
                        <IconButton
                           color="error"
                           sx={{ mx: 1, my: 'auto' }}
                           onClick={() =>
                              characterSelectionStore.openDeleteCharacterDialog(character.name)
                           }
                        >
                           <DeleteIcon color="error" fontSize="small" />
                        </IconButton>
                     </Box>
                  ))}
                  {characterSelectionStore.characters.length === 0 && (
                     <Card variant="outlined">
                        <Typography align="center" sx={{ py: 2 }} variant="body1">
                           {t('noCharacters')}
                        </Typography>
                     </Card>
                  )}
                  {characterSelectionStore.characters.length < MAX_CHARACTERS_PER_ACCOUNT && (
                     <Card
                        sx={{
                           display: 'flex',
                           borderStyle: 'dashed',
                           alignItems: 'center',
                           justifyContent: 'space-between',
                        }}
                        variant="clickable"
                        onClick={() => screenStore.setScreen('characterCreation')}
                     >
                        <Typography>{t('createNewCharacter')}</Typography>
                        <AddIcon fontSize="small" />
                     </Card>
                  )}
               </Box>
               {characterSelectionStore.characters.length !== 0 && (
                  <Button
                     color="primary"
                     disabled={!characterSelectionStore.canSubmit}
                     sx={{ mt: 2 }}
                     type="submit"
                     variant="contained"
                  >
                     {characterSelectionStore.loading ? (
                        <CircularProgress color="inherit" size={24} />
                     ) : (
                        t('play')
                     )}
                  </Button>
               )}
            </CardContent>
            <Dialog
               fullWidth
               maxWidth="sm"
               open={characterSelectionStore.openDeleteDialog}
               onClose={() => characterSelectionStore.closeDeleteCharacterDialog()}
            >
               <DialogTitle>{t('deleteCharacter_title')}</DialogTitle>
               <DialogContent>
                  <Typography gutterBottom color="error">
                     <Trans
                        components={{ b: <b /> }}
                        i18nKey="deleteCharacter_content"
                        values={{ name: characterSelectionStore.characterToDelete }}
                     />
                  </Typography>
                  <Typography>{t('deleteCharacter_confirm')}</Typography>
                  <TextField
                     fullWidth
                     placeholder={t('password')}
                     sx={{ mt: 2 }}
                     type="password"
                     value={characterSelectionStore.password}
                     onChange={(e) => characterSelectionStore.setPassword(e.target.value)}
                  />
               </DialogContent>
               <DialogActions sx={{ width: '100%', justifyContent: 'center', pb: 2 }}>
                  <Button
                     disabled={!characterSelectionStore.canDeleteCharacter}
                     variant="contained"
                     onClick={() => deleteCharacter()}
                  >
                     {characterSelectionStore.loadingDeleteCharacter ? (
                        <CircularProgress color="inherit" size={24} />
                     ) : (
                        t('delete')
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
