import React, {useEffect} from 'react';
import {allPossibleLines, channelsByGateIds} from '@/modules/body-graph/static/allPosibleLines';
import {ChannelId, ChannelWithId, Point} from '@/types/@bodyGraph';
import {getDrawAnimatedLine} from '@/modules/body-graph/utils/drawAnimtedLine';
import {getVerticesForLine} from '@/modules/body-graph/components/getVerticesForLine';

const baseLines = allPossibleLines.map(line => getVerticesForLine(line));

const JsCanvas = ({activeChannels}: {activeChannels: Array<ChannelWithId>}) => {
  useEffect(() => {
    const drawAnimatedLine = getDrawAnimatedLine();
    if (!drawAnimatedLine) return;
    baseLines.forEach(vertices => drawAnimatedLine(vertices));
  }, []);

  useEffect(() => {
    if (!activeChannels.length) return;
    setTimeout(
      () =>
        activeChannels.forEach(({id, state, gate}) => {
          const {start, end, transit1, transit2} = channelsByGateIds[id];

          if (!gate && state === 'active') {
            const vertices = getVerticesForLine({start, end, transit1, transit2});
            const drawAnimatedLine = getDrawAnimatedLine();
            if (!drawAnimatedLine) return;
            drawAnimatedLine(vertices, '#6851df');
            return;
          }
          if (gate && state === 'half-active') {
            const [channelStart, channelEnd] = (id as ChannelId).split('-').map(channelIdString => +channelIdString);
            const drawAnimatedLine = getDrawAnimatedLine();
            if (!drawAnimatedLine) return;
            if (+gate === channelStart) {
              const vertices = getVerticesForLine({start, end, transit1, transit2});
              drawAnimatedLine(vertices, '#6851df', false, true);
              return;
            }
            if (+gate === channelEnd) {
              const vertices = getVerticesForLine({end, start, transit2, transit1});
              drawAnimatedLine(vertices, '#ca4b77', false, true);
              return;
            }
          }
        }),
      1000,
    );
  }, [activeChannels]);

  return <canvas id="bodygraph-js-canvas" width={780} height={1160} />;
};

export default JsCanvas;
