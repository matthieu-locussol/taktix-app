import IncreaseIcon from '@mui/icons-material/AddRounded';
import DecreaseIcon from '@mui/icons-material/RemoveRounded';
import { Theme, keyframes, styled } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { TranslationKey } from 'shared/src/data/translations';
import { useTranslation } from '../../../types/react-i18next';

export interface StatisticProps {
   icon: React.ReactNode;
   value: number;
   label: TranslationKey;
   onIncrease: () => void;
   onDecrease: () => void;
   canIncrease: boolean;
   canDecrease: boolean;
}

export const Statistic = observer(
   ({ icon, value, label, onIncrease, onDecrease, canIncrease, canDecrease }: StatisticProps) => {
      const { t } = useTranslation();

      return (
         <Root>
            {icon}
            <Typography>{t(label)}</Typography>
            <Typography fontWeight="bold" sx={{ ml: 'auto', mr: 2 }}>
               {value}
            </Typography>
            <StyledPlusIconButton
               size="small"
               color="inherit"
               disabled={!canIncrease}
               onClick={() => onIncrease()}
               sx={{ mr: 1 }}
            >
               <IncreaseIcon />
            </StyledPlusIconButton>
            <StyledMinusIconButton
               size="small"
               color="inherit"
               disabled={!canDecrease}
               onClick={() => onDecrease()}
            >
               <DecreaseIcon />
            </StyledMinusIconButton>
         </Root>
      );
   },
);

const Root = styled(Box)(({ theme }) =>
   theme.unstable_sx({
      display: 'flex',
      alignItems: 'center',
      py: 1,
      px: 2,
      borderBottom: `1px solid ${theme.palette.paper.border}`,
   }),
);

const blink = (theme: Theme) => keyframes`
   50% {
      border-color: ${theme.palette.statistics.border.clear};
   }
`;

const StyledPlusIconButton = styled(IconButton)(({ theme }) => ({
   padding: 0,
   border: `1px solid ${theme.palette.statistics.border.normal}`,
   backgroundColor: theme.palette.statistics.background.normal,
   animation: `${blink(theme)} 1s infinite`,
   ':disabled': {
      border: `1px solid ${theme.palette.statistics.border.clear}`,
      color: theme.palette.chalk.light,
      opacity: 0.5,
      animation: 'none',
   },
   ':hover': {
      backgroundColor: theme.palette.statistics.background.hover,
   },
}));

const StyledMinusIconButton = styled(IconButton)(({ theme }) => ({
   padding: 0,
   border: `1px solid ${theme.palette.statistics.border.clear}`,
   backgroundColor: theme.palette.statistics.background.normal,
   ':disabled': {
      border: `1px solid ${theme.palette.statistics.border.clear}`,
      color: theme.palette.chalk.light,
      opacity: 0.5,
   },
   ':hover': {
      backgroundColor: theme.palette.statistics.background.hover,
   },
}));
