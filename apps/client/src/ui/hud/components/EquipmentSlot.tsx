import type { BoxProps, Theme } from '@mui/material';
import type { Item } from 'shared/src/types/Item';

import { forwardRef, useMemo } from 'react';
import { ItemMgt } from 'shared/src/utils/itemMgt';

import { ITEM_RARITY_COLORS } from '../../../styles/appTheme';
import { ItemBaseIcon } from '../../components/items/ItemBaseIcon';

import { ItemSlot } from './ItemSlot';
import { ItemTooltip } from './ItemTooltip';

interface EquipmentSlotProps extends BoxProps {
   size: 'tiny' | 'small' | 'medium' | 'large' | 'wide';
   item: Item | null;
   equippedItem?: Item | null;
   canBeHovered?: boolean;
   highlightColor?: (theme: Theme) => string;
}

export const EquipmentSlot = forwardRef<HTMLDivElement, EquipmentSlotProps>(
   ({ size, item, equippedItem, canBeHovered = false, ...rest }, ref) => {
      const { width, height } = {
         tiny: { width: 'min(2vw, 3vh)', height: 'min(2vw, 3vh)' },
         small: { width: 'min(3vw, 4.5vh)', height: 'min(3vw, 4.5vh)' },
         medium: { width: 'min(6vw, 9vh)', height: 'min(6vw, 9vh)' },
         large: { width: 'min(6vw, 9vh)', height: 'min(12vw, 18vh)' },
         wide: { width: 'calc(min(6vw, 9vh) + min(1vw, 1.5vh))', height: 'min(3vw, 4.5vh)' },
      }[size];

      const rarity = useMemo(() => {
         if (item !== null) {
            return ItemMgt.getRarity(item);
         }
      }, [item]);

      if (item === null) {
         return (
            <ItemSlot
               ref={ref}
               canBeHovered={canBeHovered}
               {...rest}
               height={height}
               width={width}
            />
         );
      }

      return (
         <ItemTooltip
            disableInteractive
            enterDelay={300}
            enterNextDelay={300}
            equippedItem={equippedItem}
            item={item}
            placement="top"
         >
            <ItemSlot
               ref={ref}
               canBeHovered={canBeHovered}
               highlightColor={() => ITEM_RARITY_COLORS[rarity!]}
               {...rest}
               height={height}
               width={width}
            >
               <ItemBaseIcon
                  color={rarity}
                  path={item.type}
                  sx={{
                     width: `calc(${width} / 1.5)`,
                     height: `calc(${height} / 1.5)`,
                  }}
               />
            </ItemSlot>
         </ItemTooltip>
      );
   },
);

EquipmentSlot.displayName = 'EquipmentSlot';
