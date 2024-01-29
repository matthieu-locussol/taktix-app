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
         <Chat ref={chatboxRef} heightPercent={hudStore.chatboxHeight}>
            {chatStore.messages.map(({ author, content, channel }, idx) =>
               chatStore.isSystemChannel(channel) ? (
                  <Typography key={idx} fontStyle="italic" color={theme.palette.channels[channel]}>
                     {content}
                  </Typography>
               ) : (
                  <Typography key={idx} color={theme.palette.channels[channel]}>
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
         />
      </Root>
   );
});

interface StyleProps {
   widthPercent: number;
}

interface ChatStyleProps {
   heightPercent: number;
}

const Root = styled(Box, { shouldForwardProp: (prop) => prop !== 'widthPercent' })<StyleProps>(
   ({ theme, widthPercent }) => ({
      position: 'absolute',
      left: 0,
      bottom: 0,
      border: `1px solid ${theme.palette.paper.border}`,
      background: darken(`${theme.palette.paper.background}C6`, 0.15),
      width: `${widthPercent}vw`,
   }),
);

const Chat = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'heightPercent',
})<ChatStyleProps>(({ heightPercent }) => ({
   padding: 8,
   height: `${heightPercent}vh`,
   maxHeight: `${heightPercent}vh`,
   overflowX: 'hidden',
   overflowY: 'scroll',
   color: 'white',
   wordWrap: 'break-word',
   textShadow: '1px 1px 2px #000000',
}));

const ChatInput = styled('input', {
   shouldForwardProp: (prop) => prop !== 'widthPercent',
})<StyleProps>(({ widthPercent }) => ({
   padding: 8,
   fontSize: 16,
   border: 'none',
   borderTop: '2px solid #000000',
   outline: 'none',
   backgroundColor: 'white',
   '&:hover': {
      backgroundColor: '#DDDDDD',
   },
   width: `calc(${widthPercent}vw - 16px)`,
}));
