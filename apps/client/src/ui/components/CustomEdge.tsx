import { useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { EdgeProps, getStraightPath, useStore as useReactflowStore } from 'reactflow';
import { useStore } from '../../store';
import { getEdgeParams } from '../../utils/graph';

export const CustomEdge = observer(({ id, source, target, style }: EdgeProps) => {
   const theme = useTheme();
   const { talentsMenuStore } = useStore();
   const sourceNode = useReactflowStore(
      useCallback((store) => store.nodeInternals.get(source), [source]),
   );
   const targetNode = useReactflowStore(
      useCallback((store) => store.nodeInternals.get(target), [target]),
   );

   if (sourceNode === undefined || targetNode === undefined) {
      return null;
   }

   const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

   const [edgePath] = getStraightPath({
      sourceX: sx,
      sourceY: sy,
      targetX: tx,
      targetY: ty,
   });

   return (
      <path
         id={id}
         className="react-flow__edge-path"
         d={edgePath}
         style={{
            ...style,
            stroke:
               talentsMenuStore.talentsMap[source] && talentsMenuStore.talentsMap[target]
                  ? theme.palette.talents.color.hover
                  : theme.palette.talents.color.normal,
         }}
      />
   );
});
