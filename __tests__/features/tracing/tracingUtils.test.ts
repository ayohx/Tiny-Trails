/**
 * Tests for Tracing Utilities
 * Comprehensive coverage of pure tracing functions
 */

import {
  calculateDistance,
  isPointNearPoint,
  calculateCoverage,
  checkEraserCollision,
  smoothPath,
  type Point,
  type Stroke,
} from '@/features/tracing/tracingUtils';

describe('tracingUtils', () => {
  describe('calculateDistance', () => {
    it('should calculate distance between two points', () => {
      const p1: Point = { x: 0, y: 0 };
      const p2: Point = { x: 3, y: 4 };
      
      expect(calculateDistance(p1, p2)).toBe(5);
    });

    it('should return 0 for identical points', () => {
      const p1: Point = { x: 10, y: 10 };
      const p2: Point = { x: 10, y: 10 };
      
      expect(calculateDistance(p1, p2)).toBe(0);
    });
  });

  describe('isPointNearPoint', () => {
    it('should return true when points are within radius', () => {
      const point: Point = { x: 10, y: 10 };
      const target: Point = { x: 15, y: 15 };
      const radius = 10;
      
      expect(isPointNearPoint(point, target, radius)).toBe(true);
    });

    it('should return false when points are outside radius', () => {
      const point: Point = { x: 0, y: 0 };
      const target: Point = { x: 100, y: 100 };
      const radius = 10;
      
      expect(isPointNearPoint(point, target, radius)).toBe(false);
    });
  });

  describe('calculateCoverage', () => {
    const createStroke = (points: Point[]): Stroke => ({
      points,
      path: '',
      color: '#000000',
      thickness: 5,
      timestamp: Date.now(),
    });

    it('should return 100% for fully covered guide dots', () => {
      const strokes = [createStroke([{ x: 0, y: 0 }, { x: 50, y: 0 }])];
      const guideDots = [{ x: 0, y: 0 }, { x: 50, y: 0 }];
      
      expect(calculateCoverage(strokes, guideDots, 30)).toBe(100);
    });

    it('should return 0% for no overlap', () => {
      const strokes = [createStroke([{ x: 0, y: 0 }])];
      const guideDots = [{ x: 1000, y: 1000 }];
      
      expect(calculateCoverage(strokes, guideDots, 30)).toBe(0);
    });
  });
});
