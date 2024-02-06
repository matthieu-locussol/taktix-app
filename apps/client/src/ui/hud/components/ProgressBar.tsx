import { LinearProgressProps, styled } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

interface ProgressBarProps extends LinearProgressProps {
   label: string;
}

export const ProgressBar = ({ label, ...rest }: ProgressBarProps) => (
   <Box display="flex" justifyContent="center" alignItems="center">
      <Box width="100%">
         <StyledLinearProgress variant="determinate" {...rest} />
      </Box>
      <StyledTypography variant="body2" color="textSecondary">
         {label}
      </StyledTypography>
   </Box>
);

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
   height: 36,
   borderRadius: theme.spacing(0.5),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
   position: 'absolute',
   marginTop: theme.spacing(2),
   color: theme.palette.text.primary,
   textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
}));
