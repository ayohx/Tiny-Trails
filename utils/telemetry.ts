/**
 * Telemetry & Analytics Utilities
 * Centralized event tracking and error monitoring for Tiny Trails
 */

import * as Sentry from '@sentry/react-native';
import { v4 as uuidv4 } from 'uuid';

// Session tracking
let sessionId: string = uuidv4();
let sessionStartTime: number = Date.now();

/**
 * Initialize telemetry with Sentry configuration
 * Call this once at app startup
 */
export const initTelemetry = (dsn?: string) => {
  if (!dsn) {
    console.log('[Telemetry] Running in development mode - Sentry disabled');
    return;
  }

  Sentry.init({
    dsn,
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 30000,
    environment: __DEV__ ? 'development' : 'production',
    tracesSampleRate: __DEV__ ? 1.0 : 0.2, // 100% dev, 20% prod
    beforeSend: (event) => {
      // Strip PII if any accidentally gets logged
      if (event.user) {
        delete event.user.email;
        delete event.user.ip_address;
      }
      return event;
    },
  });

  console.log('[Telemetry] Sentry initialized');
};

/**
 * Start a new user session
 */
export const startNewSession = () => {
  sessionId = uuidv4();
  sessionStartTime = Date.now();
  logEvent('session_start', { sessionId });
};

/**
 * Get current session ID for correlation
 */
export const getSessionId = () => sessionId;

/**
 * Get session duration in seconds
 */
export const getSessionDuration = () => {
  return Math.floor((Date.now() - sessionStartTime) / 1000);
};

/**
 * Log analytics event
 */
export const logEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  const eventData = {
    timestamp: new Date().toISOString(),
    sessionId,
    sessionDuration: getSessionDuration(),
    ...properties,
  };

  // Console log in development
  if (__DEV__) {
    console.log(`[EVENT] ${eventName}`, eventData);
  }

  // Send to analytics (placeholder - integrate with your analytics service)
  // Example: Analytics.logEvent(eventName, eventData);

  // Also log to Sentry as breadcrumb
  Sentry.addBreadcrumb({
    category: 'analytics',
    message: eventName,
    data: eventData,
    level: 'info',
  });
};

/**
 * Log error with context
 */
export const logError = (
  error: Error,
  context?: Record<string, any>,
  level: 'fatal' | 'error' | 'warning' = 'error'
) => {
  const errorData = {
    timestamp: new Date().toISOString(),
    sessionId,
    sessionDuration: getSessionDuration(),
    ...context,
  };

  // Console log in development
  if (__DEV__) {
    console.error(`[${level.toUpperCase()}]`, error.message, errorData);
    console.error(error.stack);
  }

  // Send to Sentry
  Sentry.captureException(error, {
    level,
    extra: errorData,
  });
};

/**
 * Set user context (non-PII only)
 */
export const setUserContext = (userId: string, metadata?: Record<string, any>) => {
  Sentry.setUser({
    id: userId,
    ...metadata,
  });
};

/**
 * Clear user context (on logout/reset)
 */
export const clearUserContext = () => {
  Sentry.setUser(null);
};

/**
 * Add custom tag for filtering
 */
export const addTag = (key: string, value: string) => {
  Sentry.setTag(key, value);
};

/**
 * Log performance measurement
 */
export const logPerformance = (
  metric: string,
  durationMs: number,
  metadata?: Record<string, any>
) => {
  logEvent('performance_metric', {
    metric,
    durationMs,
    ...metadata,
  });
};

/**
 * Standard event names for consistency
 */
export const Events = {
  // Session
  SESSION_START: 'session_start',
  SESSION_END: 'session_end',

  // Letter tracing
  LETTER_STARTED: 'letter_started',
  LETTER_COMPLETED: 'letter_completed',
  LETTER_ABANDONED: 'letter_abandoned',

  // Drawing tools
  COLOR_CHANGED: 'color_changed',
  THICKNESS_CHANGED: 'thickness_changed',
  ERASER_TOGGLED: 'eraser_toggled',
  UNDO_PRESSED: 'undo_pressed',
  REDO_PRESSED: 'redo_pressed',
  CLEAR_PRESSED: 'clear_pressed',

  // User actions
  STROKE_DRAWN: 'stroke_drawn',
  STROKE_ERASED: 'stroke_erased',

  // Progress
  PROGRESS_MILESTONE: 'progress_milestone',
  ACHIEVEMENT_UNLOCKED: 'achievement_unlocked',

  // Errors
  ERROR_OCCURRED: 'error_occurred',
  ERROR_BOUNDARY_TRIGGERED: 'error_boundary_triggered',

  // Performance
  RENDER_TIME: 'render_time',
  GESTURE_LAG: 'gesture_lag',
} as const;
