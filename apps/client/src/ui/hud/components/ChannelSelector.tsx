import { useTheme } from '@mui/material';
import { checkboxClasses } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { observer } from 'mobx-react-lite';
import { channelsNames } from 'shared/src/data/channelsNames';
import { Channel } from 'shared/src/types/Channel';
import { useStore } from '../../../store';

interface ChannelSelectorProps extends MenuProps {
   handleClose: () => void;
}

export const ChannelSelector = observer(({ handleClose, ...rest }: ChannelSelectorProps) => {
   const theme = useTheme();
   const { chatStore } = useStore();

   return (
      <Menu
         id="open-channel-selector"
         slotProps={{
            paper: {
               variant: 'outlined',
            },
         }}
         MenuListProps={{
            'aria-labelledby': 'open-channel-selector',
            dense: true,
         }}
         onClose={handleClose}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
         }}
         transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
         }}
         {...rest}
      >
         <RadioGroup value={chatStore.currentChannel}>
            {Object.keys(channelsNames)
               .map((channelIdStr) => parseInt(channelIdStr, 10) as Channel)
               .filter((channelId) => !chatStore.isSystemChannel(channelId))
               .map((channelId) => (
                  <MenuItem disableRipple key={channelId}>
                     <FormControlLabel
                        control={
                           <Radio
                              size="small"
                              value={channelId}
                              onChange={() => {
                                 chatStore.setCurrentChannel(channelId);
                                 handleClose();
                              }}
                              sx={{
                                 color: theme.palette.channels[channelId],
                                 [`&.${checkboxClasses.checked}`]: {
                                    color: theme.palette.channels[channelId],
                                 },
                              }}
                           />
                        }
                        label={channelsNames[channelId]}
                        slotProps={{
                           typography: {
                              color: theme.palette.channels[channelId],
                              lineHeight: '1vh',
                           },
                        }}
                     />
                  </MenuItem>
               ))}
         </RadioGroup>
      </Menu>
   );
});
