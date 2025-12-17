/**
 * Tests for path smoothing utilities
 */

import {
  Point,
  distance,
  catmullRomSpline,
  smoothPath,
  simplifyPath,
  pointsToSvgPath,
  isPointNearPath,
  calculatePathCoverage,
  getStrokeVelocity,
  shouldAddPoint,
} from '../pathSmoothing';

describe('pathSmoothing utilities', () => {
  describe('distance', () => {
    it('should calculate distance between two points', () => {
      const p1: Point = { x: 0, y: 0 };
      const p2: Point = { x: 3, y: 4 };
      expect(distance(p1, p2)).toBe(5); // 3-4-5 triangle
    });

    it('should return 0 for same point', () => {
      const p: Point = { x: 5, y: 10 };
      expect(distance(p, p)).toBe(0);
    });
  });

  describe('pointsToSvgPath', () => {
    it('should return empty string for empty array', () => {
      expect(pointsToSvgPath([])).toBe('');
    });

    it('should handle single point', () => {
      const points: Point[] = [{ x: 10, y: 20 }];
      expect(pointsToSvgPath(points)).toBe('M10,20');
    });

    it('should create path with MoveTo and LineTo commands', () => {
      const points: Point[] = [
        { x: 0, y: 0 },
        { x: 10, y: 10 },
        { x: 20, y: 0 },
      ];
      expect(pointsToSvgPath(points)).toBe('M0,0 L10,10 L20,0');
    });
  });

  describe('calculatePathCoverage', () => {
    it('should return 0 for empty target path', () => {
      const userPath: Point[] = [{ x: 0, y: 0 }];
      const targetPath: Point[] = [];
      expect(calculatePathCoverage(userPath, targetPath)).toBe(0);
    });

    it('should return 100 for complete coverage', () => {
      const targetPath: Point[] = [
        { x: 0, y: 0 },
        { x: 10, y: 0 },
        { x: 20, y: 0 },
      ];
      const userPath: Point[] = [
        { x: 0, y: 0 },
        { x: 20, y: 0 },
      ];
      const coverage = calculatePathCoverage(userPath, targetPath, 25);
      expect(coverage).toBe(100);
    });
  });
});
