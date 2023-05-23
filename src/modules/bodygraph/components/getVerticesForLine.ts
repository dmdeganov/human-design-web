import {Line, Point} from '@/types/@bodyGraph';
import {allPointsCoords, pointsUnion} from '@/modules/bodygraph/static/allPointsCoords';

export const getCalcVerticesFn = () => {
  const cache: {[key: string]: Point[]} = {};

  return ({start, transit1, transit2, end}: Line) => {
    const pointIds = [start, transit1, transit2, end].filter(pointId => pointId) as Array<pointsUnion>;
    const cacheKey = pointIds.join('-');
    if (cache[cacheKey]) {
      return cache[cacheKey];
    }
    cache[`${cacheKey}`] = pointIds.map(pointId => allPointsCoords[pointId as pointsUnion]);
    return cache[`${cacheKey}`];
  };
};

export const getVerticesForLine = getCalcVerticesFn();
