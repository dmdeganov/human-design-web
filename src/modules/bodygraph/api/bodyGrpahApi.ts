import {axios} from '@/appConfig';
import {ParamsToGetBodyGraph} from '@/types/@onboarding';
import {formatDate} from '@/utils';
import {BodyGraphDesign, BodyGraphResponse, Center} from '@/types/@bodyGraph';

export const fetchBodyGraph = async (params: ParamsToGetBodyGraph) => {
  const response = await axios.get('getdesign.php', {
    params: {...params, date: formatDate(params.date)},
  });
  const {
    data: {design, personality, active_centres, inactive_centres},
  } = response;
  return {design, personality, active_centres, inactive_centres} as BodyGraphResponse;
};
