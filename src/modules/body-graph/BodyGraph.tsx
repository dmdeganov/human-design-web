import React, {useEffect, useRef, useState} from 'react';
import BodyGraphGrid from './components/BodyGraphGrid';
import JsCanvas from "@/modules/body-graph/components/JSCanvas";

export type AllGatesCoords = {
  [key: number]: {
    x: number;
    y: number;
  };
};
export const ActiveGatesContext = React.createContext<number[]>([]);

const BodyGraph = () => {
  const [activeGates, setActiveGates] = useState<number[]>([]);

  return (
    <ActiveGatesContext.Provider value={activeGates}>
      <BodyGraphGrid>
        <JsCanvas/>
      </BodyGraphGrid>
    </ActiveGatesContext.Provider>
  );
};

export default BodyGraph;
