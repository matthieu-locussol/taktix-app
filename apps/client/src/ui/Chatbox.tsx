import { Box, Typography, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { game } from '../game/PhaserGame';
import { useStore } from '../store';

const Root = styled('form')(() => ({
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
   overflow: 'scroll',
   color: 'white',
   textShadow: '1px 1px 2px #000000',
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

export const Chatbox = observer(() => {
   const inputRef = useRef<HTMLInputElement>(null);
   const chatboxRef = useRef<HTMLDivElement>(null);
   const { chatStore, characterStore, loadingScreenStore, socketStore } = useStore();

   useEffect(() => {
      if (chatboxRef.current !== null) {
         chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      }
   }, [chatStore.messages.length]);

   if (!loadingScreenStore.sceneVisible) {
      return null;
   }

   const sendMessage = () => {
      chatStore.addMessage({
         author: characterStore.name,
         message: chatStore.input,
      });

      chatStore.setInput('');

      socketStore.send({
         type: 'message',
         name: characterStore.name,
         content: chatStore.input,
      });
   };

   return (
      <Root
         onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
         }}
      >
         <Chat ref={chatboxRef}>
            {chatStore.messages.map(({ author, message }, idx) =>
               author === 'Server' ? (
                  <Typography key={idx} fontStyle="italic">
                     {message}
                  </Typography>
               ) : (
                  <Typography key={idx}>
                     {author}: {message}
                  </Typography>
               ),
            )}
         </Chat>
         <ChatInput
            ref={inputRef}
            value={chatStore.input}
            onFocus={() => {
               game.input.keyboard.enabled = false;
            }}
            onBlur={() => {
               game.input.keyboard.enabled = true;
            }}
            onChange={(e) => chatStore.setInput(e.target.value)}
         />
      </Root>
   );
});
