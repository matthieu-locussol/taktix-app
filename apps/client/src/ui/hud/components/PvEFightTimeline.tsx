import type { TranslationKey } from 'shared/src/data/translations.ts';

import PlayingIcon from '@mui/icons-material/ArrowDropUpRounded';
import { Box, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { zCharacterSprite } from 'shared/src/data/charactersSprites.ts';
import { zMonsterSprite } from 'shared/src/data/monstersSprites.ts';

import { useStore } from '../../../store/index.tsx';
import { useTranslation } from '../../../types/react-i18next.ts';

import { CharacterSpriteStatic } from './CharacterSpriteStatic.tsx';
import { MonsterSpriteStatic } from './MonsterSpriteStatic.tsx';
import { Tooltip } from './Tooltip.tsx';

export const PvEFightTimeline = observer(() => {
   const { t } = useTranslation();
   const { pveFightStore } = useStore();

   return (
      <Box
         sx={{
            display: 'flex',
            gap: 2,
         }}
      >
         {pveFightStore.fightersOrder.map((fighter) => (
            <Tooltip
               key={`${fighter.id}-${pveFightStore.currentTurn}-${pveFightStore.currentFighter}`}
               placement="top"
               title={t(fighter.name as TranslationKey)}
            >
               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Paper
                     elevation={0}
                     sx={{
                        display: 'flex',
                        boxShadow: (theme) =>
                           `0 0 0 ${fighter.id === pveFightStore.currentFighter ? 4 : 1}px ${
                              theme.palette.fight[fighter.type]
                           }`,
                        background: (theme) => theme.palette.paper.background,
                        opacity:
                           pveFightStore.fightersHealth[fighter.id] <= 0 ? `0.4 !important` : 1,
                        flexWrap: 'wrap',
                        p: 1.5,
                     }}
                  >
                     {fighter.type === 'ally' ? (
                        <CharacterSpriteStatic
                           scale={1.375}
                           sprite={zCharacterSprite.parse(fighter.spritesheet)}
                           sx={{ pb: 0.5, mt: -0.5 }}
                        />
                     ) : (
                        <MonsterSpriteStatic
                           sprite={zMonsterSprite.parse(fighter.spritesheet)}
                           sx={{ pb: 0.5, mt: -0.5 }}
                        />
                     )}
                  </Paper>
                  {fighter.id === pveFightStore.currentFighter && (
                     <PlayingIcon
                        fontSize="large"
                        sx={({ palette }) => ({ color: palette.fight[fighter.type] })}
                     />
                  )}
               </Box>
            </Tooltip>
         ))}
      </Box>
   );
});
