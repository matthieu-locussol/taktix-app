import NextIcon from '@mui/icons-material/ArrowDropDownRounded';
import { Backdrop, Grow, Typography, darken, keyframes, styled } from '@mui/material';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';

import { useStore } from '../../../store';
import { DialogChoices } from '../components/DialogChoices';

export const DialogMenu = observer(() => {
   const dialogRef = useRef<HTMLDivElement | null>(null);
   const { dialogMenuStore, hudStore } = useStore();

   useEffect(() => {
      if (dialogRef.current !== null) {
         dialogMenuStore.setDialogHeight(dialogRef.current.offsetHeight);
      }
   }, [dialogMenuStore.items.length]);

   window.onresize = () => {
      if (dialogRef.current !== null) {
         dialogMenuStore.setDialogHeight(dialogRef.current.offsetHeight);
      }
   };

   return (
      <Grow unmountOnExit in={dialogMenuStore.isOpened}>
         <Backdrop open sx={{ backgroundColor: 'transparent' }}>
            <DialogRoot ref={dialogRef} offsetY={hudStore.menuHeight}>
               {dialogMenuStore.currentItem?.avatar && (
                  <Avatar
                     alt={dialogMenuStore.currentItem?.name}
                     src={`/assets/npcs/${dialogMenuStore.currentItem?.avatar}`}
                  />
               )}
               <Name>{dialogMenuStore.currentItem?.name}</Name>
               <Content
                  hasAvatar={dialogMenuStore.currentItem?.avatar !== undefined}
                  onClick={() => dialogMenuStore.nextDialog()}
               >
                  <ContentText>
                     {dialogMenuStore.currentItem?.content}
                     <br />
                     &nbsp;
                  </ContentText>
                  <Icon>
                     <NextIcon
                        sx={{
                           color: (theme) => theme.palette.link.hover,
                           fontSize: 'min(2vw, 4vh)',
                        }}
                     />
                  </Icon>
               </Content>
            </DialogRoot>
            {dialogMenuStore.currentChoices.length > 0 && <DialogChoices />}
         </Backdrop>
      </Grow>
   );
});

const DialogRoot = styled(Box, { shouldForwardProp: (prop) => prop !== 'offsetY' })<{
   offsetY: number;
}>(({ offsetY, theme }) => ({
   display: 'flex',
   padding: 'min(1vw, 2vh)',
   width: '45vw',
   border: `1px solid ${theme.palette.paper.border}`,
   background: darken(`${theme.palette.paper.background}C6`, 0.15),
   position: 'absolute',
   bottom: `calc(min(2vw, 4vh) + ${offsetY}vh)`,
   borderRadius: 8,
}));

const Avatar = styled('img')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   width: '8vw',
   height: '8vw',
   border: `1px solid ${theme.palette.paper.border}`,
   background: darken(`${theme.palette.paper.background}C6`, 0.15),
   borderRadius: 8,
   marginTop: 'min(1vw, 2vh)',
}));

const Name = styled(Typography)(({ theme }) => ({
   border: `1px solid ${theme.palette.paper.border}`,
   background: darken(`${theme.palette.paper.background}C6`, 0.7),
   borderRadius: 8,
   color: theme.palette.text.primary,
   fontFamily: 'Orbitron',
   fontSize: 'min(1vw, 1.5vh)',
   textAlign: 'center',
   lineHeight: 0,
   padding: 'min(1vw, 2vh)',
   position: 'absolute',
   top: 'calc(-1 * min(1vw, 2vh))',
   left: 'min(1vw, 2vh)',
   fontWeight: 'bold',
}));

const Content = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'hasAvatar',
})<{ hasAvatar: boolean }>(({ hasAvatar, theme }) => ({
   display: 'flex',
   width: hasAvatar ? '36vw' : '45vw',
   height: '8vw',
   border: `1px solid ${theme.palette.paper.border}`,
   background: darken(`${theme.palette.paper.background}C6`, 0.15),
   borderRadius: 8,
   marginTop: 'min(1vw, 2vh)',
   marginLeft: 'auto',
   overflowY: 'scroll',
}));

const ContentText = styled(Typography)(({ theme }) =>
   theme.unstable_sx({
      color: theme.palette.text.secondary,
      pl: 'min(1vw, 2vh)',
      pr: 'min(2vw, 4vh)',
      pt: 'min(0.5vw, 1vh)',
      lineHeight: 'min(1.75vw, 2.75vh)',
      fontSize: 'min(1vw, 2vh)',
   }),
);

const blink = () => keyframes`
   50% {
      opacity: 0.3
   }
`;

const Icon = styled(Box)(() => {
   const blinKeyframes = blink();

   return {
      position: 'absolute',
      bottom: 'min(1.25vw, 2.5vh)',
      right: 'min(1.75vw, 3.5vh)',
      marginTop: 'auto',
      animation: `${blinKeyframes} 1s infinite`,
   };
});
