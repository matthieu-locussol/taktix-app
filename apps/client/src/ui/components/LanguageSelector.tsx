import type { SelectProps } from '@mui/material/Select';
import type { Language } from 'shared/src/types/Language';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { observer } from 'mobx-react-lite';
import { LANGUAGES_NAMES } from 'shared/src/data/translations';

import { useStore } from '../../store';

export const LanguageSelector = observer((props: SelectProps<Language>) => {
   const { settingsMenuStore } = useStore();

   return (
      <Select<Language>
         MenuProps={{
            slotProps: {
               paper: {
                  elevation: 0,
                  variant: 'outlined',
               },
            },
         }}
         size="small"
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
