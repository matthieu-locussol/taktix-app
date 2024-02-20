import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { observer } from 'mobx-react-lite';
import { professions } from 'shared/src/types/Profession';
import { StringMgt } from 'shared/src/utils/stringMgt';
import { useStore } from '../../../store';

export const CharacterSelector = observer(() => {
   const { characterCreationStore } = useStore();

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
                  {StringMgt.toUpperCaseFirst(profession)}
               </ToggleButton>
            ))}
         </ToggleButtonGroup>
      </Box>
   );
});
