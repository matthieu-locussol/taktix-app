import CloseIcon from '@mui/icons-material/CloseRounded';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityIcon from '@mui/icons-material/VisibilityRounded';
import { darken, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent, { dialogContentClasses } from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import Draggable from 'react-draggable';
import { Trans } from 'react-i18next';

import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';
import { StatisticIcon } from '../../components/StatisticIcon';
import { ExperienceBar } from '../components/ExperienceBar';
import { HealthBar } from '../components/HealthBar';
import { Statistic } from '../components/Statistic';

export const StatisticsMenu = observer(() => {
   const nodeRef = useRef(null);
   const { characterStore, statisticsMenuStore } = useStore();
   const { t } = useTranslation();

   return (
      <Draggable handle=".statistics-menu-handle" nodeRef={nodeRef}>
         <StyledDialog
            ref={nodeRef}
            disableEnforceFocus
            fullScreen
            hideBackdrop
            PaperProps={{
               sx: (theme) => ({
                  borderRadius: theme.spacing(0.5),
                  transition: 'all 0.3s',
               }),
            }}
            open={statisticsMenuStore.isOpened}
            onClose={() => statisticsMenuStore.close()}
         >
            <StyledDialogTitle className="statistics-menu-handle">
               {t('statistics')}
               <Button
                  size="small"
                  variant="contained"
                  onClick={() => statisticsMenuStore.toggleAdvanced()}
               >
                  <Typography
                     alignItems="center"
                     display="flex"
                     fontWeight="bold"
                     lineHeight={1.5}
                     variant="overline"
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
               sx={{
                  position: 'absolute',
                  right: 8,
                  top: 12,
                  color: (theme) => theme.palette.text.primary,
               }}
               onClick={() => statisticsMenuStore.close()}
            >
               <CloseIcon />
            </IconButton>
            <StyledDialogContent dividers>
               <Header>
                  <Stack sx={{ width: '100%' }}>
                     <Typography
                        align="left"
                        color="text.primary"
                        fontSize="1vw"
                        fontWeight="bold"
                        lineHeight="2.5vh"
                        variant="body2"
                     >
                        {characterStore.name}
                     </Typography>
                     <Typography
                        align="left"
                        color="text.secondary"
                        fontSize="1vw"
                        lineHeight="2.5vh"
                        variant="body2"
                     >
                        {t(characterStore.profession)} -{' '}
                        {t('level', { level: characterStore.level })}
                     </Typography>
                     <HealthBar />
                     <ExperienceBar />
                  </Stack>
               </Header>
               {statisticsMenuStore.statistics
                  .filter(({ advanced }) => !advanced)
                  .map((statistic) => (
                     <Statistic
                        key={statistic.label}
                        canDecrease={statistic.canDecrease}
                        canIncrease={statistic.canIncrease}
                        icon={<StatisticIcon id={statistic.icon} sx={{ mr: 2 }} />}
                        label={statistic.label}
                        size={statistic.advanced ? 'small' : 'medium'}
                        value={statistic.value}
                        onDecrease={statistic.onDecrease}
                        onDecrease10x={statistic.onDecrease10x}
                        onIncrease={statistic.onIncrease}
                        onIncrease10x={statistic.onIncrease10x}
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
                           canDecrease={statistic.canDecrease}
                           canIncrease={statistic.canIncrease}
                           icon={<StatisticIcon id={statistic.icon} sx={{ mr: 2 }} />}
                           label={statistic.label}
                           size={statistic.advanced ? 'small' : 'medium'}
                           value={statistic.value}
                           onDecrease={statistic.onDecrease}
                           onIncrease={statistic.onIncrease}
                        />
                     ))}
               </Collapse>
            </StyledDialogContent>
            <DialogActions>
               <Typography align="center" sx={{ mr: 'auto' }}>
                  <Trans
                     components={{ b: <b /> }}
                     i18nKey="statisticPointsAvailable"
                     values={{ count: statisticsMenuStore.statisticsPoints }}
                  />
               </Typography>
               <Button
                  color="chalk"
                  sx={{ ml: 'auto' }}
                  onClick={() => statisticsMenuStore.close()}
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
