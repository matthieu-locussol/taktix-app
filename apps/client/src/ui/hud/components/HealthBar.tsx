import {
   LinearProgress,
   TooltipProps,
   Typography,
   linearProgressClasses,
   styled,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import { useStore } from '../../../store';
import { StatisticIcon } from '../../components/StatisticIcon';
import { Tooltip } from './Tooltip';

interface HealthBarProps {
   placement?: TooltipProps['placement'];
}

export const HealthBar = observer<HealthBarProps, HTMLDivElement>(
   forwardRef(({ placement = 'top-end', ...rest }, ref) => {
      const { characterStore } = useStore();

      return (
         <Tooltip
            disableInteractive
            title={
               <Typography display="flex" alignItems="center">
                  {characterStore.currentHealth} / {characterStore.maxHealth}
                  <StatisticIcon id="vitality_+f" fontSize="small" sx={{ mx: 0.5 }} /> (
                  {characterStore.healthPercentage.toFixed(1)}%)
               </Typography>
            }
            placement={placement}
         >
            <StyledProgressBar
               {...rest}
               ref={ref}
               variant="determinate"
               value={characterStore.healthPercentage}
            />
         </Tooltip>
      );
   }),
);

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
   width: '100%',
   height: '0.5vw',
   borderRadius: 8,
   border: `1px solid ${theme.palette.paper.border}`,
   transition: 'all 0.3s',
   ':hover': {
      opacity: 0.7,
   },
}));

const StyledProgressBar = styled(ProgressBar)(({ theme }) => ({
   height: '0.5vw',
   backgroundColor: theme.palette.health.background,
   border: `1px solid ${theme.palette.paper.border}`,
   marginTop: '0.5vh',
   [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: theme.palette.health.color,
      borderRadius: 8,
   },
}));
