import { Box, Divider, TooltipProps, Typography, darken } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { Affix, Item } from 'shared/src/types/Item';
import { zStatistic } from 'shared/src/types/Statistic';
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
}

export const ItemTooltip = observer(({ item, ...rest }: ItemTooltipProps) => {
   const { t } = useTranslation();
   const { characterStore } = useStore();

   const name = useMemo(() => ItemMgt.getName(item), [item]);
   const rarity = useMemo(() => ItemMgt.getRarity(item), [item]);
   const hasRequiredLevel = useMemo(
      () => characterStore.level >= item.level,
      [item, characterStore],
   );
   const hasAffixes = useMemo(() => item.prefixes.length > 0 || item.suffixes.length > 0, [item]);
   const rarityColor = useMemo(() => ITEM_RARITY_COLORS[rarity], [rarity]);

   const tStatistics = ({ name, tier, statistics }: Affix) => {
      return Object.entries(statistics)
         .map<React.ReactNode>(([statisticStr, value]) => {
            const statistic = zStatistic.parse(statisticStr);
            return (
               <Box
                  key={`${name}-${tier}`}
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
               </Box>
            );
         })
         .reduce((prev, curr) => [prev, ', ', curr]);
   };

   return (
      <Tooltip
         arrow
         componentsProps={{
            tooltip: {
               sx: (theme) => ({
                  padding: 0,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'white',
                  border: `1px solid ${rarityColor}`,
                  background: darken(`${theme.palette.paper.background}F6`, 0.15),
                  minWidth: '20vw',
               }),
            },
            arrow: {
               sx: () => ({
                  color: rarityColor,
               }),
            },
         }}
         title={
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  pb: hasAffixes ? 0 : 'min(1vw, 2vh)',
               }}
            >
               <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ px: 'min(1vw, 2vh)', pt: 'min(0.5vw, 1vh)' }}
               >
                  {name}
               </Typography>
               <Box sx={{ display: 'flex', width: '100%', px: 'min(1vw, 2vh)' }}>
                  <Typography variant="caption" color="lightgrey">
                     {t(item.type)}
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
               <Box sx={{ display: 'flex', width: '100%', px: 'min(1vw, 2vh)' }}>
                  <Typography variant="caption" color={hasRequiredLevel ? 'green' : 'red'}>
                     Required level {item.requiredLevel}
                  </Typography>
                  <Typography
                     variant="caption"
                     sx={{
                        ml: 'auto',
                        px: 'min(1vw, 2vh)',
                        mr: 'min(1vw, 2vh)',
                     }}
                  >
                     level {item.level}
                  </Typography>
               </Box>
               {item.prefixes.length > 0 && (
                  <>
                     <Divider
                        sx={() => ({
                           borderBottom: `1px solid ${rarityColor}`,
                           marginTop: 'min(0.5vw, 1vh)',
                           marginBottom: 'min(0.5vw, 1vh)',
                        })}
                     />
                     {item.prefixes.map((prefix) => tStatistics(prefix))}
                  </>
               )}
               {item.suffixes.length > 0 && (
                  <>
                     <Divider
                        sx={() => ({
                           borderBottom: `1px solid ${rarityColor}`,
                           marginTop: 'min(0.5vw, 1vh)',
                           marginBottom: 'min(0.5vw, 1vh)',
                        })}
                     />
                     {item.suffixes.map((suffix) => tStatistics(suffix))}
                  </>
               )}
            </Box>
         }
         {...rest}
      />
   );
});
