import DexterityIcon from '@mui/icons-material/AirRounded';
import ExperienceIcon from '@mui/icons-material/ArrowCircleUpRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import LifeIcon from '@mui/icons-material/FavoriteRounded';
import Intelligence from '@mui/icons-material/LocalFireDepartmentRounded';
import ResetIcon from '@mui/icons-material/RestartAltRounded';
import MagicShieldIcon from '@mui/icons-material/ShieldMoonRounded';
import StrengthIcon from '@mui/icons-material/VolcanoRounded';
import LuckIcon from '@mui/icons-material/WaterDropRounded';
import { darken, linearProgressClasses, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent, { dialogContentClasses } from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import Draggable from 'react-draggable';
import { Trans } from 'react-i18next';
import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';
import { Statistic, StatisticProps } from '../components/Statistic';
import { Tooltip } from '../components/Tooltip';

export const StatisticsMenu = observer(() => {
   const { characterStore, statisticsStore } = useStore();
   const { t } = useTranslation();

   const statistics = useMemo(
      (): StatisticProps[] => [
         {
            icon: <LifeIcon sx={{ mr: 2 }} />,
            value: 144,
            label: 'health',
            onIncrease: () => console.log('increase'),
         },
         {
            icon: <MagicShieldIcon sx={{ mr: 2 }} />,
            value: 1234,
            label: 'magicShield',
            onIncrease: () => console.log('increase'),
         },
         {
            icon: <StrengthIcon sx={{ mr: 2 }} />,
            value: 1234,
            label: 'strength',
            onIncrease: () => console.log('increase'),
         },
         {
            icon: <DexterityIcon sx={{ mr: 2 }} />,
            value: 1234,
            label: 'dexterity',
            onIncrease: () => console.log('increase'),
         },
         {
            icon: <Intelligence sx={{ mr: 2 }} />,
            value: 1234,
            label: 'intelligence',
            onIncrease: () => console.log('increase'),
         },
         {
            icon: <LuckIcon sx={{ mr: 2 }} />,
            value: 1234,
            label: 'luck',
            onIncrease: () => console.log('increase'),
         },
      ],
      [characterStore],
   );

   return (
      <Draggable handle=".statistics-menu-handle">
         <StyledDialog
            fullScreen
            hideBackdrop
            disableEnforceFocus
            onClose={() => statisticsStore.close()}
            open={statisticsStore.isOpened}
            PaperProps={{
               sx: (theme) => ({
                  borderRadius: theme.spacing(0.5),
                  transition: 'all 0.3s',
               }),
            }}
         >
            <StyledDialogTitle className="statistics-menu-handle">
               {t('statistics')}
            </StyledDialogTitle>
            <IconButton
               aria-label="close"
               onClick={() => statisticsStore.close()}
               sx={{
                  position: 'absolute',
                  right: 8,
                  top: 12,
                  color: (theme) => theme.palette.text.primary,
               }}
            >
               <CloseIcon />
            </IconButton>
            <StyledDialogContent dividers>
               <Header>
                  <Image
                     src={`/assets/professions/face/${characterStore.profession}.png`}
                     alt="Character"
                  />
                  <Stack sx={{ width: '60%' }}>
                     <Typography
                        align="right"
                        color="text.primary"
                        variant="body2"
                        fontSize="1vw"
                        lineHeight="2.5vh"
                        fontWeight="bold"
                     >
                        {characterStore.name}
                     </Typography>
                     <Typography
                        align="right"
                        color="text.secondary"
                        variant="body2"
                        fontSize="1vw"
                        lineHeight="2.5vh"
                     >
                        {t(characterStore.profession)} -{' '}
                        {t('level', { level: 1 /* characterStore.level */ })}
                     </Typography>
                     <Tooltip
                        title={
                           <Typography display="flex" alignItems="center">
                              35 / 110 <LifeIcon fontSize="small" sx={{ mx: 0.5 }} /> (31%)
                           </Typography>
                        }
                        placement="right"
                     >
                        <LifeProgressBar variant="determinate" value={31} />
                     </Tooltip>
                     <Tooltip
                        title={
                           <Typography display="flex" alignItems="center">
                              984 / 9912 <ExperienceIcon fontSize="small" sx={{ mx: 0.5 }} /> (10%)
                           </Typography>
                        }
                        placement="right"
                     >
                        <ExperienceProgressBar variant="determinate" value={10} />
                     </Tooltip>
                  </Stack>
               </Header>
               {statistics.map((statistic) => (
                  <Statistic
                     key={statistic.label}
                     icon={statistic.icon}
                     value={statistic.value}
                     label={statistic.label}
                     onIncrease={statistic.onIncrease}
                  />
               ))}
               <Typography align="center" sx={{ py: 1 }}>
                  <Trans
                     i18nKey="statisticPointsAvailable"
                     values={{ count: 15 }}
                     components={{ b: <b /> }}
                  />
               </Typography>
            </StyledDialogContent>
            <DialogActions>
               <IconButton color="inherit" sx={{ mr: 'auto' }}>
                  <ResetIcon />
               </IconButton>
               <Button color="chalk" onClick={() => statisticsStore.close()} sx={{ ml: 'auto' }}>
                  {t('cancel')}
               </Button>
               <Button variant="contained" onClick={() => statisticsStore.close()}>
                  {t('apply')}
               </Button>
            </DialogActions>
         </StyledDialog>
      </Draggable>
   );
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
   position: 'absolute',
   top: '10vh',
   left: '20vw',
   right: '55vw',
   bottom: 'calc(15vh + 10vh)',
   [`& .${dialogContentClasses.root}`]: {
      padding: theme.spacing(2),
   },
   '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
   },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
   margin: 0,
   padding: theme.spacing(2),
   cursor: 'grab',
   ':active': {
      cursor: 'grabbing',
   },
}));

const StyledDialogContent = styled(DialogContent)(() => ({
   [`&.${dialogContentClasses.root}`]: {
      padding: 0,
      overflow: 'auto',
   },
}));

const Header = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   borderBottom: `1px solid ${theme.palette.paper.border}`,
   padding: theme.spacing(1),
   backgroundColor: darken(`${theme.palette.paper.background}C6`, 0.15),
}));

const Image = styled('img')(({ theme }) => ({
   padding: 8,
   overflowX: 'hidden',
   overflowY: 'scroll',
   color: 'white',
   wordWrap: 'break-word',
   textShadow: '1px 1px 2px #000000',
   border: `1px solid ${theme.palette.paper.border}`,
   background: darken(`${theme.palette.paper.background}C6`, 0.15),
   borderRadius: 8,
   width: 'min(4vw, 7.5vh)',
   height: 'min(4vw, 7.5vh)',
}));

const ProgressBar = styled(LinearProgress)(() => ({
   width: '100%',
   height: '0.5vw',
   borderRadius: 8,
   border: `1px solid #374151`,
   transition: 'all 0.3s',
   ':hover': {
      opacity: 0.7,
   },
}));

const ExperienceProgressBar = styled(ProgressBar)(({ theme }) => ({
   height: '0.75vw',
   backgroundColor: '#c4b5fd',
   border: `1px solid ${theme.palette.paper.border}`,
   marginTop: '0.25vh',
   [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: '#8b5cf6',
      borderRadius: 8,
   },
}));

const LifeProgressBar = styled(ProgressBar)(({ theme }) => ({
   height: '0.75vw',
   backgroundColor: '#fca5a5',
   border: `1px solid ${theme.palette.paper.border}`,
   marginTop: '0.25vh',
   [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: '#ef4444',
      borderRadius: 8,
   },
}));
