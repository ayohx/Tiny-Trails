/**
 * Telemetry Module
 * Central export for all observability utilities
 * 
 * Usage:
 * import { logger, analytics, errorTracker, initializeTelemetry } from '@/utils/telemetry';
 */

export { logger } from './logger';
export { analytics } from './analytics';
export { errorTracker } from './errorTracking';

export type { LogContext, LogLevel } from './logger';
export type { AnalyticsEvent } from './analytics';

/**
 * Initialize all telemetry services
 * Call this once at app startup
 */
export function initializeTelemetry(): void {
  try {
    errorTracker.initialize();
    logger.info('Telemetry initialized successfully');
  } catch (error) {
    console.error('Failed to initialize telemetry:', error);
  }
}
