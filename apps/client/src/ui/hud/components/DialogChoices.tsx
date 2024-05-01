import CurrentIcon from '@mui/icons-material/ArrowRightRounded';
import { Box, darken, keyframes, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store';

export const DialogChoices = observer(() => {
   const { dialogMenuStore, hudStore } = useStore();

   return (
      <Root offsetY={hudStore.menuHeight} dialogHeight={dialogMenuStore.dialogHeight}>
         {dialogMenuStore.currentChoices.map(({ text, disabled }, idx) => (
            <Choice
               key={`choice-${idx}`}
               disabled={disabled}
               hover={dialogMenuStore.hoveredItem === idx}
               onClick={() => dialogMenuStore.nextDialogFromChoice()}
               onMouseOver={() => dialogMenuStore.setHoveredItem(idx)}
            >
               <Icon
                  sx={{ visibility: dialogMenuStore.hoveredItem === idx ? 'visible' : 'hidden' }}
               >
                  <CurrentIcon
                     sx={{
                        color: (theme) => theme.palette.dialogs.select,
                        fontSize: 'min(2vw, 4vh)',
                     }}
                  />
               </Icon>
               {text}
            </Choice>
         ))}
      </Root>
   );
});

interface ChoicesStyleProps {
   offsetY: number;
   dialogHeight: number;
}

interface ChoiceStyleProps {
   hover: boolean;
   disabled?: boolean;
}

const Root = styled(Box, {
   shouldForwardProp: (prop) => !['offsetY', 'dialogHeight'].includes(prop.toString()),
})<ChoicesStyleProps>(({ dialogHeight, offsetY, theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: 'min(0.5vw, 1vh)',
   padding: 'min(1vw, 2vh)',
   minWidth: '10vw',
   maxWidth: '25vw',
   border: `1px solid ${theme.palette.paper.border}`,
   background: darken(`${theme.palette.paper.background}C6`, 0.15),
   position: 'absolute',
   right: 'calc(55vw / 2 - min(1vw, 2vh) - 1px)',
   bottom: `calc(min(3vw, 6vh) + ${offsetY}vh + ${dialogHeight}px)`,
   borderRadius: 8,
}));

const Choice = styled(Box, {
   shouldForwardProp: (prop) => !['hover', 'disabled'].includes(prop.toString()),
})<ChoiceStyleProps>(({ disabled, hover, theme }) => ({
   display: 'flex',
   alignItems: 'center',
   border: `1px solid ${theme.palette.paper.border}`,
   background: hover
      ? theme.palette.dialogs.hover
      : darken(`${theme.palette.paper.background}C6`, 0.7),
   borderRadius: 8,
   color: theme.palette.text.primary,
   fontFamily: 'Orbitron',
   fontSize: 'min(1vw, 1.5vh)',
   lineHeight: 0,
   padding: 'min(0.25vw, 0.5vh)',
   fontWeight: 'bold',
   opacity: disabled ? 0.5 : 1,
   cursor: 'pointer',
   ':hover': {
      background: theme.palette.dialogs.hover,
   },
}));

const blink = () => keyframes`
   50% {
      opacity: 0.5
   }
`;

const Icon = styled(Box)(() => {
   const blinKeyframes = blink();

   return {
      animation: `${blinKeyframes} 1s infinite`,
   };
});
