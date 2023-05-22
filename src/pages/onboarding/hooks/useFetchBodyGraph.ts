import {useQuery} from 'react-query';
import {fetchBodyGraph} from '../api';
import {ParamsToGetBodyGraph} from '@/types/@onboarding';

export const useFetchBodyGraph = (params: ParamsToGetBodyGraph, ) => {
  return useQuery({
    queryFn: () => fetchBodyGraph(params),
    queryKey: ['bodyGraph'],
  });
};
