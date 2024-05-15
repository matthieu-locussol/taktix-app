import RandomIcon from '@mui/icons-material/CasinoRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import {
   Box,
   Button,
   CircularProgress,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   IconButton,
   Slider,
   Typography,
   dialogContentClasses,
   sliderClasses,
   styled,
   useTheme,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { Wheel } from 'react-custom-roulette';
import Draggable from 'react-draggable';
import { Trans } from 'react-i18next';
import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';
import { EquipmentSlot } from '../components/EquipmentSlot';

export const GatchaMenu = observer(() => {
   const theme = useTheme();
   const nodeRef = useRef(null);
   const { characterStore, gatchaMenuStore } = useStore();
   const { t } = useTranslation();

   return (
      <Draggable handle=".gatcha-menu-handle" nodeRef={nodeRef}>
         <StyledDialog
            ref={nodeRef}
            onClose={() => gatchaMenuStore.close()}
            open={gatchaMenuStore.isOpened}
            fullScreen
            PaperProps={{
               sx: (theme) => ({
                  borderRadius: theme.spacing(0.5),
                  transition: 'all 0.3s',
               }),
            }}
         >
            <StyledDialogTitle className="gatcha-menu-handle">Gatcha gatcha</StyledDialogTitle>
            <IconButton
               aria-label="close"
               onClick={() => gatchaMenuStore.close()}
               sx={{
                  position: 'absolute',
                  right: 8,
                  top: 12,
                  color: (theme) => theme.palette.text.primary,
               }}
            >
               <CloseIcon />
            </IconButton>
            <StyledDialogContent
               dividers
               sx={{
                  width: '100%',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
               }}
            >
               <Box
                  sx={{
                     width: '20vw',
                     height: '20vw',
                     '> div': {
                        width: '100%',
                        height: '100%',
                        maxWidth: 'unset',
                        maxHeight: 'unset',
                     },
                  }}
               >
                  <Wheel
                     mustStartSpinning={gatchaMenuStore.spin}
                     onStopSpinning={() => gatchaMenuStore.stopSpin()}
                     prizeNumber={gatchaMenuStore.gainedRarity}
                     data={gatchaMenuStore.wheelData}
                     innerBorderWidth={1}
                     radiusLineWidth={2}
                     radiusLineColor={theme.palette.paper.border}
                     outerBorderWidth={2}
                     outerBorderColor={theme.palette.paper.border}
                     pointerProps={{
                        src: 'data:image/png;base64,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',
                     }}
                  />
               </Box>
               <Box
                  sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     gap: 2,
                  }}
               >
                  <Box
                     sx={{
                        minWidth: '15vw',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                     }}
                  >
                     <Typography
                        variant="h6"
                        align="left"
                        sx={{ display: 'flex', alignItems: 'center', mb: 5 }}
                     >
                        <RandomIcon fontSize="large" sx={{ mr: 1 }} /> {t('lootBonus')}
                     </Typography>
                     <Slider
                        value={gatchaMenuStore.lootBonus}
                        min={50}
                        max={500}
                        valueLabelDisplay="on"
                        valueLabelFormat={(value) => `${value}%`}
                        shiftStep={50}
                        marks={[
                           {
                              label: `${gatchaMenuStore.MIN_LOOT_BONUS}%`,
                              value: gatchaMenuStore.MIN_LOOT_BONUS,
                           },
                           {
                              label: `${gatchaMenuStore.MAX_LOOT_BONUS}%`,
                              value: gatchaMenuStore.MAX_LOOT_BONUS,
                           },
                        ]}
                        sx={{
                           width: '100%',
                           color: (theme) => theme.palette.link.hover,
                           [`.${sliderClasses.mark}`]: {
                              background: 'transparent',
                           },
                           [`.${sliderClasses.valueLabelOpen}`]: {
                              background: (theme) => theme.palette.primary.main,
                           },
                        }}
                     />
                  </Box>
                  <Box
                     sx={{
                        minWidth: '15vw',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 4,
                     }}
                  >
                     <EquipmentSlot item={gatchaMenuStore.item} canBeHovered size="medium" />
                  </Box>
               </Box>
            </StyledDialogContent>
            <DialogActions>
               <Typography align="center" sx={{ ml: 1, mr: 'auto' }}>
                  <Trans
                     i18nKey="gachixValue"
                     components={{ b: <b /> }}
                     values={{ value: characterStore.gachix }}
                  />
               </Typography>
               <Button variant="text" color="chalk" onClick={() => gatchaMenuStore.close()}>
                  {t('close')}
               </Button>
               <Button
                  variant="contained"
                  onClick={() => gatchaMenuStore.start()}
                  disabled={!gatchaMenuStore.canSpin}
               >
                  {gatchaMenuStore.loading ? (
                     <CircularProgress color="inherit" size={24} />
                  ) : (
                     t('spin')
                  )}
               </Button>
            </DialogActions>
         </StyledDialog>
      </Draggable>
   );
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
   position: 'absolute',
   top: '15vh',
   left: '20vw',
   right: '20vw',
   bottom: 'calc(15vh + 15vh)',
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
      padding: '0px !important',
   },
}));
