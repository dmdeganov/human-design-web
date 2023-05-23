import {Center} from '@/types/@bodyGraph';

export const prepareCenters = (activeCenters: {[key: number]: Center}, inActiveCenters: {[key: number]: Center}) => {
  const result: {[key: number]: Center} = {};

  Object.keys(activeCenters).forEach(centerId => {
    activeCenters[+centerId]['isActive'] = true;
    result[activeCenters[+centerId].id] = activeCenters[+centerId];
  });
  Object.keys(inActiveCenters).forEach(centerId => {
    inActiveCenters[+centerId]['isActive'] = false;
    result[inActiveCenters[+centerId].id] = inActiveCenters[+centerId];
  });
  return result;
};
