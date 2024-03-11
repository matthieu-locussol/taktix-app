import { useCallback } from 'react';
import { EdgeProps, getStraightPath, useStore } from 'reactflow';
import { getEdgeParams } from '../../utils/graph';

export const CustomEdge = ({ id, source, target, style }: EdgeProps) => {
   const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
   const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

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

   return <path id={id} className="react-flow__edge-path" d={edgePath} style={style} />;
};
