import { Box, BoxProps, styled } from '@mui/material';
import { MonsterSprite, monstersSpritesData } from 'shared/src/data/monstersSprites';

interface MonsterSpriteStaticProps extends BoxProps, StyleProps {}

export const MonsterSpriteStatic = ({ sprite, ...rest }: MonsterSpriteStaticProps) => {
   const { frames, frameWidth, frameHeight, scale } = monstersSpritesData[sprite];

   return (
      <StyledBox
         sprite={sprite}
         framesCount={frames.length}
         framesWidth={frameWidth}
         framesHeight={frameHeight}
         scale={scale}
         {...rest}
      />
   );
};

interface StyleProps {
   sprite: MonsterSprite;
}

const StyledBox = styled(Box, {
   shouldForwardProp: (prop) =>
      !['sprite', 'scale', 'framesCount', 'framesWidth', 'framesHeight'].includes(prop.toString()),
})<StyleProps & { framesCount: number; framesWidth: number; framesHeight: number; scale: number }>(
   ({ scale, sprite, framesCount, framesWidth, framesHeight }) => {
      return {
         width: framesWidth * scale,
         height: framesHeight * scale,
         background: `url('/assets/monsters/${sprite}.png') left center`,
         backgroundSize: `${framesWidth * framesCount * scale}px`,
         backgroundPositionX: framesWidth * scale,
         backgroundPositionY: 0,
         imageRendering: 'pixelated',
      };
   },
);
