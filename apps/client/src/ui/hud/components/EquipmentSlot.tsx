import { ItemSlot } from './ItemSlot';

interface EquipmentSlotProps {
   size: 'small' | 'medium' | 'large';
   canBeHovered?: boolean;
}

export const EquipmentSlot = ({ size, canBeHovered = false }: EquipmentSlotProps) => {
   const { width, height } = {
      small: { width: 'min(3vw, 4.5vh)', height: 'min(3vw, 4.5vh)' },
      medium: { width: 'min(6vw, 9vh)', height: 'min(6vw, 9vh)' },
      large: { width: 'min(6vw, 9vh)', height: 'min(12vw, 18vh)' },
   }[size];

   return <ItemSlot width={width} height={height} canBeHovered={canBeHovered} />;
};
