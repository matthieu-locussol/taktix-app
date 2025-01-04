import type { MenuProps } from '@mui/material/Menu';
import type { Channel } from 'shared/src/types/Channel.ts';

import { svgIconClasses, useTheme } from '@mui/material';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { observer } from 'mobx-react-lite';
import { channelsInformations } from 'shared/src/data/channelsInformations.ts';

import { useStore } from '../../../store/index.tsx';
import { useTranslation } from '../../../types/react-i18next.ts';

interface ChannelsSelectorProps extends MenuProps {
   handleClose: () => void;
}

export const ChannelsSelector = observer(({ handleClose, ...rest }: ChannelsSelectorProps) => {
   const theme = useTheme();
   const { chatStore } = useStore();
   const { t } = useTranslation();

   return (
      <Menu
         MenuListProps={{
            'aria-labelledby': 'open-channels-selector',
            dense: true,
            sx: { padding: 0 },
         }}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
         }}
         id="open-channels-selector"
         slotProps={{
            root: {},
            paper: {
               variant: 'outlined',
               elevation: 0,
            },
         }}
         transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
         }}
         onClose={handleClose}
         {...rest}
      >
         {Object.keys(channelsInformations)
            .map((channelIdStr) => parseInt(channelIdStr, 10) as Channel)
            .filter((channelId) => !chatStore.isSystemChannel(channelId))
            .map((channelId) => (
               <MenuItem key={channelId} disableRipple>
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={chatStore.isChannelDisplayed(channelId)}
                           size="small"
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
                           onChange={() => chatStore.toggleChannelDisplay(channelId)}
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
