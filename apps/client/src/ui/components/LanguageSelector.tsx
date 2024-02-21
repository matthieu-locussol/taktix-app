import MenuItem from '@mui/material/MenuItem';
import Select, { SelectProps } from '@mui/material/Select';
import { observer } from 'mobx-react-lite';
import { LANGUAGES_NAMES } from 'shared/src/data/translations';
import { Language } from 'shared/src/types/Language';
import { useStore } from '../../store';

export const LanguageSelector = observer((props: SelectProps<Language>) => {
   const { settingsMenuStore } = useStore();

   return (
      <Select<Language>
         size="small"
         MenuProps={{
            slotProps: {
               paper: {
                  elevation: 0,
                  variant: 'outlined',
               },
            },
         }}
         sx={{ ml: 2 }}
         {...props}
         value={settingsMenuStore.language}
      >
         {Object.entries(LANGUAGES_NAMES).map(([value, label]) => (
            <MenuItem key={value} value={value}>
               {label}
            </MenuItem>
         ))}
      </Select>
   );
});
