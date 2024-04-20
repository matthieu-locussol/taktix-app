import PlayingIcon from '@mui/icons-material/ArrowDropUpRounded';
import { Box, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { TranslationKey } from 'shared/src/data/translations';
import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';
import { Tooltip } from './Tooltip';

export const PvEFightTimeline = observer(() => {
   const { t } = useTranslation();
   const { pveFightStore } = useStore();

   return (
      <Box
         sx={{
            display: 'flex',
            gap: 2,
         }}
      >
         {pveFightStore.fightersOrder.map((fighter) => (
            <Tooltip
               key={`${fighter.id}-${pveFightStore.currentTurn}-${pveFightStore.currentFighter}`}
               title={t(fighter.name as TranslationKey)}
               placement="top"
            >
               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Paper
                     elevation={0}
                     sx={{
                        display: 'flex',
                        boxShadow: (theme) =>
                           `0 0 0 ${fighter.id === pveFightStore.currentFighter ? 4 : 1}px ${
                              theme.palette.fight[fighter.type]
                           }`,
                        background: (theme) => theme.palette.paper.background,
                        opacity:
                           pveFightStore.fightersHealth[fighter.id] <= 0 ? `0.4 !important` : 1,
                        flexWrap: 'wrap',
                        p: 1.5,
                     }}
                  >
                     <img src={fighter.avatar} alt="" width={32} height={32} />
                  </Paper>
                  {fighter.id === pveFightStore.currentFighter && (
                     <PlayingIcon
                        fontSize="large"
                        sx={({ palette }) => ({ color: palette.fight[fighter.type] })}
                     />
                  )}
               </Box>
            </Tooltip>
         ))}
      </Box>
   );
});
