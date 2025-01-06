import type { TooltipProps } from '@mui/material';

import ExperienceIcon from '@mui/icons-material/ArrowCircleUpRounded';
import { LinearProgress, Typography, linearProgressClasses, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';

import { useStore } from '../../../store';

import { Tooltip } from './Tooltip';

interface ExperienceBarProps {
   placement?: TooltipProps['placement'];
}

const InnerExperienceBar = forwardRef<HTMLDivElement, ExperienceBarProps>(
   ({ placement = 'top-end', ...rest }, ref) => {
      const { characterStore } = useStore();

      return (
         <Tooltip
            disableInteractive
            placement={placement}
            title={
               <Typography alignItems="center" display="flex">
                  {characterStore.experience} / {characterStore.maxExperience}{' '}
                  <ExperienceIcon fontSize="small" sx={{ mx: 0.5 }} /> (
                  {characterStore.experiencePercentage.toFixed(1)}%)
               </Typography>
            }
         >
            <StyledProgressBar
               {...rest}
               ref={ref}
               value={characterStore.experiencePercentage}
               variant="determinate"
            />
         </Tooltip>
      );
   },
);

InnerExperienceBar.displayName = 'InnerExperienceBar';

export const ExperienceBar = observer<ExperienceBarProps, HTMLDivElement>(InnerExperienceBar);

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
   backgroundColor: theme.palette.experience.background,
   border: `1px solid ${theme.palette.paper.border}`,
   marginTop: '0.5vh',
   [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: theme.palette.experience.color,
      borderRadius: 8,
   },
}));
