import { styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Handle, NodeProps, Position } from 'reactflow';
import { useStore } from '../../store';

export const CustomNode = observer(({ id, data, selected, ...rest }: NodeProps) => {
   const { talentsMenuStore } = useStore();

   return (
      <>
         <StyledNode
            id={id}
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
   hovered: boolean;
}

const StyledNode = styled('div')<StyleProps>(({ theme, hovered, data: { type } }) => () => ({
   width: 40,
   height: 40,
   maxWidth: 40,
   maxHeight: 40,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   border: hovered
      ? `2px solid ${theme.palette.talents.color.hover}`
      : `1px solid ${theme.palette.talents.color.normal}`,
   backgroundColor: hovered
      ? theme.palette.talents.background.hover
      : theme.palette.talents.background.normal,
   color: hovered ? theme.palette.talents.color.hover : theme.palette.talents.color.normal,
   fontWeight: hovered ? 'bold' : 'normal',
   borderRadius: type === 'large' ? '0%' : '100%',
   boxSizing: 'border-box',
}));
