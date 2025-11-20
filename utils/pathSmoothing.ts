/**
 * Path Smoothing Utilities
 * Implements Catmull-Rom spline smoothing for smooth drawing
 */

export interface Point {
  x: number;
  y: number;
  timestamp?: number;
}

/**
 * Calculate distance between two points
 */
export const distance = (p1: Point, p2: Point): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

/**
 * Catmull-Rom spline interpolation
 * Creates smooth curves through a set of points
 */
export const catmullRomSpline = (
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  t: number
): Point => {
  const t2 = t * t;
  const t3 = t2 * t;

  const x =
    0.5 *
    (2 * p1.x +
      (-p0.x + p2.x) * t +
      (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
      (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);

  const y =
    0.5 *
    (2 * p1.y +
      (-p0.y + p2.y) * t +
      (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
      (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);

  return { x, y };
};

/**
 * Smooth a path using Catmull-Rom splines
 */
export const smoothPath = (points: Point[], segments: number = 10): Point[] => {
  if (points.length < 2) return points;
  if (points.length === 2) return points;

  const smoothed: Point[] = [];

  // Add first point
  smoothed.push(points[0]);

  // Process each segment
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    // Generate intermediate points
    for (let j = 1; j <= segments; j++) {
      const t = j / segments;
      const point = catmullRomSpline(p0, p1, p2, p3, t);
      smoothed.push(point);
    }
  }

  return smoothed;
};

/**
 * Simplify path by removing redundant points (Douglas-Peucker algorithm)
 */
export const simplifyPath = (points: Point[], tolerance: number = 2): Point[] => {
  if (points.length <= 2) return points;

  const perpendicularDistance = (point: Point, lineStart: Point, lineEnd: Point): number => {
    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;
    const mag = Math.sqrt(dx * dx + dy * dy);

    if (mag === 0) return distance(point, lineStart);

    const u = ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / (mag * mag);

    if (u < 0) return distance(point, lineStart);
    if (u > 1) return distance(point, lineEnd);

    const intersectionX = lineStart.x + u * dx;
    const intersectionY = lineStart.y + u * dy;

    return distance(point, { x: intersectionX, y: intersectionY });
  };

  const douglasPeucker = (points: Point[], start: number, end: number): Point[] => {
    if (end - start <= 1) {
      return [points[start], points[end]];
    }

    let maxDistance = 0;
    let maxIndex = start;

    for (let i = start + 1; i < end; i++) {
      const dist = perpendicularDistance(points[i], points[start], points[end]);
      if (dist > maxDistance) {
        maxDistance = dist;
        maxIndex = i;
      }
    }

    if (maxDistance > tolerance) {
      const left = douglasPeucker(points, start, maxIndex);
      const right = douglasPeucker(points, maxIndex, end);
      return [...left.slice(0, -1), ...right];
    }

    return [points[start], points[end]];
  };

  return douglasPeucker(points, 0, points.length - 1);
};

/**
 * Convert points array to SVG path string
 */
export const pointsToSvgPath = (points: Point[]): string => {
  if (points.length === 0) return '';
  if (points.length === 1) return `M${points[0].x},${points[0].y}`;

  let path = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L${points[i].x},${points[i].y}`;
  }

  return path;
};

/**
 * Check if a point is near a path within tolerance
 */
export const isPointNearPath = (
  point: Point,
  pathPoints: Point[],
  tolerance: number = 25
): boolean => {
  for (let i = 0; i < pathPoints.length - 1; i++) {
    const lineStart = pathPoints[i];
    const lineEnd = pathPoints[i + 1];

    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;
    const mag = Math.sqrt(dx * dx + dy * dy);

    if (mag === 0) {
      if (distance(point, lineStart) <= tolerance) return true;
      continue;
    }

    const u = ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / (mag * mag);

    if (u >= 0 && u <= 1) {
      const intersectionX = lineStart.x + u * dx;
      const intersectionY = lineStart.y + u * dy;
      const dist = distance(point, { x: intersectionX, y: intersectionY });

      if (dist <= tolerance) return true;
    }
  }

  return false;
};

/**
 * Calculate path coverage percentage
 */
export const calculatePathCoverage = (
  userPath: Point[],
  targetPath: Point[],
  tolerance: number = 25
): number => {
  if (targetPath.length === 0) return 0;

  let coveredPoints = 0;

  for (const targetPoint of targetPath) {
    if (isPointNearPath(targetPoint, userPath, tolerance)) {
      coveredPoints++;
    }
  }

  return (coveredPoints / targetPath.length) * 100;
};

/**
 * Get velocity of a stroke based on last few points
 */
export const getStrokeVelocity = (points: Point[]): number => {
  if (points.length < 2) return 0;

  const recentPoints = points.slice(-5);
  let totalDistance = 0;
  let totalTime = 0;

  for (let i = 1; i < recentPoints.length; i++) {
    const dist = distance(recentPoints[i - 1], recentPoints[i]);
    const timeDiff =
      (recentPoints[i].timestamp || 0) - (recentPoints[i - 1].timestamp || 0);

    totalDistance += dist;
    totalTime += timeDiff;
  }

  return totalTime > 0 ? totalDistance / totalTime : 0;
};

/**
 * Adaptive sampling - add points based on velocity
 */
export const shouldAddPoint = (
  lastPoint: Point,
  currentPoint: Point,
  velocity: number,
  minDistance: number = 3,
  maxDistance: number = 15
): boolean => {
  const dist = distance(lastPoint, currentPoint);
  const adaptiveDistance = Math.max(minDistance, maxDistance - velocity * 10);

  return dist >= adaptiveDistance;
};
