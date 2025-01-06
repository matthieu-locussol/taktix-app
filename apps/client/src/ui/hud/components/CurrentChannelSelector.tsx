import type { MenuProps } from '@mui/material/Menu';

import { svgIconClasses, useTheme } from '@mui/material';
import { checkboxClasses } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { observer } from 'mobx-react-lite';
import { channelsInformations } from 'shared/src/data/channelsInformations';
import { Channel } from 'shared/src/types/Channel';

import { useStore } from '../../../store';
import { useTranslation } from '../../../types/react-i18next';

interface CurrentChannelSelectorProps extends MenuProps {
   handleClose: () => void;
}

export const CurrentChannelSelector = observer(
   ({ handleClose, ...rest }: CurrentChannelSelectorProps) => {
      const theme = useTheme();
      const { chatStore } = useStore();
      const { t } = useTranslation();

      return (
         <Menu
            MenuListProps={{
               'aria-labelledby': 'open-channel-selector',
               dense: true,
               sx: { padding: 0 },
            }}
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            id="open-channel-selector"
            slotProps={{
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
            <RadioGroup value={chatStore.currentChannel}>
               {Object.keys(channelsInformations)
                  .map((channelIdStr) => parseInt(channelIdStr, 10) as Channel)
                  .filter((channelId) => !chatStore.isSystemChannel(channelId))
                  .filter((channelId) => channelId !== Channel.PRIVATE)
                  .map((channelId) => (
                     <MenuItem key={channelId} disableRipple>
                        <FormControlLabel
                           control={
                              <Radio
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
                                 value={channelId}
                                 onChange={() => {
                                    chatStore.setCurrentChannel(channelId);
                                    handleClose();
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
            </RadioGroup>
         </Menu>
      );
   },
);
