import LeftIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import RightIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { observer } from 'mobx-react-lite';
import { professions } from 'shared/src/types/Profession';

import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';
import { RoundButton } from '../../components/RoundButton';

import { CharacterSpriteRenderer } from './CharacterSpriteRenderer';

export const CharacterSelector = observer(() => {
   const { characterCreationStore } = useStore();
   const { t } = useTranslation();

   return (
      <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center">
         <Box alignItems="center" display="flex" justifyContent="space-evenly" width="100%">
            <RoundButton
               sx={{ mt: 2 }}
               onClick={() => characterCreationStore.setPreviousSpritesheet()}
            >
               <LeftIcon />
            </RoundButton>
            <Box alignItems="center" display="flex" flexDirection="column">
               <CharacterSpriteRenderer scale={3} sprite={characterCreationStore.spritesheet} />
               <Typography fontFamily="Orbitron" sx={{ mt: 2 }}>
                  Skin {characterCreationStore.skinNumber}
               </Typography>
            </Box>
            <RoundButton sx={{ mt: 2 }} onClick={() => characterCreationStore.setNextSpritesheet()}>
               <RightIcon />
            </RoundButton>
         </Box>
         <ToggleButtonGroup
            exclusive
            fullWidth
            color="primary"
            sx={{ mt: 4 }}
            value={characterCreationStore.profession}
            onChange={(_e, value) => {
               if (value !== null) {
                  characterCreationStore.setProfession(value);
               }
            }}
         >
            {professions.map((profession) => (
               <ToggleButton key={profession} value={profession}>
                  {t(profession)}
               </ToggleButton>
            ))}
         </ToggleButtonGroup>
      </Box>
   );
});
