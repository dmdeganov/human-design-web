import {axios} from '@/appConfig';
import {ParamsToGetBodyGraph} from '@/types/@onboarding';
import {formatDate} from '@/utils';
import {BodyGraphDesignResponse} from "@/types/@bodyGraph";

export const fetchBodyGraph = async (params: ParamsToGetBodyGraph) => {
  const response = await axios.get('getdesign.php', {
    params: {...params, date: formatDate(params.date)},
  });
  const {
    data: {design},
  } = response;
  return design as BodyGraphDesignResponse;
};

