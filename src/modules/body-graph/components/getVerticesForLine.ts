import {Line} from "@/types/@bodyGraph";
import {allPointsCoords, pointsUnion} from "@/modules/body-graph/static/allPointsCoords";

export const getVerticesForLine = ({start, end, transit1, transit2} : Line) => {
  const pointIds = [start, transit1, transit2, end].filter(pointId => pointId) as Array<pointsUnion>;
  return pointIds.map(pointId => allPointsCoords[pointId as pointsUnion]);
};
