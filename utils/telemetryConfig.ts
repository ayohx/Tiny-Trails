/**
 * Telemetry Configuration
 * Central config for error tracking and analytics
 */

export const telemetryConfig = {
  // Sentry DSN - set via environment variable or leave empty for development
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN || '',
  
  // Enable/disable telemetry
  enabled: !__DEV__, // Disabled in development by default
  
  // Sample rates
  tracesSampleRate: __DEV__ ? 1.0 : 0.2, // 100% dev, 20% prod
  
  // Environment
  environment: __DEV__ ? 'development' : 'production',
  
  // Release version - sync with package.json
  release: '1.0.0',
  
  // App name
  appName: 'tiny-trails',
};

/**
 * Check if telemetry is properly configured
 */
export const isTelemetryConfigured = (): boolean => {
  return telemetryConfig.enabled && telemetryConfig.sentryDsn.length > 0;
};

/**
 * Get telemetry status for debugging
 */
export const getTelemetryStatus = () => {
  return {
    enabled: telemetryConfig.enabled,
    configured: isTelemetryConfigured(),
    environment: telemetryConfig.environment,
    release: telemetryConfig.release,
  };
};
