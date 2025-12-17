/**
 * Test Utilities
 * Helper functions for testing
 */

import { render, RenderOptions } from '@testing-library/react-native';
import React, { ReactElement } from 'react';

/**
 * Custom render function with providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options });
}

/**
 * Generate mock stroke data for testing
 */
export function generateMockStroke(overrides?: any) {
  return {
    points: [
      { x: 100, y: 100 },
      { x: 150, y: 150 },
      { x: 200, y: 200 },
    ],
    path: 'M 100 100 L 150 150 L 200 200',
    color: '#FF6B6B',
    thickness: 8,
    timestamp: Date.now(),
    ...overrides,
  };
}

/**
 * Wait for async operations
 */
export const waitFor = (ms: number) => 
  new Promise(resolve => setTimeout(resolve, ms));
