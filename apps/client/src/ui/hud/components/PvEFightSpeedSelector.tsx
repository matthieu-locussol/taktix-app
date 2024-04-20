import SpeedFactorIcon from '@mui/icons-material/FastForwardRounded';
import Speed4Icon from '@mui/icons-material/Looks4Rounded';
import Speed1Icon from '@mui/icons-material/LooksOneRounded';
import Speed2Icon from '@mui/icons-material/LooksTwoRounded';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useStore } from '../../../store';

export const PvEFightSpeedSelector = observer(() => {
   const { settingsMenuStore } = useStore();

   const handleSpeedChange = (_event: React.MouseEvent<HTMLElement>, newSpeed: number) => {
      settingsMenuStore.setSpeedFactor(newSpeed);
      settingsMenuStore.saveChanges();
   };

   return (
      <div>
         <Paper
            elevation={0}
            sx={{
               display: 'flex',
               border: (theme) => `1px solid ${theme.palette.paper.border}`,
               background: (theme) => theme.palette.paper.background,
               flexWrap: 'wrap',
            }}
         >
            <StyledToggleButtonGroup
               size="small"
               value={settingsMenuStore.speedFactor}
               exclusive
               onChange={handleSpeedChange}
            >
               <ToggleButton value={0} disabled>
                  <SpeedFactorIcon color="primary" />
               </ToggleButton>
               <ToggleButton value={1}>
                  <Speed1Icon />
               </ToggleButton>
               <ToggleButton value={1.5}>
                  <Speed2Icon />
               </ToggleButton>
               <ToggleButton value={2}>
                  <Speed4Icon />
               </ToggleButton>
            </StyledToggleButtonGroup>
         </Paper>
      </div>
   );
});

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
   [`& .${toggleButtonGroupClasses.grouped}`]: {
      margin: theme.spacing(0.5),
      border: 0,
      borderRadius: theme.shape.borderRadius,
      [`&.${toggleButtonGroupClasses.disabled}`]: {
         border: 0,
      },
   },
   [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]: {
      marginLeft: -1,
      borderLeft: '1px solid transparent',
   },
}));
