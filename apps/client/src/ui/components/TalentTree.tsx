import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { memo } from 'react';
import ReactFlow, { ReactFlowProvider, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { getTalents } from 'shared/src/data/talents';
import { useStore } from '../../store';
import { useTranslation } from '../../types/react-i18next';
import { initialEdges, makeNode } from '../../utils/makeNode';
import { Tooltip } from '../hud/components/Tooltip';
import { CustomEdge } from './CustomEdge';
import { CustomNode } from './CustomNode';

const edgeTypes = {
   'custom-edge': CustomEdge,
};

const nodeTypes = {
   'custom-node': CustomNode,
};

const initialNodes = Object.values(getTalents()).map(({ id, edges, x, y, type }) =>
   makeNode(id, edges, x, y, type),
);

const Flow = observer(() => {
   const { t } = useTranslation();
   const { talentsMenuStore } = useStore();
   const [nodes, , onNodesChange] = useNodesState(initialNodes);
   const [edges, , onEdgesChange] = useEdgesState(initialEdges);

   return (
      <Tooltip
         open={talentsMenuStore.tooltipOpened}
         followCursor
         arrow={false}
         TransitionProps={{ timeout: 0 }}
         title={
            <>
               <Typography variant="overline" lineHeight={1.5}>
                  {t(talentsMenuStore.hoveredTalentData.name)}
               </Typography>
               <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {t(
                     talentsMenuStore.hoveredTalentData.description,
                     talentsMenuStore.hoveredTalentData.options,
                  )}
               </Typography>
            </>
         }
      >
         <ReactFlow
            fitView
            fitViewOptions={{
               duration: 0,
            }}
            nodes={nodes}
            edges={edges}
            onNodeClick={(_, node) => talentsMenuStore.toggleNode(+node.id)}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            proOptions={{ hideAttribution: true }}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            zoomOnDoubleClick={false}
            panOnDrag
            nodesDraggable={false}
         />
      </Tooltip>
   );
});

export default memo(() => (
   <ReactFlowProvider>
      <Flow />
   </ReactFlowProvider>
));
