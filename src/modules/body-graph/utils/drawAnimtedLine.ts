import {Point} from '@/types/@bodyGraph';

export const getDrawAnimatedLine = () => {
  const canvas = document.getElementById('bodygraph-js-canvas') as HTMLCanvasElement;
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2
  ctx.lineCap = "round";
  ctx.lineJoin = 'round'
  ctx.globalAlpha = 1
  ctx.translate(0.5, 0.5);


  // ctx.lineCap = 'round';
  // ctx.lineWidth = 2.3;

  const FRAME_DURATION = 1000 / 60; // 60fps frame duration ~16.66ms
  const getTime =  Date.now;
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

  const drawLine: DrawLineFn = (startPoint, endPoint, onAnimationEnd, startingLength = 0, drawingSpeed = 3) => {
    let lastUpdate = getTime();
    let currentPoint = startPoint;
    const vector = getVectorFromTwoPoints(startPoint, endPoint);
    const startToEndDistance = getDistanceBetweenPoints(startPoint, endPoint);

    const lineStep = drawingSpeed / startToEndDistance;
    const vectorStep = {
      x: vector.x * lineStep,
      y: vector.y * lineStep,
    };

    const animate = () => {
      const now = getTime();
      const delta = (now - lastUpdate) / FRAME_DURATION;

      const deltaVector = {
        x: vectorStep.x * delta,
        y: vectorStep.y * delta,
      };

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
      ctx.beginPath();
      ctx.moveTo(currentPoint.x, currentPoint.y);
      ctx.lineTo(nextPoint.x, nextPoint.y);
      ctx.stroke();

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

  const drawPolygon: DrawPolygonFn = (
    vertices,
    onAnimationEnd,
    drawingSpeed = 3,
    startingLength = 0,
    startingPointIndex = 0,
    randomPropToBreakLines = false,
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
        drawPolygon(vertices, onAnimationEnd, drawingSpeed, startingLength, newIndex);
      },
      startingLength,
      drawingSpeed,
    );
  };

  return (vertices: Array<Point>) => {
    drawPolygon(vertices, () => console.log('done'), 3);
  };
};

type DrawPolygonFn = (
  vertices: Array<Point>,
  onAnimationEnd: (startLength?: number) => void,
  drawingSpeed?: number,
  startingLength?: number,
  startingPointIndex?: number,
) => void;

type DrawLineFn = (
  startPoint: Point,
  endPoint: Point,
  onAnimationEnd: (startLength?: number) => void,
  startingLength: number,
  drawingSpeed?: number,
) => void;
