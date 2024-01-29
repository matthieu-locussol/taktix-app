import { darken, styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { useStore } from '../../store';

export const Chatbox = observer(() => {
   const theme = useTheme();
   const inputRef = useRef<HTMLInputElement>(null);
   const chatboxRef = useRef<HTMLDivElement>(null);
   const { chatStore, colyseusStore, gameStore, hudStore, loadingScreenStore } = useStore();

   useEffect(() => {
      if (chatboxRef.current !== null) {
         chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      }
   }, [chatStore.messages.length]);

   const sendMessage = (event: React.FormEvent<HTMLDivElement>) => {
      event.preventDefault();

      colyseusStore.sendMessage(chatStore.currentChannel, chatStore.input);
      chatStore.setInput('');
   };

   if (!loadingScreenStore.sceneVisible) {
      return null;
   }

   return (
      <Root component="form" onSubmit={sendMessage} widthPercent={hudStore.chatboxWidth}>
         <Chat
            ref={chatboxRef}
            heightPercent={hudStore.chatboxHeight}
            inputHeight={hudStore.chatboxInputHeight}
         >
            {chatStore.messages.map(({ author, content, channel }, idx) =>
               chatStore.isSystemChannel(channel) ? (
                  <Typography
                     key={idx}
                     fontStyle="italic"
                     fontSize="1vw"
                     lineHeight="2.5vh"
                     color={theme.palette.channels[channel]}
                  >
                     {content}
                  </Typography>
               ) : (
                  <Typography
                     key={idx}
                     fontSize="1vw"
                     lineHeight="2.5vh"
                     color={theme.palette.channels[channel]}
                  >
                     {author}: {content}
                  </Typography>
               ),
            )}
         </Chat>
         <ChatInput
            ref={inputRef}
            value={chatStore.input}
            onFocus={() => gameStore.enableKeyboard(false)}
            onBlur={() => gameStore.enableKeyboard(true)}
            onChange={(e) => chatStore.setInput(e.target.value)}
            maxLength={160}
            widthPercent={hudStore.chatboxWidth}
            inputHeight={hudStore.chatboxInputHeight}
         />
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

const Root = styled(Box, { shouldForwardProp: (prop) => prop !== 'widthPercent' })<StyleProps>(
   ({ theme, widthPercent }) => ({
      position: 'absolute',
      left: 8,
      bottom: 8,
      border: `1px solid ${theme.palette.paper.border}`,
      background: darken(`${theme.palette.paper.background}C6`, 0.15),
      width: `calc(${widthPercent}vw - 16px)`,
      boxSizing: 'border-box',
      borderRadius: 8,
   }),
);

const Chat = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'heightPercent' && prop !== 'inputHeight',
})<ChatStyleProps>(({ heightPercent, inputHeight }) => ({
   padding: 8,
   height: `calc(${heightPercent}vh - ${inputHeight}px - 36px - 2vh)`,
   maxHeight: `calc(${heightPercent}vh - ${inputHeight}px - 36px - 2vh)`,
   overflowX: 'hidden',
   overflowY: 'scroll',
   color: 'white',
   wordWrap: 'break-word',
   textShadow: '1px 1px 2px #000000',
}));

const ChatInput = styled('input', {
   shouldForwardProp: (prop) => prop !== 'widthPercent' && prop !== 'inputHeight',
})<StyleProps>(({ theme, widthPercent, inputHeight }) => ({
   padding: '1vh 1vw 1vh 1vw',
   fontSize: '1vw',
   border: 'none',
   borderTop: `2px solid ${theme.palette.paper.border}`,
   outline: 'none',
   backgroundColor: '#E8E8E8',
   '&:hover': {
      backgroundColor: '#DDDDDD',
   },
   borderBottomLeftRadius: 8,
   borderBottomRightRadius: 8,
   width: `calc(${widthPercent}vw - 2vw - 18px)`,
   height: `${inputHeight}px`,
}));
