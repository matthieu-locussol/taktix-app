import { Box, Divider, TooltipProps, Typography, darken } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { Affix, Item } from 'shared/src/types/Item';
import { zStatistic } from 'shared/src/types/Statistic';
import { WeaponDamages } from 'shared/src/types/Weapon';
import { ItemMgt } from 'shared/src/utils/itemMgt';
import { useStore } from '../../../store';
import {
   ITEM_RARITY_COLORS,
   RAW_STATISTIC_TO_REAL_STATISTIC_COLORS,
} from '../../../styles/appTheme';
import { useTranslation } from '../../../types/react-i18next';
import { StatisticIcon } from '../../components/StatisticIcon';
import { Tooltip } from './Tooltip';

interface ItemTooltipProps extends Omit<TooltipProps, 'title'> {
   item: Item;
   equippedItem?: Item | null;
}

export const ItemTooltip = observer(({ item, equippedItem, ...rest }: ItemTooltipProps) => {
   const { t } = useTranslation();
   const { characterStore } = useStore();
   const itemRarity = useMemo(() => ItemMgt.getRarity(item), [item]);
   const itemRarityColor = useMemo(() => ITEM_RARITY_COLORS[itemRarity], [itemRarity]);

   const tStatistics = (item: Item, { tier, statistics }: Affix, type: 'P' | 'S' | 'T') => {
      return Object.entries(statistics)
         .map<React.ReactNode>(([statisticStr, value], idx) => {
            const statistic = zStatistic.parse(statisticStr);
            return (
               <Box
                  key={`${statistic}-${tier}-${type}-${item.id}-${idx}`}
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     px: 'min(1vw, 2vh)',
                     pb: 'min(0.5vw, 1vh)',
                  }}
               >
                  <StatisticIcon
                     id={statistic}
                     sx={{
                        fontSize: 'min(1.5vw, 2.5vh)',
                        marginRight: 'min(0.75vw, 1.5vh)',
                     }}
                  />
                  <Typography
                     variant="body2"
                     sx={(theme) => ({
                        color: theme.palette.statisticsColors[
                           RAW_STATISTIC_TO_REAL_STATISTIC_COLORS[statistic]
                        ],
                     })}
                  >
                     {`${t(`${statistic}_value`, { value })}`}
                  </Typography>
                  <Typography
                     variant="body2"
                     fontStyle="italic"
                     fontWeight="bold"
                     color="gray"
                     sx={{ ml: 'auto', pl: 'min(0.5vw, 1vh)' }}
                  >
                     {type}
                     {tier}
                  </Typography>
               </Box>
            );
         })
         .reduce((prev, curr) => [prev, ', ', curr]);
   };

   const tDamages = (item: Item, { min, max, type }: WeaponDamages) => {
      return (
         <Box
            key={`${item.id}-${type}-${min}-${max}`}
            sx={{
               display: 'flex',
               alignItems: 'center',
               px: 'min(1vw, 2vh)',
               pb: 'min(0.5vw, 1vh)',
            }}
         >
            <Typography
               variant="overline"
               fontWeight="bold"
               lineHeight={1.5}
               sx={(theme) => ({
                  color: theme.palette.damages[type],
               })}
            >
               {t(`${type}DamagesRange`, { min, max })}
            </Typography>
         </Box>
      );
   };

   interface ItemContentProps {
      itemToRender: Item;
   }

   const ItemContent = ({ itemToRender }: ItemContentProps) => {
      const rarity = useMemo(() => ItemMgt.getRarity(itemToRender), [itemToRender]);
      const rarityColor = useMemo(() => ITEM_RARITY_COLORS[rarity], [rarity]);
      const hasAffixes = useMemo(
         () => itemToRender.prefixes.length > 0 || itemToRender.suffixes.length > 0,
         [itemToRender],
      );
      const name = useMemo(() => ItemMgt.getName(itemToRender), [itemToRender]);
      const hasRequiredLevel = useMemo(
         () => characterStore.level >= itemToRender.requiredLevel,
         [itemToRender, characterStore],
      );

      return (
         <Box
            sx={(theme) => ({
               display: 'flex',
               flexDirection: 'column',
               pb: !hasAffixes ? 'min(0.5vw, 1vh)' : 'min(0.125vw, 0.25vh)',
               fontSize: '0.75rem',
               fontWeight: 500,
               color: 'white',
               border: `1px solid ${rarityColor}`,
               borderRadius: 1,
               background: darken(`${theme.palette.paper.background}F6`, 0.15),
               minWidth: '20vw',
            })}
         >
            <Typography
               variant="body1"
               fontWeight="bold"
               lineHeight={1.2}
               sx={{ px: 'min(1vw, 2vh)', pt: 'min(0.5vw, 1vh)' }}
               gutterBottom
            >
               {name}
            </Typography>
            <Box sx={{ display: 'flex', width: '100%', px: 'min(1vw, 2vh)' }}>
               <Typography variant="caption" color="lightgrey">
                  {t(itemToRender.type)}
               </Typography>
               <Typography
                  variant="caption"
                  fontWeight="bold"
                  color={ITEM_RARITY_COLORS[rarity]}
                  sx={{
                     ml: 'auto',
                     px: 'min(1vw, 2vh)',
                     mr: 'min(1vw, 2vh)',
                  }}
               >
                  {t(rarity)}
               </Typography>
            </Box>
            <Box
               sx={{
                  display: 'flex',
                  width: '100%',
                  px: 'min(1vw, 2vh)',
                  pb: hasAffixes ? 'min(0.5vw, 1vh)' : 0,
               }}
            >
               <Typography variant="caption" color={hasRequiredLevel ? 'green' : 'red'}>
                  {t('requiredLevel', { level: itemToRender.requiredLevel })}
               </Typography>
               <Typography
                  variant="caption"
                  sx={{
                     ml: 'auto',
                     px: 'min(1vw, 2vh)',
                     mr: 'min(1vw, 2vh)',
                  }}
               >
                  {t('level', { level: itemToRender.level })}
               </Typography>
            </Box>
            {(itemToRender.damages.length > 0 || itemToRender.baseAffixes.length > 0) && (
               <>
                  <Divider
                     sx={() => ({
                        borderBottom: `1px solid ${rarityColor}`,
                        marginBottom: 'min(0.5vw, 1vh)',
                     })}
                  />
                  {itemToRender.damages.map((damages) => tDamages(itemToRender, damages))}
                  {itemToRender.baseAffixes.map((prefix) => tStatistics(itemToRender, prefix, 'T'))}
               </>
            )}
            {itemToRender.prefixes.length > 0 && (
               <>
                  <Divider
                     sx={() => ({
                        borderBottom: `1px solid ${rarityColor}`,
                        marginBottom: 'min(0.5vw, 1vh)',
                     })}
                  />
                  {itemToRender.prefixes.map((prefix) => tStatistics(itemToRender, prefix, 'P'))}
               </>
            )}
            {itemToRender.suffixes.length > 0 && (
               <>
                  <Divider
                     sx={() => ({
                        borderBottom: `1px solid ${rarityColor}`,
                        marginBottom: 'min(0.5vw, 1vh)',
                     })}
                  />
                  {itemToRender.suffixes.map((suffix) => tStatistics(itemToRender, suffix, 'S'))}
               </>
            )}
         </Box>
      );
   };

   return (
      <Tooltip
         arrow
         componentsProps={{
            tooltip: {
               sx: {
                  p: 0,
                  background: 'transparent',
               },
            },
            arrow: {
               sx: () => ({
                  color: itemRarityColor,
               }),
            },
         }}
         title={
            equippedItem ? (
               <Box display="flex" gap={2} justifyContent="end">
                  <ItemContent itemToRender={equippedItem} />
                  <ItemContent itemToRender={item} />
               </Box>
            ) : (
               <ItemContent itemToRender={item} />
            )
         }
         {...rest}
      />
   );
});
