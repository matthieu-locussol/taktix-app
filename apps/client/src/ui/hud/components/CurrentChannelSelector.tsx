import { svgIconClasses, useTheme } from '@mui/material';
import { checkboxClasses } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { observer } from 'mobx-react-lite';
import { channelsInformations } from 'shared/src/data/channelsInformations';
import { Channel } from 'shared/src/types/Channel';
import { useStore } from '../../../store';

interface CurrentChannelSelectorProps extends MenuProps {
   handleClose: () => void;
}

export const CurrentChannelSelector = observer(
   ({ handleClose, ...rest }: CurrentChannelSelectorProps) => {
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
               sx: { padding: 0 },
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
               {Object.keys(channelsInformations)
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
                                    p: 'min(0.5vw, 0.75vh)',
                                    color: theme.palette.channels[channelId],
                                    [`&.${checkboxClasses.checked}`]: {
                                       color: theme.palette.channels[channelId],
                                    },
                                    [`& .${svgIconClasses.root}`]: {
                                       fontSize: 'min(1.5vw, 2.25vh)',
                                    },
                                 }}
                              />
                           }
                           label={`${channelsInformations[channelId].name} (${channelsInformations[channelId].shortcut})`}
                           slotProps={{
                              typography: {
                                 color: theme.palette.channels[channelId],
                                 lineHeight: '1vh',
                                 fontSize: 'min(1vw, 1.5vh)',
                              },
                           }}
                        />
                     </MenuItem>
                  ))}
            </RadioGroup>
         </Menu>
      );
   },
);
