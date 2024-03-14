import { Theme, keyframes, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { useStore } from '../../store';

export const CustomNode = observer(({ data, selected, ...rest }: NodeProps) => {
   const ref = useRef<HTMLDivElement>(null);
   const { talentsMenuStore } = useStore();
   const id = +rest.id;

   useEffect(() => {
      if (ref.current) {
         ref.current.style.animation = 'none';
         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
         ref.current.offsetHeight;
         ref.current.style.animation = '';
      }
   }, [talentsMenuStore.talents]);

   return (
      <>
         <StyledNode
            ref={ref}
            adjacent={talentsMenuStore.shouldBlink(id)}
            selected={selected}
            hovered={talentsMenuStore.hoveredTalent === id || talentsMenuStore.talentsMap[id]}
            onMouseEnter={() => {
               if (talentsMenuStore.hoveredTalent !== id) {
                  talentsMenuStore.setHoveredTalent(id);
               }
            }}
            onMouseLeave={() => {
               talentsMenuStore.setHoveredTalent(null);
            }}
            data={data}
            {...rest}
         >
            <Handle type="target" position={Position.Left} />
            {data.label}
            <Handle type="source" position={Position.Right} />
         </StyledNode>
      </>
   );
});

interface StyleProps extends NodeProps {
   adjacent: boolean;
   hovered: boolean;
}

const blink = (theme: Theme) => keyframes`
   50% {
      border-color: ${theme.palette.text.secondary};
   }
`;

const StyledNode = styled('div')<StyleProps>(
   ({ theme, adjacent, hovered, data: { type } }) =>
      () => {
         const borderHovered = hovered
            ? `2px solid ${theme.palette.talents.color.hover}`
            : `1px solid ${theme.palette.talents.color.normal}`;

         const blinkKeyframes = blink(theme);

         return {
            width: 40,
            height: 40,
            maxWidth: 40,
            maxHeight: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: adjacent ? '2px solid transparent' : borderHovered,
            backgroundColor: hovered
               ? theme.palette.talents.background.hover
               : theme.palette.talents.background.normal,
            color: hovered ? theme.palette.talents.color.hover : theme.palette.talents.color.normal,
            fontWeight: hovered ? 'bold' : 'normal',
            borderRadius: type === 'large' ? '0%' : '100%',
            boxSizing: 'border-box',
            animation: adjacent ? `${blinkKeyframes} 1s infinite` : 'none',
            opacity: !adjacent && !hovered ? 0.5 : 1,
         };
      },
);
