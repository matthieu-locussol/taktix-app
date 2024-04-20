import { Paper, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';

export const PvEFightTurn = observer(() => {
   const { t } = useTranslation();
   const { pveFightStore } = useStore();

   return (
      <div>
         <Paper
            elevation={0}
            sx={{
               display: 'flex',
               border: (theme) => `1px solid ${theme.palette.paper.border}`,
               background: (theme) => theme.palette.paper.background,
               flexWrap: 'wrap',
               py: 2,
               px: 4,
            }}
         >
            <Typography variant="h6" fontFamily="Orbitron" lineHeight={0.6}>
               {t('turn', { count: pveFightStore.currentTurn })}
            </Typography>
         </Paper>
      </div>
   );
});
