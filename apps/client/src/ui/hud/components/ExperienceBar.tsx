import { LinearProgress, linearProgressClasses, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import { useStore } from '../../../store';

export const ExperienceBar = observer<{}, HTMLDivElement>(
   forwardRef((props, ref) => {
      const { characterStore } = useStore();
      return (
         <StyledProgressBar
            {...props}
            ref={ref}
            variant="determinate"
            value={characterStore.experiencePercentage}
         />
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
   backgroundColor: theme.palette.experience.background,
   border: `1px solid ${theme.palette.paper.border}`,
   marginTop: '0.5vh',
   [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: theme.palette.experience.color,
      borderRadius: 8,
   },
}));
