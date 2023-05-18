import React, {useEffect, useRef, useState} from 'react';
import BodyGraphGrid from './components/BodyGraphGrid';
import SvgCanvas from './components/SvgCanvas';
import JsCanvas from '@/modules/body-graph/components/JSCanvas';
import {allPossibleLines} from '@/modules/body-graph/static/allPosibleLines';
import {allPointsCoords, pointsUnion} from '@/modules/body-graph/static/allPointsCoords';
import PolyLine from '@/modules/body-graph/components/lines/PolyLine';

export type AllGatesCoords = {
  [key: number]: {
    x: number;
    y: number;
  };
};
export const ActiveGatesContext = React.createContext<number[]>([]);

const BodyGraph = () => {
  const [activeGates, setActiveGates] = useState<number[]>([]);
  const bodyGraphGridRef: React.RefObject<HTMLDivElement | null> = useRef(null);
  const allLines = allPossibleLines.map(({start, end, transit1, transit2}) => {
    const pointIds = [start, transit1, transit2, end].filter(pointId => pointId) as Array<pointsUnion>;
    const pointsCoords = pointIds.map(pointId => allPointsCoords[pointId as pointsUnion]);
    return <PolyLine key={`${start}-${transit1 || ''}-${transit2 || ''}-${end}`} pointsCoords={pointsCoords} />;
  });

  // useEffect(() => {
  //   if (!bodyGraphGridRef.current) return;
  //   const svgXOffset = bodyGraphGridRef.current.getBoundingClientRect().x
  //   setAllGatesCoords(getAllGatesCoords(svgXOffset));
  // }, [width]);

  return (
    <ActiveGatesContext.Provider value={activeGates}>
      <BodyGraphGrid ref={bodyGraphGridRef}>
        {/*<SvgCanvas*/}
        {/*  activeGates={activeGates}*/}
        {/*/>*/}
        <JsCanvas />
      </BodyGraphGrid>
    </ActiveGatesContext.Provider>
  );
};

export default BodyGraph;
