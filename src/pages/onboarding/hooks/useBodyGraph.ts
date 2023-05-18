import {useQuery} from 'react-query';
import {fetchBodyGraph} from '../api';
import {ParamsToGetBodyGraph} from '@/types/@onboarding';

export const useBodyGraph = (params: ParamsToGetBodyGraph, ) => {
  return useQuery({
    queryFn: () => fetchBodyGraph(params),
    queryKey: ['bodyGraph'],
  });
};
