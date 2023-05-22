import React, {useEffect, useRef, useState} from 'react';
import BodyGraphGrid from './components/BodyGraphGrid';
import JsCanvas from '@/modules/body-graph/components/JSCanvas';
import {ChannelsMap, Channel, ChannelId, ChannelWithId} from '@/types/@bodyGraph';

export type AllGatesCoords = {
  [key: number]: {
    x: number;
    y: number;
  };
};
export const ActiveGatesContext = React.createContext<number[]>([]);

const BodyGraph = ({channels}: {channels: ChannelsMap | null}) => {
  const [activeGates, setActiveGates] = useState<number[]>([]);
  const [activeChannels, setActiveChannels] = useState<Array<ChannelWithId>>([]);

  useEffect(() => {
    if (channels) {
      const channelsToSet = Object.keys(channels).map(channelId => ({
        id: channelId as ChannelId,
        state: channels[channelId as ChannelId].state,
        gate: channels[channelId as ChannelId].gate,
      }));
      setActiveChannels(channelsToSet);
    }
  }, [channels]);

  return (
    <ActiveGatesContext.Provider value={activeGates}>
      {channels && (
        <BodyGraphGrid>
          <JsCanvas activeChannels={activeChannels} />
        </BodyGraphGrid>
      )}
    </ActiveGatesContext.Provider>
  );
};

export default BodyGraph;
