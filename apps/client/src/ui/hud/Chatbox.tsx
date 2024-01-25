import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { useStore } from '../../store';

export const Chatbox = observer(() => {
   const inputRef = useRef<HTMLInputElement>(null);
   const chatboxRef = useRef<HTMLDivElement>(null);
   const { chatStore, colyseusStore, gameStore, loadingScreenStore } = useStore();

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
      <Root component="form" onSubmit={sendMessage}>
         <Chat ref={chatboxRef}>
            {chatStore.messages.map(({ author, content, channel }, idx) =>
               chatStore.isSystemChannel(channel) ? (
                  <Typography
                     key={idx}
                     fontStyle="italic"
                     color={chatStore.getChannelColor(channel)}
                  >
                     {content}
                  </Typography>
               ) : (
                  <Typography key={idx} color={chatStore.getChannelColor(channel)}>
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
         />
      </Root>
   );
});

const Root = styled(Box)(() => ({
   position: 'absolute',
   left: 12,
   bottom: 8,
   border: '2px solid #000000',
   backgroundColor: '#00000066',
   borderRadius: 6,
   width: '40vw',
}));

const Chat = styled(Box)(() => ({
   padding: 8,
   height: '15vh',
   maxHeight: '15vh',
   overflowX: 'hidden',
   overflowY: 'scroll',
   color: 'white',
   wordWrap: 'break-word',
   textShadow: '1px 1px 2px #000000',
   '::-webkit-scrollbar': {
      width: '8px',
   },
   '::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
   },
   '::-webkit-scrollbar-thumb': {
      backgroundColor: '#00000066',
      borderRadius: '4px',
   },
   '::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#00000099',
   },
}));

const ChatInput = styled('input')(() => ({
   padding: 8,
   fontSize: 16,
   border: 'none',
   borderTop: '2px solid #000000',
   outline: 'none',
   backgroundColor: 'white',
   borderBottomLeftRadius: 4,
   borderBottomRightRadius: 4,
   '&:hover': {
      backgroundColor: '#DDDDDD',
   },
   width: 'calc(40vw - 16px)',
}));
