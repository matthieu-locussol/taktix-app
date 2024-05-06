import { forwardRef, useMemo } from 'react';
import { Item } from 'shared/src/types/Item';
import { ItemMgt } from 'shared/src/utils/ItemMgt';
import { ItemBaseIcon } from '../../components/items/ItemBaseIcon';
import { ItemSlot } from './ItemSlot';
import { ItemTooltip } from './ItemTooltip';

interface EquipmentSlotProps {
   size: 'tiny' | 'small' | 'medium' | 'large';
   item: Item;
   canBeHovered?: boolean;
}

export const EquipmentSlot = forwardRef<unknown, EquipmentSlotProps>(
   ({ size, item, canBeHovered = false }, ref) => {
      const { width, height } = {
         tiny: { width: 'min(2vw, 3vh)', height: 'min(2vw, 3vh)' },
         small: { width: 'min(3vw, 4.5vh)', height: 'min(3vw, 4.5vh)' },
         medium: { width: 'min(6vw, 9vh)', height: 'min(6vw, 9vh)' },
         large: { width: 'min(6vw, 9vh)', height: 'min(12vw, 18vh)' },
      }[size];

      const rarity = useMemo(() => ItemMgt.getRarity(item), [item]);

      return (
         <ItemTooltip item={item} placement="top">
            <ItemSlot ref={ref} width={width} height={height} canBeHovered={canBeHovered}>
               <ItemBaseIcon
                  path={item.type}
                  color={rarity}
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
