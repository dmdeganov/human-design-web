import styled, {keyframes} from 'styled-components';
import {Point, PolyLineProps} from '@/types/@bodyGraph';

const getDistanceBetweenTwoPoints = (point1: Point, point2: Point): number => {
  return Math.sqrt(Math.pow(Math.abs(point1.x - point2.x), 2) + Math.pow(Math.abs(point1.y - point2.y), 2));
};

const getPolyLineLength = (points: Point[]) => {
  return points.reduce((acc, point, index) => {
    const nextPoint = points[index + 1];
    if (nextPoint) {
      return acc + getDistanceBetweenTwoPoints(point, nextPoint);
    } else {
      return acc;
    }
  }, 0);
};

const PolyLine = styled.polyline.attrs((props: PolyLineProps) => {
  return {
    points: props.pointsCoords.reduce(
      (resultString, point) => resultString.concat(` ${point.x},${point.y}`),
      '' as string,
    ),
  };
})`
  stroke-dasharray: ${(props: PolyLineProps) => getPolyLineLength(props.pointsCoords) || 0};
  stroke-dashoffset: 0;
  stroke: whitesmoke;
  stroke-width: 2;
  animation: ${(props: PolyLineProps) => fillLine(getPolyLineLength(props.pointsCoords))} 2s linear;
`;
const fillLine = (lineLength: number) => keyframes`
  from {
    stroke-dashoffset: ${lineLength};
  }
  to {
    stroke-dashoffset: 0;
  }
`;
export default PolyLine;
