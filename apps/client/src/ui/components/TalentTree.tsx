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

const InnerFlow = observer(() => {
   const { t } = useTranslation();
   const { talentsMenuStore } = useStore();
   const [nodes, , onNodesChange] = useNodesState(initialNodes);
   const [edges, , onEdgesChange] = useEdgesState(initialEdges);

   return (
      <Tooltip
         followCursor
         TransitionProps={{ timeout: 0 }}
         arrow={false}
         open={talentsMenuStore.tooltipOpened}
         title={
            <>
               <Typography fontWeight="bold" lineHeight={1.5} variant="overline">
                  {t(talentsMenuStore.hoveredTalentData.name)}
               </Typography>
               <Typography
                  dangerouslySetInnerHTML={{
                     __html: talentsMenuStore.hoveredTalentStatistics
                        .map(([statistic, value]) => `${t(`${statistic}_value`, { value })}`)
                        .join('<br />'),
                  }}
                  sx={{ mt: 0.5 }}
                  variant="body2"
               />
               {talentsMenuStore.hoveredTalentData.description !== undefined && (
                  <Typography color="gray" fontStyle="italic" sx={{ mt: 0.5 }} variant="body2">
                     {t(
                        talentsMenuStore.hoveredTalentData.description,
                        talentsMenuStore.hoveredTalentData.options,
                     )}
                  </Typography>
               )}
            </>
         }
      >
         <ReactFlow
            fitView
            panOnDrag
            edgeTypes={edgeTypes}
            edges={edges}
            fitViewOptions={{
               duration: 0,
            }}
            nodeTypes={nodeTypes}
            nodes={nodes}
            nodesDraggable={false}
            proOptions={{ hideAttribution: true }}
            zoomOnDoubleClick={false}
            onEdgesChange={onEdgesChange}
            onNodeClick={(_, node) => talentsMenuStore.toggleNode(+node.id)}
            onNodesChange={onNodesChange}
         />
      </Tooltip>
   );
});

const FlowWrapper = memo(() => (
   <ReactFlowProvider>
      <InnerFlow />
   </ReactFlowProvider>
));

FlowWrapper.displayName = 'FlowWrapper';

export default FlowWrapper;
