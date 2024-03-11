import ReactFlow, { ReactFlowProvider, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { initialEdges, initialNodes } from '../../utils/talents';
import { CustomEdge } from './CustomEdge';

const Flow = () => {
   const [nodes, , onNodesChange] = useNodesState(initialNodes);
   const [edges, , onEdgesChange] = useEdgesState(initialEdges);

   return (
      <ReactFlow
         fitView
         nodes={nodes}
         edges={edges}
         onNodesChange={onNodesChange}
         onEdgesChange={onEdgesChange}
         proOptions={{ hideAttribution: true }}
         edgeTypes={{ 'custom-edge': CustomEdge }}
      />
   );
};

export default () => (
   <ReactFlowProvider>
      <Flow />
   </ReactFlowProvider>
);
