import {Point} from '@/types/@bodyGraph';

function getVectorFromTwoPoints(point1: Point, point2: Point) {
  return {
    x: point2.x - point1.x,
    y: point2.y - point1.y,
  };
}

function getDistanceBetweenPoints(point1: Point, point2: Point) {
  const x = point1.x - point2.x;
  const y = point1.y - point2.y;

  return Math.sqrt(x * x + y * y);
}

const getPolyLineLength = (points: Point[]) => {
  return points.reduce((acc, point, index) => {
    const nextPoint = points[index + 1];
    if (nextPoint) {
      return acc + getDistanceBetweenPoints(point, nextPoint);
    } else {
      return acc;
    }
  }, 0);
};

export const getDrawAnimatedLine = () => {
  const canvas = document.getElementById('bodygraph-js-canvas') as HTMLCanvasElement;
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.lineWidth = 4.5;
  // ctx.lineCap = 'round';

  // ctx.lineJoin = 'round';
  ctx.globalAlpha = 1;
  ctx.imageSmoothingEnabled = true;

  const FRAME_DURATION = 1000 / 60; // 60fps frame duration ~16.66ms

  const getTime = Date.now;

  const drawLine: DrawLineFn = (
    startPoint,
    endPoint,
    onAnimationEnd,
    startingLength = 0,
    drawingSpeed = 1,
    color,
    isDashed = false,
  ) => {
    console.log('DrawLineFn', {startPoint, endPoint});
    let lastUpdate = getTime();
    let currentPoint = startPoint;
    const vector = getVectorFromTwoPoints(startPoint, endPoint);
    const startToEndDistance = getDistanceBetweenPoints(startPoint, endPoint);
    const lineStep = drawingSpeed / startToEndDistance;
    const vectorStep = {
      x: vector.x * lineStep,
      y: vector.y * lineStep,
    };
    const dashSegmentLength = 10;
    const dashColors = ['#ca4b77', '#6851df'];

    const dashState = {
      distancePassed: 0,
      isFirstColor: true,
    };

    const animate = () => {
      const now = getTime();
      const delta = (now - lastUpdate) / FRAME_DURATION;

      const deltaVector = {
        x: vectorStep.x * delta,
        y: vectorStep.y * delta,
      };
      // console.log({delta, deltaVector});

      // Add starting length if any
      if (startingLength) {
        const startingLengthFactor = startingLength / startToEndDistance;

        deltaVector.x += vector.x * startingLengthFactor;
        deltaVector.y += vector.y * startingLengthFactor;

        // We've drawn it once, we don't want to draw it again
        startingLength = 0;
      }

      // Set next point
      let nextPoint = {
        x: currentPoint.x + deltaVector.x,
        y: currentPoint.y + deltaVector.y,
      };

      let newStartingLength = 0;
      let isFinished = false;

      const startToNextPointDistance = getDistanceBetweenPoints(startPoint, nextPoint);

      // The next point is past the end point
      if (startToNextPointDistance >= startToEndDistance) {
        newStartingLength = startToNextPointDistance - startToEndDistance;
        isFinished = true;
        nextPoint = endPoint;
      }

      // Draw line segment
      if (color && !isDashed) {
        ctx.strokeStyle = color;
      }
      if (isDashed) {
        ctx.strokeStyle = dashState.isFirstColor ? dashColors[0] : dashColors[1];
      }

      ctx.beginPath();
      ctx.moveTo(currentPoint.x, currentPoint.y);
      ctx.lineTo(nextPoint.x, nextPoint.y);
      ctx.stroke();
      if(isDashed){
        dashState.distancePassed += drawingSpeed;
        if (dashState.distancePassed >= dashSegmentLength) {
          dashState.distancePassed = 0;
          dashState.isFirstColor = !dashState.isFirstColor;
        }
      }


      if (isFinished) {
        if (onAnimationEnd) {
          onAnimationEnd(newStartingLength);
        }
        return;
      }

      // Move current point to the end of the drawn segment
      currentPoint = nextPoint;

      // Update last updated time
      lastUpdate = now;

      requestAnimationFrame(animate);
    };
    // Start animation
    animate();
  };

  const drawPolyLine: DrawPolygonFn = (
    vertices,
    onAnimationEnd,
    drawingSpeed = 3,
    startingLength = 0,
    startingPointIndex = 0,
    color,
    isDashed,
  ) => {
    const start = vertices[startingPointIndex];
    const end = vertices[startingPointIndex + 1];

    if (startingPointIndex + 1 >= vertices.length) {
      if (onAnimationEnd) {
        onAnimationEnd();
      }
      return;
    }
    drawLine(
      start,
      end,
      (startingLength?: number) => {
        const newIndex = startingPointIndex + 1;
        drawPolyLine(vertices, onAnimationEnd, drawingSpeed, startingLength, newIndex, color, isDashed);
      },
      startingLength,
      drawingSpeed,
      color,
    );
  };

  return (vertices: Array<Point>, color = '#444a48', isDashed?: boolean, halfLength?: boolean) => {
    if (halfLength) {
      const halfLineLength = getPolyLineLength(vertices) / 2.1;
      const {lastVertice: indexOflastVisibleVertice, distancePassed: distancePassedBeforeLastVisibleVertice} =
        vertices.reduce(
          (acc: {distancePassed: number; lastVertice: null | number}, vertice, index) => {
            if (acc.lastVertice || acc.lastVertice === 0) return acc;
            const distanceToNextPoint = getDistanceBetweenPoints(vertice, vertices[index + 1]);
            if (acc.distancePassed + distanceToNextPoint < halfLineLength) {
              return {...acc, distancePassed: acc.distancePassed + distanceToNextPoint};
            }
            return {
              ...acc,
              lastVertice: index,
            };
          },
          {distancePassed: 0, lastVertice: null},
        );
      const remainingDistance = halfLineLength - distancePassedBeforeLastVisibleVertice;
      const {x: x1, y: y1} = vertices[indexOflastVisibleVertice!];
      const {x: x2, y: y2} = vertices[indexOflastVisibleVertice! + 1];
      const hypotenuse = getDistanceBetweenPoints({x: x1, y: y1}, {x: x2, y: y2});
      const sinus = Math.abs(x1 - x2) / hypotenuse;
      const cosinus = Math.abs(y1 - y2) / hypotenuse;
      const xMedium = x1 + (x2 > x1 ? sinus * remainingDistance : -1 * sinus * remainingDistance);
      const yMedium = y1 + (y2 > y1 ? cosinus * remainingDistance : -1 * cosinus * remainingDistance);
      // const yMedium =  y1 cosinus * remainingDistance ;
      const newVertices = [...vertices.slice(0, indexOflastVisibleVertice! + 1), {x: xMedium, y: yMedium}];
      drawPolyLine(newVertices, () => {}, 3, undefined, undefined, color, isDashed);
    } else {
      drawPolyLine(vertices, () => {}, 3, undefined, undefined, color, isDashed);
    }
  };
};

type DrawPolygonFn = (
  vertices: Array<Point>,
  onAnimationEnd: (startLength?: number) => void,
  drawingSpeed?: number,
  startingLength?: number,
  startingPointIndex?: number,
  color?: string,
  isDashed?: boolean,
) => void;

type DrawLineFn = (
  startPoint: Point,
  endPoint: Point,
  onAnimationEnd: (startLength?: number) => void,
  startingLength: number,
  drawingSpeed?: number,
  color?: string,
  isDashed?: boolean,
) => void;
