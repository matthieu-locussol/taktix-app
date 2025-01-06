import { darken, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../store/index';
import { useTranslation } from '../../types/react-i18next';

import { ExperienceBar } from './components/ExperienceBar';
import { HealthBar } from './components/HealthBar';

export const Character = observer(() => {
   const { characterStore, hudStore } = useStore();
   const { t } = useTranslation();

   return (
      <Root
         chatboxWidth={hudStore.chatboxWidth}
         heightPercent={hudStore.characterHeight}
         widthPercent={hudStore.characterWidth}
      >
         <Informations>
            <Typography
               align="right"
               color="text.primary"
               fontSize="1vw"
               lineHeight="2.5vh"
               variant="body2"
            >
               <b>{characterStore.name}</b> - {t('level', { level: characterStore.level })}
            </Typography>
            <Typography
               align="right"
               color="text.secondary"
               fontSize="1vw"
               lineHeight="2.5vh"
               variant="body2"
            >
               {t(characterStore.map)} - [{characterStore.position.x}, {characterStore.position.y}]
            </Typography>
         </Informations>
         <ProgressBars>
            <HealthBar placement="top" />
            <ExperienceBar placement="top" />
         </ProgressBars>
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

const Informations = styled(Box)(() => ({
   position: 'absolute',
   top: 8,
   right: 8,
}));

const ProgressBars = styled(Box)(() => ({
   position: 'absolute',
   left: 8,
   right: 8,
   bottom: 8,
}));
