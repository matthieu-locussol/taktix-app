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
import { MAX_CHARACTERS_PER_ACCOUNT } from 'shared/src/config';
import { LevelMgt } from 'shared/src/utils/levelMgt';
import { useStore } from '../../store';
import { useTranslation } from '../../types/react-i18next';
import { CharacterSpriteStatic } from '../hud/components/CharacterSpriteStatic';

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
               {characterSelectionStore.errorMessage && (
                  <Typography variant="body1" align="center" color="error" sx={{ mb: 2 }}>
                     {t(
                        characterSelectionStore.errorMessage,
                        characterSelectionStore.errorMessageOptions,
                     )}
                  </Typography>
               )}
               {characterSelectionStore.successMessage && (
                  <Typography
                     variant="body1"
                     align="center"
                     sx={(theme) => ({ color: theme.palette.success.main, mb: 2 })}
                  >
                     {t(characterSelectionStore.successMessage)}
                  </Typography>
               )}
               <Box display="grid" gap={2}>
                  {characterSelectionStore.characters.map((character) => (
                     <Box key={character.name} display="flex">
                        <Card
                           variant="clickable"
                           onClick={() =>
                              characterSelectionStore.setSelectedCharacter(character.name)
                           }
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
                        >
                           <CharacterSpriteStatic
                              sprite={character.spritesheet}
                              scale={2}
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
                           <Typography variant="body1" sx={{ ml: 'auto' }}>
                              {t('level', { level: LevelMgt.getLevel(character.experience) })}
                           </Typography>
                        </Card>
                        <IconButton
                           onClick={() =>
                              characterSelectionStore.openDeleteCharacterDialog(character.name)
                           }
                           color="error"
                           sx={{ mx: 1, my: 'auto' }}
                        >
                           <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                     </Box>
                  ))}
                  {characterSelectionStore.characters.length === 0 && (
                     <Card variant="outlined">
                        <Typography variant="body1" align="center" sx={{ py: 2 }}>
                           {t('noCharacters')}
                        </Typography>
                     </Card>
                  )}
                  {characterSelectionStore.characters.length < MAX_CHARACTERS_PER_ACCOUNT && (
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
                        <Typography>{t('createNewCharacter')}</Typography>
                        <AddIcon fontSize="small" />
                     </Card>
                  )}
               </Box>
               {characterSelectionStore.characters.length !== 0 && (
                  <Button
                     disabled={!characterSelectionStore.canSubmit}
                     type="submit"
                     variant="contained"
                     color="primary"
                     sx={{ mt: 2 }}
                  >
                     {characterSelectionStore.loading ? (
                        <CircularProgress size={24} color="inherit" />
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
                  <Typography color="error" gutterBottom>
                     <Trans
                        i18nKey="deleteCharacter_content"
                        values={{ name: characterSelectionStore.characterToDelete }}
                        components={{ b: <b /> }}
                     />
                  </Typography>
                  <Typography>{t('deleteCharacter_confirm')}</Typography>
                  <TextField
                     fullWidth
                     type="password"
                     placeholder={t('password')}
                     value={characterSelectionStore.password}
                     onChange={(e) => characterSelectionStore.setPassword(e.target.value)}
                     sx={{ mt: 2 }}
                  />
               </DialogContent>
               <DialogActions sx={{ width: '100%', justifyContent: 'center', pb: 2 }}>
                  <Button
                     disabled={!characterSelectionStore.canDeleteCharacter}
                     variant="contained"
                     onClick={() => deleteCharacter()}
                  >
                     {characterSelectionStore.loadingDeleteCharacter ? (
                        <CircularProgress size={24} color="inherit" />
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
