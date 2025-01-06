import type { Edge, Node } from 'reactflow';
import type { Talent } from 'shared/src/data/talents';

import { TalentIcon } from '../ui/components/TalentIcon';

export const initialEdges: Edge[] = [];

export const makeNode = (
   id: number,
   edges: number[],
   x: number,
   y: number,
   type: Talent['type'],
): Node => {
   edges.forEach((target) => {
      initialEdges.push({
         id: `${id}-${target}`,
         source: id.toString(),
         target: target.toString(),
         type: 'custom-edge',
      });
   });

   return {
      id: id.toString(),
      position: { x, y },
      data: {
         label: (
            <TalentIcon
               id={id.toString()}
               sx={({ palette }) => ({ color: palette.talents.color.normal })}
            />
         ),
         type,
      },
      connectable: false,
      draggable: false,
      type: 'custom-node',
   };
};
