import React, {useEffect} from 'react';
import {allPossibleLines} from '@/modules/bodygraph/static/allPosibleLines';
import {ChannelToDraw} from '@/types/@bodyGraph';
import {getDrawAnimatedLine} from '@/modules/bodygraph/utils/drawAnimtedLine';
import {getVerticesForLine} from '@/modules/bodygraph/components/getVerticesForLine';

const baseLines = allPossibleLines.map(line => getVerticesForLine(line));

const JsCanvas = ({activeChannels}: {activeChannels: ChannelToDraw[]}) => {
  useEffect(() => {
    const drawAnimatedLine = getDrawAnimatedLine('base-channels-canvas');
    if (!drawAnimatedLine) return;
    baseLines.forEach(vertices => drawAnimatedLine({vertices}));
  }, []);

  useEffect(() => {
    const drawAnimatedLine = getDrawAnimatedLine('active-channels-canvas');
    if (!activeChannels.length || !drawAnimatedLine) return;
    setTimeout(() => activeChannels.forEach(channelToDraw => drawAnimatedLine(channelToDraw)), 1000);
  }, [activeChannels]);

  return (
    <>
      <canvas id="base-channels-canvas" width={780} height={1160} />
      <canvas id="active-channels-canvas" width={780} height={1160} />
    </>
  );
};

export default JsCanvas;
