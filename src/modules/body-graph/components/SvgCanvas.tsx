import React from 'react';
import {allPossibleLines} from '../static/allPosibleLines';
import PolyLine from '@/modules/body-graph/components/lines/PolyLine';
import {allPointsCoords, pointsUnion} from '@/modules/body-graph/static/allPointsCoords';

const SvgCanvas = ({activeGates}: {activeGates: number[]}) => {
  return (
    <svg width="100%" height="100%" className="svg-canvas">
      {allPossibleLines.map(({start, end, transit1, transit2}) => {
        const pointIds = [start, transit1, transit2, end].filter(pointId => pointId) as Array<pointsUnion>;
        const vertices = pointIds.map(pointId => allPointsCoords[pointId as pointsUnion]);
        return <PolyLine key={`${start}-${transit1 || ''}-${transit2 || ''}-${end}`} vertices={vertices} />;
      })}
      {/*{activeGates.map((gateId: number) => {*/}
      {/*  const matchingGateId = findMatchingGate(gateId);*/}
      {/*  if (!matchingGateId) return;*/}
      {/*  return (*/}
      {/*    <ActiveLine*/}
      {/*      key={`${gateId}-${matchingGateId}`}*/}
      {/*      x1={allGatesCoords[gateId].x}*/}
      {/*      y1={allGatesCoords[gateId].y}*/}
      {/*      x2={allGatesCoords[matchingGateId].x}*/}
      {/*      y2={allGatesCoords[matchingGateId].y}*/}
      {/*    />*/}
      {/*  );*/}
      {/*})}*/}
    </svg>
  );
};

export default SvgCanvas;
