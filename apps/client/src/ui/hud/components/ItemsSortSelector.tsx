import { Radio } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';

export const sortOptions = [
   'typeAsc',
   'typeDesc',
   'rarityAsc',
   'rarityDesc',
   'levelAsc',
   'levelDesc',
   'noSort',
] as const;

export type SortOption = (typeof sortOptions)[number];

interface ItemsSortSelectorProps extends MenuProps {
   handleClose: () => void;
}

export const ItemsSortSelector = observer(({ handleClose, ...rest }: ItemsSortSelectorProps) => {
   const { inventoryMenuStore } = useStore();
   const { t } = useTranslation();

   return (
      <Menu
         id="items-sort-selector"
         slotProps={{
            root: {},
            paper: {
               variant: 'outlined',
               elevation: 0,
            },
         }}
         MenuListProps={{
            'aria-labelledby': 'items-sort-selector',
            dense: true,
            sx: { padding: 0 },
         }}
         onClose={handleClose}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
         }}
         transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
         }}
         {...rest}
      >
         {sortOptions.map((sortOption) => (
            <MenuItem dense disableRipple key={sortOption}>
               <FormControlLabel
                  control={
                     <Radio
                        size="small"
                        value={sortOption}
                        checked={inventoryMenuStore.sortOption === sortOption}
                        onChange={() => {
                           inventoryMenuStore.sortBy(sortOption);
                           handleClose();
                        }}
                        sx={{
                           p: 'min(0.5vw, 0.75vh)',
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
