import PlusIcon from '@mui/icons-material/AddRounded';
import DotIcon from '@mui/icons-material/FiberManualRecord';
import MinusIcon from '@mui/icons-material/RemoveRounded';
import ChannelIcon from '@mui/icons-material/SettingsRounded';
import { darken, styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { channelsInformations } from 'shared/src/data/channelsInformations.ts';
import { Channel } from 'shared/src/types/Channel.ts';

import { useStore } from '../../store/index.tsx';
import { useTranslation } from '../../types/react-i18next.ts';

import { ChannelsSelector } from './components/ChannelsSelector.tsx';
import { CurrentChannelSelector } from './components/CurrentChannelSelector.tsx';
import { SmallButton } from './components/SmallButton.tsx';

export const Chatbox = observer(() => {
   const theme = useTheme();
   const inputRef = useRef<HTMLInputElement>(null);
   const chatboxRef = useRef<HTMLDivElement>(null);
   const { chatStore, colyseusStore, gameStore, hudStore, loadingScreenStore } = useStore();
   const [channelSelectorAnchor, setChannelSelectorAnchor] = useState<null | HTMLElement>(null);
   const [currentChannelAnchor, setCurrentChannelAnchor] = useState<null | SVGSVGElement>(null);
   const { t } = useTranslation();

   useEffect(() => {
      if (inputRef.current !== null) {
         chatStore.setInputRef(inputRef.current);
      }
   }, [inputRef.current]);

   useEffect(() => {
      if (chatboxRef.current !== null) {
         chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      }
   }, [chatStore.messages.length, chatStore.displayedChannels.length, hudStore.chatboxHeight]);

   const sendMessage = (event: React.FormEvent<HTMLDivElement>) => {
      event.preventDefault();

      colyseusStore.sendMessage(chatStore.currentChannel, chatStore.input);
      chatStore.setInput('');
   };

   if (!loadingScreenStore.sceneVisible) {
      return null;
   }

   return (
      <Root component="form" widthPercent={hudStore.chatboxWidth} onSubmit={sendMessage}>
         <Wrapper widthPercent={hudStore.chatboxWidth}>
            <Chat
               ref={chatboxRef}
               heightPercent={hudStore.chatboxHeight}
               inputHeight={hudStore.chatboxInputHeight}
            >
               {chatStore.filteredMessages.map(({ author, content, channel }, idx) =>
                  chatStore.isSystemChannel(channel) ? (
                     <Typography
                        key={idx}
                        color={theme.palette.channels[channel]}
                        fontSize="min(1vw, 1.5vh)"
                        fontStyle="italic"
                        lineHeight="2vh"
                     >
                        [{t(channelsInformations[channel].name)}] {content}
                     </Typography>
                  ) : (
                     <Typography
                        key={idx}
                        color={theme.palette.channels[channel]}
                        fontSize="min(1vw, 1.5vh)"
                        fontStyle={channel === Channel.PRIVATE ? 'italic' : 'normal'}
                        lineHeight="2vh"
                     >
                        [{t(channelsInformations[channel].name)}] <b>{author}</b>: {content}
                     </Typography>
                  ),
               )}
            </Chat>
            <Box>
               <ChatInput
                  ref={inputRef}
                  inputHeight={hudStore.chatboxInputHeight}
                  maxLength={160}
                  value={chatStore.input}
                  widthPercent={hudStore.chatboxWidth}
                  onBlur={() => gameStore.enableKeyboard(true)}
                  onChange={(e) => chatStore.setInput(e.target.value)}
                  onFocus={(e) => {
                     gameStore.enableKeyboard(false);
                     e.currentTarget.setSelectionRange(
                        e.currentTarget.value.length,
                        e.currentTarget.value.length,
                     );
                  }}
               />
               <ChannelSelectorButton
                  aria-controls={
                     chatStore.isCurrentChannelSelectorOpened ? 'open-channel-selector' : undefined
                  }
                  aria-expanded={chatStore.isCurrentChannelSelectorOpened ? 'true' : undefined}
                  aria-haspopup="true"
                  chatboxInputHeight={hudStore.chatboxInputHeight}
                  currentChannel={chatStore.currentChannel}
                  id="open-channel-selector"
                  onClick={(e) => {
                     setCurrentChannelAnchor(e.currentTarget);
                     chatStore.openCurrentChannelSelectorModal();
                  }}
               />
               <CurrentChannelSelector
                  anchorEl={currentChannelAnchor}
                  handleClose={() => {
                     setCurrentChannelAnchor(null);
                     chatStore.closeCurrentChannelSelectorModal();
                  }}
                  open={chatStore.isCurrentChannelSelectorOpened}
               />
            </Box>
         </Wrapper>
         <ChatSettings heightPercent={hudStore.chatboxHeight}>
            <SmallButton
               disabled={!hudStore.canIncreaseChatboxHeight}
               onClick={() => hudStore.increaseChatboxHeight()}
            >
               <PlusIcon fontSize="inherit" />
            </SmallButton>
            <SmallButton
               disabled={!hudStore.canDecreaseChatboxHeight}
               onClick={() => hudStore.decreaseChatboxHeight()}
            >
               <MinusIcon fontSize="inherit" />
            </SmallButton>
            <SmallButton
               aria-controls={
                  chatStore.isChannelsSelectorOpened ? 'open-channels-selector' : undefined
               }
               aria-expanded={chatStore.isChannelsSelectorOpened ? 'true' : undefined}
               aria-haspopup="true"
               id="open-channels-selector"
               onClick={(e) => {
                  setChannelSelectorAnchor(e.currentTarget);
                  chatStore.openChannelsSelectorModal();
               }}
            >
               <ChannelIcon fontSize="inherit" />
            </SmallButton>
            <ChannelsSelector
               anchorEl={channelSelectorAnchor}
               handleClose={() => {
                  setChannelSelectorAnchor(null);
                  chatStore.closeChannelsSelectorModal();
               }}
               open={chatStore.isChannelsSelectorOpened}
            />
         </ChatSettings>
      </Root>
   );
});

interface StyleProps {
   widthPercent: number;
   inputHeight?: number;
}

interface ChatStyleProps {
   heightPercent: number;
   inputHeight: number;
}

interface ChatSettingsProps {
   heightPercent: number;
}

const Root = styled(Box, { shouldForwardProp: (prop) => prop !== 'widthPercent' })<StyleProps>(
   ({ widthPercent }) => ({
      position: 'fixed',
      left: 8,
      bottom: 8,
      width: `calc(${widthPercent}vw - 16px)`,
      boxSizing: 'border-box',
      borderRadius: 8,
   }),
);

const Wrapper = styled(Box, { shouldForwardProp: (prop) => prop !== 'widthPercent' })<StyleProps>(
   ({ theme, widthPercent }) => ({
      border: `1px solid ${theme.palette.paper.border}`,
      background: darken(`${theme.palette.paper.background}C6`, 0.15),
      width: `calc(${widthPercent}vw - 16px - min(1.8vw, 3vh) - 0.5vw)`,
      height: '100%',
      boxSizing: 'border-box',
      borderRadius: 8,
   }),
);

const Chat = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'heightPercent' && prop !== 'inputHeight',
})<ChatStyleProps>(({ heightPercent, inputHeight }) => ({
   padding: 8,
   height: `calc(${heightPercent}vh - ${inputHeight}px - 36px - 1.5vh)`,
   maxHeight: `calc(${heightPercent}vh - ${inputHeight}px - 36px - 1.5vh)`,
   overflowX: 'hidden',
   overflowY: 'scroll',
   color: 'white',
   wordWrap: 'break-word',
   textShadow: '1px 1px 2px #000000',
}));

