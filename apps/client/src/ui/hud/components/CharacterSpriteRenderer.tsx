import { keyframes, styled } from '@mui/material';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { CharacterSprite } from 'shared/src/data/charactersSprites';
import { CHARACTER_HEIGHT, CHARACTER_WIDTH } from '../../../game/Scene';

interface CharacterSpriteRendererProps
   extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
      StyleProps {}

export const CharacterSpriteRenderer = ({ sprite, ...rest }: CharacterSpriteRendererProps) => {
   return <StyledImg sprite={sprite} alt={sprite} {...rest} />;
};

interface StyleProps {
   sprite: CharacterSprite;
   scale: number;
}

const play = (scale: number) => keyframes`
   100% { background-position-x: ${CHARACTER_WIDTH * 4 * scale}px; }
`;

const StyledImg = styled('div')<StyleProps>(({ scale, sprite }) => {
   const playKeyframes = play(scale);

   return {
      width: CHARACTER_WIDTH * scale,
      height: CHARACTER_HEIGHT * scale,
      background: `url('/assets/characters/${sprite}.png') left center`,
      backgroundSize: `${CHARACTER_WIDTH * 4 * scale}px`,
      backgroundPositionY: 0,
      animation: `${playKeyframes} 0.8s steps(4) infinite`,
      imageRendering: 'pixelated',
   };
});
