import React, {useEffect} from 'react';
import {allPossibleLines} from '@/modules/body-graph/static/allPosibleLines';
import {allPointsCoords, pointsUnion} from '@/modules/body-graph/static/allPointsCoords';
import {PolyLineProps} from '@/types/@bodyGraph';
import {getDrawAnimatedLine} from '@/modules/body-graph/utils/drawAnimtedLine';

const JsCanvas = () => {
  const baseLines = allPossibleLines.map(({start, end, transit1, transit2}) => {
    const pointIds = [start, transit1, transit2, end].filter(pointId => pointId) as Array<pointsUnion>;
    const pointsCoords = pointIds.map(pointId => allPointsCoords[pointId as pointsUnion]);
    return {
      key: `${start}-${transit1 || ''}-${transit2 || ''}-${end}`,
      pointsCoords: pointsCoords,
    };
  });

  useEffect(() => {
    const drawAnimatedLine = getDrawAnimatedLine();
    if (!drawAnimatedLine) return;
    baseLines.forEach(({pointsCoords}: PolyLineProps) => drawAnimatedLine(pointsCoords));
  }, []);

  return <canvas id="bodygraph-js-canvas" width={390} height={580} />;
};

export default JsCanvas;
