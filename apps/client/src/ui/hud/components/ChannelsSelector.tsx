import { useTheme } from '@mui/material';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { observer } from 'mobx-react-lite';
import { channelsNames } from 'shared/src/data/channelsNames';
import { Channel } from 'shared/src/types/Channel';
import { useStore } from '../../../store';

interface ChannelsSelectorProps extends MenuProps {
   handleClose: () => void;
}

export const ChannelsSelector = observer(({ handleClose, ...rest }: ChannelsSelectorProps) => {
   const theme = useTheme();
   const { chatStore } = useStore();

   return (
      <Menu
         id="open-channels-selector"
         slotProps={{
            paper: {
               variant: 'outlined',
            },
         }}
         MenuListProps={{
            'aria-labelledby': 'open-channels-selector',
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
         {Object.keys(channelsNames)
            .map((channelIdStr) => parseInt(channelIdStr, 10) as Channel)
            .filter((channelId) => !chatStore.isSystemChannel(channelId))
            .map((channelId) => (
               <MenuItem disableRipple key={channelId}>
                  <FormControlLabel
                     control={
                        <Checkbox
                           size="small"
                           checked={chatStore.isChannelDisplayed(channelId)}
                           onChange={() => chatStore.toggleChannelDisplay(channelId)}
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
      </Menu>
   );
});
