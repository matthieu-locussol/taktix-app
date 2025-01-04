import type { Node, XYPosition } from 'reactflow';

import { Position } from 'reactflow';
import { _assert } from 'shared/src/utils/_assert';

function getNodeIntersection(intersectionNode: Node, targetNode: Node) {
   const {
      width: intersectionNodeWidth,
      height: intersectionNodeHeight,
      positionAbsolute: intersectionNodePosition,
   } = intersectionNode;
   const targetPosition = targetNode.positionAbsolute;

   _assert(intersectionNodeWidth, 'intersectionNodeWidth is required');
   _assert(intersectionNodeHeight, 'intersectionNodeHeight is required');
   _assert(intersectionNodePosition, 'intersectionNodePosition is required');
   _assert(targetPosition, 'targetPosition is required');
   _assert(targetNode.width, 'targetNode.width is required');
   _assert(targetNode.height, 'targetNode.height is required');

   const w = intersectionNodeWidth / 2;
   const h = intersectionNodeHeight / 2;

   const x2 = intersectionNodePosition.x + w;
   const y2 = intersectionNodePosition.y + h;
   const x1 = targetPosition.x + targetNode.width / 2;
   const y1 = targetPosition.y + targetNode.height / 2;

   const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
   const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
   const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
   const xx3 = a * xx1;
   const yy3 = a * yy1;
   const x = w * (xx3 + yy3) + x2;
   const y = h * (-xx3 + yy3) + y2;

   return { x, y };
}

function getEdgePosition(node: Node, intersectionPoint: XYPosition) {
   _assert(node.positionAbsolute, 'node.positionAbsolute is required');
   _assert(node.width, 'node.width is required');
   _assert(node.height, 'node.height is required');

   const nx = Math.round(node.positionAbsolute.x);
   const ny = Math.round(node.positionAbsolute.y);
   const px = Math.round(intersectionPoint.x);
   const py = Math.round(intersectionPoint.y);

   if (px <= nx + 1) {
      return Position.Left;
   }
   if (px >= nx + node.width - 1) {
      return Position.Right;
   }
   if (py <= ny + 1) {
      return Position.Top;
   }
   if (py >= node.positionAbsolute.y + node.height - 1) {
      return Position.Bottom;
   }

   return Position.Top;
}

export function getEdgeParams(source: Node, target: Node) {
   const sourceIntersectionPoint = getNodeIntersection(source, target);
   const targetIntersectionPoint = getNodeIntersection(target, source);

   const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
   const targetPos = getEdgePosition(target, targetIntersectionPoint);

   return {
      sx: sourceIntersectionPoint.x,
      sy: sourceIntersectionPoint.y,
      tx: targetIntersectionPoint.x,
      ty: targetIntersectionPoint.y,
      sourcePos,
      targetPos,
   };
}
