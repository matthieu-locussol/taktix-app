import { svgIconClasses, useTheme } from '@mui/material';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { observer } from 'mobx-react-lite';
import { channelsInformations } from 'shared/src/data/channelsInformations';
import { Channel } from 'shared/src/types/Channel';
import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';

interface ChannelsSelectorProps extends MenuProps {
   handleClose: () => void;
}

export const ChannelsSelector = observer(({ handleClose, ...rest }: ChannelsSelectorProps) => {
   const theme = useTheme();
   const { chatStore } = useStore();
   const { t } = useTranslation();

   return (
      <Menu
         id="open-channels-selector"
         slotProps={{
            root: {},
            paper: {
               variant: 'outlined',
               elevation: 0,
            },
         }}
         MenuListProps={{
            'aria-labelledby': 'open-channels-selector',
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
         {Object.keys(channelsInformations)
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
                     label={`${t(channelsInformations[channelId].name)} (${
                        channelsInformations[channelId].shortcut
                     })`}
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
      </Menu>
   );
});
