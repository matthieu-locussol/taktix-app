import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { observer } from 'mobx-react-lite';
import { professions } from 'shared/src/types/Profession';
import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';

export const CharacterSelector = observer(() => {
   const { characterCreationStore } = useStore();
   const { t } = useTranslation();

   return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
         <img
            src={`/assets/professions/body/${characterCreationStore.profession}.png`}
            alt=""
            height={90}
         />
         <ToggleButtonGroup
            fullWidth
            color="primary"
            value={characterCreationStore.profession}
            exclusive
            onChange={(_e, value) => {
               if (value !== null) {
                  characterCreationStore.setProfession(value);
               }
            }}
            sx={{ mt: 4 }}
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
