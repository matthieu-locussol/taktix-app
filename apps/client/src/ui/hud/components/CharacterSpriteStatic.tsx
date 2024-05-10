import { Box, BoxProps, styled } from '@mui/material';
import { CharacterSprite } from 'shared/src/data/charactersSprites';
import { CHARACTER_HEIGHT, CHARACTER_WIDTH } from '../../../game/Scene';

interface CharacterSpriteStaticProps extends BoxProps, StyleProps {}

export const CharacterSpriteStatic = ({ sprite, ...rest }: CharacterSpriteStaticProps) => {
   return <StyledBox sprite={sprite} {...rest} />;
};

interface StyleProps {
   sprite: CharacterSprite;
   scale: number;
}

const StyledBox = styled(Box)<StyleProps>(({ scale, sprite }) => {
   return {
      width: CHARACTER_WIDTH * scale,
      height: CHARACTER_HEIGHT * scale,
      background: `url('/assets/characters/${sprite}.png') left center`,
      backgroundSize: `${CHARACTER_WIDTH * 4 * scale}px`,
      backgroundPositionX: CHARACTER_WIDTH * scale,
      backgroundPositionY: 0,
      imageRendering: 'pixelated',
   };
});
