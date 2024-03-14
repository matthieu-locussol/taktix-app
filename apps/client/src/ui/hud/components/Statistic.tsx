import IncreaseIcon from '@mui/icons-material/AddRounded';
import { Theme, darken, keyframes, styled } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { TranslationKey } from 'shared/src/data/translations';
import { useTranslation } from '../../../types/react-i18next';

export interface StatisticProps {
   icon: React.ReactNode;
   value: number;
   label: TranslationKey;
   onIncrease: () => void;
}

export const Statistic = ({ icon, value, label, onIncrease }: StatisticProps) => {
   const { t } = useTranslation();

   return (
      <Root>
         {icon}
         <Typography>{t(label)}</Typography>
         <Typography fontWeight="bold" sx={{ ml: 'auto', mr: 2 }}>
            {value}
         </Typography>
         <StyledIconButton size="small" color="inherit" onClick={onIncrease}>
            <IncreaseIcon />
         </StyledIconButton>
      </Root>
   );
};

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
      border-color: ${theme.palette.text.secondary};
   }
`;

const StyledIconButton = styled(IconButton)(({ theme }) => ({
   padding: 0,
   border: `1px solid ${theme.palette.talents.background.normal}`,
   backgroundColor: darken(`${theme.palette.paper.background}C6`, 0.15),
   animation: `${blink(theme)} 1s infinite`,
   ':disabled': {
      color: theme.palette.chalk.light,
      opacity: 0.5,
      animation: 'none',
   },
}));
