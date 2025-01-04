import type { MenuProps } from '@mui/material/Menu';

import { Radio } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../../store/index.tsx';
import { useTranslation } from '../../../types/react-i18next.ts';
import { sortOptions } from '../../../utils/sort.ts';

interface ItemsSortSelectorProps extends MenuProps {
   handleClose: () => void;
}

export const ItemsSortSelector = observer(({ handleClose, ...rest }: ItemsSortSelectorProps) => {
   const { inventoryMenuStore } = useStore();
   const { t } = useTranslation();

   return (
      <Menu
         MenuListProps={{
            'aria-labelledby': 'items-sort-selector',
            dense: true,
            sx: { padding: 0 },
         }}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
         }}
         id="items-sort-selector"
         slotProps={{
            root: {},
            paper: {
               variant: 'outlined',
               elevation: 0,
            },
         }}
         transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
         }}
         onClose={handleClose}
         {...rest}
      >
         {sortOptions.map((sortOption) => (
            <MenuItem key={sortOption} dense disableRipple>
               <FormControlLabel
                  control={
                     <Radio
                        checked={inventoryMenuStore.sortOption === sortOption}
                        size="small"
                        sx={{
                           p: 'min(0.5vw, 0.75vh)',
                        }}
                        value={sortOption}
                        onChange={() => {
                           inventoryMenuStore.sortBy(sortOption);
                           handleClose();
                        }}
                     />
                  }
                  label={t(sortOption)}
                  slotProps={{
                     typography: {
                        lineHeight: '1vh',
                        fontSize: 'min(1vw, 1.5vh)',
                     },
                  }}
               />
            </MenuItem>
         ))}
      </Menu>
   );
});
