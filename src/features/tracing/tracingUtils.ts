/**
 * Tracing Utilities
 * Pure functions for tracing calculations
 * 
 * These are extracted for testability and reusability
 */

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  path: string;
  color: string;
  thickness: number;
  timestamp: number;
}

/**
 * Calculate distance between two points
 */
export function calculateDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

/**
 * Check if a point is within a given radius of another point
 */
export function isPointNearPoint(
  point: Point,
  target: Point,
  radius: number
): boolean {
  return calculateDistance(point, target) <= radius;
}

/**
 * Calculate coverage percentage
 * Based on how many guide dots have been covered
 */
export function calculateCoverage(
  strokes: Stroke[],
  guideDots: Point[],
  threshold: number = 30
): number {
  if (guideDots.length === 0) return 0;

  let coveredDots = 0;

  for (const dot of guideDots) {
    let isCovered = false;

    for (const stroke of strokes) {
      for (const point of stroke.points) {
        if (isPointNearPoint(point, dot, threshold)) {
          isCovered = true;
          break;
        }
      }
      if (isCovered) break;
    }

    if (isCovered) coveredDots++;
  }

  return Math.round((coveredDots / guideDots.length) * 100);
}

/**
 * Check if eraser collides with a stroke
 */
export function checkEraserCollision(
  eraserPoint: Point,
  eraserRadius: number,
  stroke: Stroke
): boolean {
  for (const point of stroke.points) {
    if (isPointNearPoint(eraserPoint, point, eraserRadius)) {
      return true;
    }
  }
  return false;
}

/**
 * Smooth path using simple averaging
 */
export function smoothPath(points: Point[]): Point[] {
  if (points.length < 3) return points;

  const smoothed: Point[] = [points[0]];

  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    smoothed.push({
      x: (prev.x + curr.x + next.x) / 3,
      y: (prev.y + curr.y + next.y) / 3,
    });
  }

  smoothed.push(points[points.length - 1]);
  return smoothed;
}

export type { Point, Stroke };