const ChatInput = styled('input', {
   shouldForwardProp: (prop) => prop !== 'widthPercent' && prop !== 'inputHeight',
})<StyleProps>(({ theme, widthPercent, inputHeight }) => ({
   padding: '0.75vh 0.5vw 0.75vh 0.5vw',
   paddingLeft: `calc(min(0.5vw, 0.75vh) * 2 + ${inputHeight}px)`,
   fontSize: 'min(1vw, 1.5vh)',
   border: 'none',
   borderTop: `2px solid ${theme.palette.paper.border}`,
   outline: 'none',
   backgroundColor: `${theme.palette.chalk.main}C6`,
   borderBottomLeftRadius: 8,
   borderBottomRightRadius: 8,
   width: `calc(${widthPercent}vw - 1vw - 18px - min(1.8vw, 3vh) - (min(0.5vw, 0.75vh) * 2 + ${inputHeight}px))`,
   height: `${inputHeight}px`,
}));

const ChatSettings = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'heightPercent',
})<ChatSettingsProps>(({ heightPercent }) => ({
   position: 'absolute',
   top: 0,
   right: 0,
   bottom: 0,
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-evenly',
   flexGrow: 1,
   maxHeight: heightPercent ? `calc(15vh - 9px - 0.875vh)` : 'calc(15vh - 8px)',
   marginTop: 'auto',
}));

interface ChannelSelectorButtonProps {
   currentChannel: Channel;
   chatboxInputHeight: number;
}

const ChannelSelectorButton = styled(DotIcon, {
   shouldForwardProp: (prop) => prop !== 'currentChannel' && prop !== 'chatboxInputHeight',
})<ChannelSelectorButtonProps>(({ chatboxInputHeight, currentChannel, theme }) => ({
   color: `${theme.palette.channels[currentChannel]} !important`,
   position: 'absolute',
   left: '0.25vw',
   bottom: '0.25vw',
   cursor: 'pointer',
   fontSize: `calc(min(0.5vw, 0.75vh) + ${chatboxInputHeight}px)`,
   '&:hover': {
      color: `${theme.palette.channels[currentChannel]}C6 !important`,
   },
}));
