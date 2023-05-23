import {ChannelToDraw, BodyGraphResponse} from '@/types/@bodyGraph';
import {prepareChannelsToDraw} from '@/modules/bodygraph/utils/parseBodyGrpahResponse/prepareChannelsToDraw';
import {prepareCenters} from '@/modules/bodygraph/utils/parseBodyGrpahResponse/prepareCenters';

export const parseBodyGraphResponse = ({design, personality, active_centres, inactive_centres}: BodyGraphResponse) => {
  const designChannels = prepareChannelsToDraw(design.channels, 'design') as ChannelToDraw[];
  const personalityChannels = prepareChannelsToDraw(personality.channels, 'personality', designChannels);
  const centers = prepareCenters(active_centres, inactive_centres);
  return {channels: [...designChannels, ...personalityChannels.filter(channel => !!channel)] as ChannelToDraw[], centers};
};
