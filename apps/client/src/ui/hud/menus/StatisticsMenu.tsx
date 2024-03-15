import ExperienceIcon from '@mui/icons-material/ArrowCircleUpRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
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
import { StatisticIcon } from '../../components/StatisticIcon';
import { Statistic, StatisticProps } from '../components/Statistic';
import { Tooltip } from '../components/Tooltip';

export const StatisticsMenu = observer(() => {
   const { characterStore, statisticsStore } = useStore();
   const { t } = useTranslation();

   const statistics = useMemo(
      (): StatisticProps[] => [
         {
            icon: <StatisticIcon id="vitality_+f" sx={{ mr: 2 }} />,
            value: statisticsStore.vitality,
            label: 'vitality',
            onIncrease: () => statisticsStore.increase('vitality'),
            onDecrease: () => statisticsStore.decrease('vitality'),
            canIncrease: statisticsStore.canIncrease,
            canDecrease: statisticsStore.canDecrease.vitality,
         },
         {
            icon: <StatisticIcon id="magicShield_+f" sx={{ mr: 2 }} />,
            value: statisticsStore.magicShield,
            label: 'magicShield',
            onIncrease: () => statisticsStore.increase('magicShield'),
            onDecrease: () => statisticsStore.decrease('magicShield'),
            canIncrease: statisticsStore.canIncrease,
            canDecrease: statisticsStore.canDecrease.magicShield,
         },
         {
            icon: <StatisticIcon id="strength_+f" sx={{ mr: 2 }} />,
            value: statisticsStore.strength,
            label: 'strength',
            onIncrease: () => statisticsStore.increase('strength'),
            onDecrease: () => statisticsStore.decrease('strength'),
            canIncrease: statisticsStore.canIncrease,
            canDecrease: statisticsStore.canDecrease.strength,
         },
         {
            icon: <StatisticIcon id="dexterity_+f" sx={{ mr: 2 }} />,
            value: statisticsStore.dexterity,
            label: 'dexterity',
            onIncrease: () => statisticsStore.increase('dexterity'),
            onDecrease: () => statisticsStore.decrease('dexterity'),
            canIncrease: statisticsStore.canIncrease,
            canDecrease: statisticsStore.canDecrease.dexterity,
         },
         {
            icon: <StatisticIcon id="intelligence_+f" sx={{ mr: 2 }} />,
            value: statisticsStore.intelligence,
            label: 'intelligence',
            onIncrease: () => statisticsStore.increase('intelligence'),
            onDecrease: () => statisticsStore.decrease('intelligence'),
            canIncrease: statisticsStore.canIncrease,
            canDecrease: statisticsStore.canDecrease.intelligence,
         },
         {
            icon: <StatisticIcon id="luck_+f" sx={{ mr: 2 }} />,
            value: statisticsStore.luck,
            label: 'luck',
            onIncrease: () => statisticsStore.increase('luck'),
            onDecrease: () => statisticsStore.decrease('luck'),
            canIncrease: statisticsStore.canIncrease,
            canDecrease: statisticsStore.canDecrease.luck,
         },
      ],
      [
         statisticsStore.vitality,
         statisticsStore.magicShield,
         statisticsStore.strength,
         statisticsStore.dexterity,
         statisticsStore.intelligence,
         statisticsStore.luck,
      ],
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
                              35 / 110{' '}
                              <StatisticIcon id="vitality_+f" fontSize="small" sx={{ mx: 0.5 }} />{' '}
                              (31%)
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
                     onDecrease={statistic.onDecrease}
                     canIncrease={statistic.canIncrease}
                     canDecrease={statistic.canDecrease}
                  />
               ))}
            </StyledDialogContent>
            <DialogActions>
               <Typography align="center" sx={{ mr: 'auto' }}>
                  <Trans
                     i18nKey="statisticPointsAvailable"
                     values={{ count: statisticsStore.statisticsPoints }}
                     components={{ b: <b /> }}
                  />
               </Typography>
               <Button color="chalk" onClick={() => statisticsStore.close()} sx={{ ml: 'auto' }}>
                  {t('cancel')}
               </Button>
               <Button
                  disabled={!statisticsStore.canSave}
                  variant="contained"
                  onClick={() => statisticsStore.save()}
               >
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
   height: '0.5vw',
   backgroundColor: '#c4b5fd',
   border: `1px solid ${theme.palette.paper.border}`,
   marginTop: '0.25vh',
   [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: '#8b5cf6',
      borderRadius: 8,
   },
}));

const LifeProgressBar = styled(ProgressBar)(({ theme }) => ({
   height: '0.5vw',
   backgroundColor: '#fca5a5',
   border: `1px solid ${theme.palette.paper.border}`,
   marginTop: '0.25vh',
   [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: '#ef4444',
      borderRadius: 8,
   },
}));
