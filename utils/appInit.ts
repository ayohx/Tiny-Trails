/**
 * App Initialization
 * Sets up telemetry, error tracking, and logging
 * Call this once at app startup
 */

import { initTelemetry, startNewSession, getTelemetryStatus } from './telemetry';
import { telemetryConfig, isTelemetryConfigured } from './telemetryConfig';
import { logInfo, logWarn } from './logger';

/**
 * Initialize all app services
 * Should be called before any other app code runs
 */
export const initializeApp = () => {
  try {
    // Initialize telemetry/error tracking
    if (isTelemetryConfigured()) {
      initTelemetry(telemetryConfig.sentryDsn);
      logInfo('Telemetry initialized', getTelemetryStatus());
    } else {
      logWarn('Telemetry not configured - running without error tracking');
    }

    // Start initial session
    startNewSession();
    logInfo('App initialized successfully', {
      version: telemetryConfig.release,
      environment: telemetryConfig.environment,
    });

    return true;
  } catch (error) {
    // Even if telemetry fails, log to console
    console.error('[AppInit] Failed to initialize app services:', error);
    return false;
  }
};

/**
 * Get app initialization status
 */
export const getInitStatus = () => {
  return {
    telemetryConfigured: isTelemetryConfigured(),
    ...getTelemetryStatus(),
  };
};
