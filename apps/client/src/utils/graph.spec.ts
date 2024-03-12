import { Node, Position } from 'reactflow';
import { describe, expect, it } from 'vitest';
import { getEdgeParams } from './graph';

const createMockNode = (overrides = {}): Node => ({
   id: 'node',
   type: 'default',
   position: { x: 0, y: 0 },
   positionAbsolute: { x: 100, y: 100 },
   data: {},
   width: 100,
   height: 100,
   ...overrides,
});

describe('getEdgeParams function', () => {
   it('calculates correct edge parameters for nodes positioned horizontally apart', () => {
      const sourceNode = createMockNode({ positionAbsolute: { x: 100, y: 100 } });
      const targetNode = createMockNode({ positionAbsolute: { x: 300, y: 100 } });

      const result = getEdgeParams(sourceNode, targetNode);

      expect(result).toMatchObject({
         sx: 200,
         sy: 150,
         tx: 300,
         ty: 150,
         sourcePos: Position.Right,
         targetPos: Position.Left,
      });
   });

   it('calculates correct edge parameters for overlapping nodes', () => {
      const sourceNode = createMockNode({
         positionAbsolute: { x: 150, y: 150 },
         width: 50,
         height: 50,
      });
      const targetNode = createMockNode({
         positionAbsolute: { x: 100, y: 100 },
         width: 200,
         height: 200,
      });

      const result = getEdgeParams(sourceNode, targetNode);

      expect(result).toMatchObject({
         sx: 200,
         sy: 200,
         tx: 100,
         ty: 100,
         sourcePos: Position.Right,
         targetPos: Position.Left,
      });
   });

   it('calculates correct edge parameters for nodes positioned vertically apart', () => {
      const sourceNode = createMockNode({ positionAbsolute: { x: 100, y: 100 } });
      const targetNode = createMockNode({ positionAbsolute: { x: 100, y: 300 } });

      const result = getEdgeParams(sourceNode, targetNode);

      expect(result).toMatchObject({
         sx: 150,
         sy: 200,
         tx: 150,
         ty: 300,
         sourcePos: Position.Bottom,
         targetPos: Position.Top,
      });
   });

   it('calculates correct edge parameters for nodes positioned diagonally apart', () => {
      const sourceNode = createMockNode({ positionAbsolute: { x: 100, y: 100 } });
      const targetNode = createMockNode({ positionAbsolute: { x: 300, y: 300 } });

      const result = getEdgeParams(sourceNode, targetNode);

      expect(result).toMatchObject({
         sx: 200,
         sy: 200,
         tx: 300,
         ty: 300,
         sourcePos: Position.Right,
         targetPos: Position.Left,
      });
   });
});
