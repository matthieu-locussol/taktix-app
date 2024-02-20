import { darken, styled } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';

export const Character = observer(() => {
   const { characterStore, hudStore } = useStore();

   return (
      <Root
         widthPercent={hudStore.characterWidth}
         heightPercent={hudStore.characterHeight}
         chatboxWidth={hudStore.chatboxWidth}
      >
         <Image src={`/assets/professions/face/${characterStore.profession}.png`} alt="Character" />
         <Informations>
            <Typography
               align="right"
               color="text.primary"
               variant="body2"
               fontSize="1vw"
               lineHeight="2.5vh"
            >
               <b>{characterStore.name}</b> - Level 1
            </Typography>
            <Typography
               align="right"
               color="text.secondary"
               variant="body2"
               fontSize="1vw"
               lineHeight="2.5vh"
            >
               [{characterStore.position.x}, {characterStore.position.y}] - {characterStore.mapName}
            </Typography>
         </Informations>
         <LifeProgressBar variant="determinate" value={35} />
         <ExperienceProgressBar variant="determinate" value={10} />
      </Root>
   );
});

interface StyleProps {
   chatboxWidth: number;
   widthPercent: number;
   heightPercent: number;
}

const Root = styled(Box, {
   shouldForwardProp: (prop) =>
      prop !== 'widthPercent' && prop !== 'heightPercent' && prop !== 'chatboxWidth',
})<StyleProps>(({ theme, chatboxWidth, widthPercent, heightPercent }) => ({
   position: 'absolute',
   left: `${chatboxWidth}vw`,
   bottom: 8,
   border: `1px solid ${theme.palette.paper.border}`,
   background: darken(`${theme.palette.paper.background}C6`, 0.15),
   width: `calc(${widthPercent}vw - 2px)`,
   height: `calc(${heightPercent}vh - 18px)`,
   borderRadius: 8,
}));

const Image = styled('img')(({ theme }) => ({
   padding: 8,
   overflowX: 'hidden',
   overflowY: 'scroll',
   color: 'white',
   wordWrap: 'break-word',
   textShadow: '1px 1px 2px #000000',
   border: `1px solid ${theme.palette.paper.border}`,
   background: darken(`${theme.palette.paper.background}C6`, 0.15),
   position: 'absolute',
   top: 8,
   left: 8,
   borderRadius: 8,
   width: 'min(2.5vw, 5.5vh)',
   height: 'min(2.5vw, 5.5vh)',
}));

const Informations = styled(Box)(() => ({
   position: 'absolute',
   top: 8,
   right: 8,
}));

const ProgressBar = styled(LinearProgress)(() => ({
   position: 'absolute',
   left: 8,
   right: 8,
   bottom: 8,
   width: 'calc(100% - 16px - 2px)',
   height: '0.5vw',
   borderRadius: 8,
   border: `1px solid #374151`,
}));

const ExperienceProgressBar = styled(ProgressBar)(() => ({
   backgroundColor: '#c4b5fd',
   [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: '#8b5cf6',
      borderRadius: 8,
   },
}));

const LifeProgressBar = styled(ProgressBar)(() => ({
   bottom: `calc(8px + 0.5vw + 4px + 2px)`,
   backgroundColor: '#fca5a5',
   [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: '#ef4444',
      borderRadius: 8,
   },
}));
