import {ChannelId, ChannelsMap, ChannelToDraw} from '@/types/@bodyGraph';
import {channelsByGateIds} from '@/modules/bodygraph/static/allPosibleLines';
import {designChannelColor, personalityChannelColor} from '@/modules/bodygraph/static/colors';
import {getVerticesForLine} from '@/modules/bodygraph/components/getVerticesForLine';

export const prepareChannelsToDraw = (
  channels: ChannelsMap,
  type: 'design' | 'personality',
  designChannels?: ChannelToDraw[],
) => {
  return (Object.keys(channels) as ChannelId[]).map(channelId => {
    const channelFromResponse = channels[channelId];
    const {gate, state} = channelFromResponse;
    const {start, end, transit1, transit2} = channelsByGateIds[channelId];

    const channel: ChannelToDraw = {
      channelId,
      vertices: [],
      halfLength: false,
      isDashed: false,
      color: type === 'design' ? designChannelColor : personalityChannelColor,
    };

    if (state === 'active') {
      channel.vertices = getVerticesForLine({start, end, transit1, transit2});
    }

    if (gate && state === 'half-active') {
      const [channelStart, channelEnd] = (channelId as ChannelId).split('-').map(channelIdString => +channelIdString);
      channel.halfLength = true;
      if (+gate === channelStart) {
        channel.vertices = getVerticesForLine({start, end, transit1, transit2});
      }
      if (+gate === channelEnd) {
        channel.vertices = getVerticesForLine({start: end, transit1: transit2, transit2: transit1, end: start});
      }
    }
    if (designChannels && type === 'personality') {
      const personalityChannelVertices = channel.vertices;
      const sameChannelInDesignChannels = designChannels.find(designChannel => {
        return (
          designChannel.vertices[0] === personalityChannelVertices[0] &&
          designChannel.vertices.slice(-1)[0] === personalityChannelVertices.slice(-1)[0]
        );
      });
      if (sameChannelInDesignChannels) {
        console.log('DASHED', channelId);
        sameChannelInDesignChannels.isDashed = true;
        return null;
      }
    }
    return channel;
  });
};
