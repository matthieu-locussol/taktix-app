import { Box, Divider, TooltipProps, Typography, darken, keyframes } from '@mui/material';
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
                  <Typography
                     variant="body2"
                     fontStyle="italic"
                     fontWeight="bold"
                     color="gray"
                     sx={{ ml: 'auto', pl: 'min(0.5vw, 1vh)' }}
                  >
                     T{tier}
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
               sx: (theme) => {
                  const glowKeyframes = glow();

                  return {
                     padding: 0,
                     fontSize: '0.75rem',
                     fontWeight: 500,
                     color: 'white',
                     border: `1px solid ${rarityColor}`,
                     background: darken(`${theme.palette.paper.background}F6`, 0.15),
                     minWidth: '20vw',
                     ':before': {
                        content: '""',
                        background: theme.palette.itemGradient[rarity],
                        position: 'absolute',
                        top: '-2px',
                        left: '-2px',
                        backgroundSize: '400%',
                        zIndex: -1,
                        filter: 'blur(8px)',
                        width: 'calc(100% + 4px)',
                        height: 'calc(100% + 4px)',
                        animation: `${glowKeyframes} 20s linear infinite`,
                        opacity: 1,
                        transition: 'opacity .3s ease-in-out',
                        borderRadius: '10px',
                     },
                     ':active': {
                        color: theme.palette.paper.background,
                     },
                     ':active:after': {
                        background: 'transparent',
                     },
                     ':after': {
                        zIndex: -1,
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        background: darken(`${theme.palette.paper.background}F6`, 0.15),
                        left: 0,
                        top: 0,
                        borderRadius: '10px',
                     },
                  };
               },
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
                  pb: !hasAffixes ? 'min(0.5vw, 1vh)' : 'min(0.125vw, 0.25vh)',
               }}
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
               <Box
                  sx={{
                     display: 'flex',
                     width: '100%',
                     px: 'min(1vw, 2vh)',
                     pb: hasAffixes ? 'min(0.5vw, 1vh)' : 0,
                  }}
               >
                  <Typography variant="caption" color={hasRequiredLevel ? 'green' : 'red'}>
                     {t('requiredLevel', { level: item.requiredLevel })}
                  </Typography>
                  <Typography
                     variant="caption"
                     sx={{
                        ml: 'auto',
                        px: 'min(1vw, 2vh)',
                        mr: 'min(1vw, 2vh)',
                     }}
                  >
                     {t('level', { level: item.level })}
                  </Typography>
               </Box>
               {item.prefixes.length > 0 && (
                  <>
                     <Divider
                        sx={() => ({
                           borderBottom: `1px solid ${rarityColor}`,
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

const glow = () => keyframes`
   0% {
      background-position: 0 0;
   }
   50% {
      background-position: 400% 0;
   }
   100% {
      background-position: 0 0;
   }
`;
