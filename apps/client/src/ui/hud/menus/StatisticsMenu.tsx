import ExperienceIcon from '@mui/icons-material/ArrowCircleUpRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityIcon from '@mui/icons-material/VisibilityRounded';
import { darken, linearProgressClasses, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent, { dialogContentClasses } from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import Draggable from 'react-draggable';
import { Trans } from 'react-i18next';
import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';
import { StatisticIcon } from '../../components/StatisticIcon';
import { Statistic } from '../components/Statistic';
import { Tooltip } from '../components/Tooltip';

export const StatisticsMenu = observer(() => {
   const nodeRef = useRef(null);
   const { characterStore, statisticsMenuStore } = useStore();
   const { t } = useTranslation();

   return (
      <Draggable handle=".statistics-menu-handle" nodeRef={nodeRef}>
         <StyledDialog
            ref={nodeRef}
            fullScreen
            hideBackdrop
            disableEnforceFocus
            onClose={() => statisticsMenuStore.close()}
            open={statisticsMenuStore.isOpened}
            PaperProps={{
               sx: (theme) => ({
                  borderRadius: theme.spacing(0.5),
                  transition: 'all 0.3s',
               }),
            }}
         >
            <StyledDialogTitle className="statistics-menu-handle">
               {t('statistics')}
               <Button
                  variant="contained"
                  size="small"
                  onClick={() => statisticsMenuStore.toggleAdvanced()}
               >
                  <Typography
                     fontWeight="bold"
                     variant="overline"
                     lineHeight={1.5}
                     display="flex"
                     alignItems="center"
                  >
                     {t('advanced')}
                     {statisticsMenuStore.showAdvanced ? (
                        <VisibilityOffIcon fontSize="small" sx={{ ml: 1 }} />
                     ) : (
                        <VisibilityIcon fontSize="small" sx={{ ml: 1 }} />
                     )}
                  </Typography>
               </Button>
            </StyledDialogTitle>
            <IconButton
               aria-label="close"
               onClick={() => statisticsMenuStore.close()}
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
               {statisticsMenuStore.statistics
                  .filter(({ advanced }) => !advanced)
                  .map((statistic) => (
                     <Statistic
                        key={statistic.label}
                        icon={<StatisticIcon id={statistic.icon} sx={{ mr: 2 }} />}
                        value={statistic.value}
                        label={statistic.label}
                        onIncrease={statistic.onIncrease}
                        onDecrease={statistic.onDecrease}
                        canIncrease={statistic.canIncrease}
                        canDecrease={statistic.canDecrease}
                        size={statistic.advanced ? 'small' : 'medium'}
                     />
                  ))}
               <Collapse in={statisticsMenuStore.showAdvanced}>
                  <Divider
                     sx={(theme) => ({ border: `1px solid ${theme.palette.paper.border}` })}
                  />
                  {statisticsMenuStore.statistics
                     .filter(({ advanced }) => advanced)
                     .map((statistic) => (
                        <Statistic
                           key={statistic.label}
                           icon={<StatisticIcon id={statistic.icon} sx={{ mr: 2 }} />}
                           value={statistic.value}
                           label={statistic.label}
                           onIncrease={statistic.onIncrease}
                           onDecrease={statistic.onDecrease}
                           canIncrease={statistic.canIncrease}
                           canDecrease={statistic.canDecrease}
                           size={statistic.advanced ? 'small' : 'medium'}
                        />
                     ))}
               </Collapse>
            </StyledDialogContent>
            <DialogActions>
               <Typography align="center" sx={{ mr: 'auto' }}>
                  <Trans
                     i18nKey="statisticPointsAvailable"
                     values={{ count: statisticsMenuStore.statisticsPoints }}
                     components={{ b: <b /> }}
                  />
               </Typography>
               <Button
                  color="chalk"
                  onClick={() => statisticsMenuStore.close()}
                  sx={{ ml: 'auto' }}
               >
                  {t('cancel')}
               </Button>
               <Button
                  disabled={!statisticsMenuStore.canSave}
                  variant="contained"
                  onClick={() => statisticsMenuStore.save()}
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
   left: '35vw',
   right: '35vw',
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
   display: 'flex',
   alignItems: 'center',
   gap: theme.spacing(2),
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
   marginTop: '0.5vh',
   [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: '#8b5cf6',
      borderRadius: 8,
   },
}));

const LifeProgressBar = styled(ProgressBar)(({ theme }) => ({
   height: '0.5vw',
   backgroundColor: '#fca5a5',
   border: `1px solid ${theme.palette.paper.border}`,
   marginTop: '0.5vh',
   [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: '#ef4444',
      borderRadius: 8,
   },
}));
