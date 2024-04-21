import { LinearProgress, linearProgressClasses, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store';

export const HealthBar = observer(() => {
   const { characterStore } = useStore();
   return <StyledProgressBar variant="determinate" value={characterStore.healthPercentage} />;
});

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
