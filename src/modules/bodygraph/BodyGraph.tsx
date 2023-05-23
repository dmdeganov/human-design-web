import React, {useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import BodyGraphGrid from './components/BodyGraphGrid';
import JsCanvas from '@/modules/bodygraph/components/JSCanvas';
import {BodyGraphContextI, Center, ChannelToDraw} from '@/types/@bodyGraph';

export type AllGatesCoords = {
  [key: number]: {
    x: number;
    y: number;
  };
};

export const BodyGraphContext = React.createContext<BodyGraphContextI>({activeGates: [], centers: {}});

interface Props {
  channels: ChannelToDraw[] | null;
  centers: {[key: number]: Center} | null;
  size: 'mob-sm' | 'desk-sm' | 'mob' | 'desk';
  zoomOnMount: boolean;
}

const BodyGraph = ({channels, centers, size, zoomOnMount}: Props) => {
  const bodyGraphRef = useRef(null);

  const [activeGates, setActiveGates] = useState<number[]>([]);

  return channels && centers ? (
    <BodyGraphContext.Provider value={{activeGates, centers}}>
      <CSSTransition in={zoomOnMount} appear={zoomOnMount} nodeRef={bodyGraphRef} timeout={0} classNames="bodygraph-container">
        <div className={`bodygraph-container bodygraph-container--${size}`} ref={bodyGraphRef}>
          <BodyGraphGrid>
            <JsCanvas activeChannels={channels} />
          </BodyGraphGrid>
        </div>
      </CSSTransition>
    </BodyGraphContext.Provider>
  ) : null;
};

export default BodyGraph;
