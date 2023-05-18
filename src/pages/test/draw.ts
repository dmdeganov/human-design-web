// Math
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// Math
export const drawLine = () => {
  function getVectorFromTwoPoints(point1, point2) {
    return {
      x: point2.x - point1.x,
      y: point2.y - point1.y,
    };
  }

  function getDistanceBetweenPoints(point1, point2) {
    const x = point1.x - point2.x;
    const y = point1.y - point2.y;

    return Math.sqrt(x * x + y * y);
  }
  // Animation constants

  const FRAME_DURATION = 1000 / 60; // 60fps frame duration ~16.66ms
  const getTime = typeof performance === 'function' ? performance.now : Date.now;

  // Global requestAnimationFrame ID so we can cancel it when user clicks on "Draw again"
  let rafID;

  // Function to animate line drawing
  function drawLine(startPoint, endPoint, drawingSpeed = 5, onAnimationEnd, startingLength = 0) {
    let lastUpdate = getTime();

    // Set initial state
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

      // Store requestAnimationFrame ID so we can cancel it
      rafID = requestAnimationFrame(animate);
    };

    // Start animation
    animate();
  }

  function drawPolygon(vertices, drawingSpeed = 5, onAnimationEnd, startingLength = 0, startingPointIndex = 0) {
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
      drawingSpeed,
      startingLength => {
        const newIndex = startingPointIndex + 1;

        drawPolygon(vertices, drawingSpeed, onAnimationEnd, startingLength, newIndex);
      },
      startingLength,
    );
  }

  // Demo

  const vertices = [
    {x: 50, y: 50},
    {x: 450, y: 50},
    {x: 250, y: 450},
  ];

  const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';

  ctx.lineCap = 'round';
  ctx.lineWidth = 20;

  function draw() {
    // Cancel previous animation
    // cancelAnimationFrame(rafID);
    // Clear canvas

    // Draw polygon
    drawPolygon(vertices, 5, () => console.log('done'));
  }

  draw();
};
