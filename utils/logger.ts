/**
 * Structured Logging Utility
 * Follows Holiday Extras observability standards
 */

import { getSessionId } from './telemetry';

/**
 * Log levels matching observability policy
 */
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

/**
 * Structured log entry
 */
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  service: string;
  version: string;
  env: string;
  session_id: string;
  message: string;
  trace_id?: string;
  context?: Record<string, any>;
}

const SERVICE_NAME = 'tiny-trails';
const SERVICE_VERSION = '1.0.0'; // Will sync with package.json
const ENV = __DEV__ ? 'development' : 'production';

/**
 * Create structured log entry
 */
const createLogEntry = (
  level: LogLevel,
  message: string,
  context?: Record<string, any>,
  traceId?: string
): LogEntry => {
  return {
    timestamp: new Date().toISOString(),
    level,
    service: SERVICE_NAME,
    version: SERVICE_VERSION,
    env: ENV,
    session_id: getSessionId(),
    message,
    trace_id: traceId,
    context,
  };
};

/**
 * Format log entry for console
 */
const formatForConsole = (entry: LogEntry): string => {
  const { timestamp, level, message, context } = entry;
  const contextStr = context ? ` ${JSON.stringify(context)}` : '';
  return `[${timestamp}] [${level}] ${message}${contextStr}`;
};

/**
 * Log at DEBUG level
 * Use for development/debugging only - disabled in production
 */
export const logDebug = (
  message: string,
  context?: Record<string, any>,
  traceId?: string
) => {
  if (!__DEV__) return; // Skip in production

  const entry = createLogEntry(LogLevel.DEBUG, message, context, traceId);
  console.log(formatForConsole(entry));
};

/**
 * Log at INFO level
 * Use for key state changes and important events
 */
export const logInfo = (
  message: string,
  context?: Record<string, any>,
  traceId?: string
) => {
  const entry = createLogEntry(LogLevel.INFO, message, context, traceId);
  console.log(formatForConsole(entry));
};

/**
 * Log at WARN level
 * Use for anomalies that don't require paging
 */
export const logWarn = (
  message: string,
  context?: Record<string, any>,
  traceId?: string
) => {
  const entry = createLogEntry(LogLevel.WARN, message, context, traceId);
  console.warn(formatForConsole(entry));
};

/**
 * Log at ERROR level
 * Use for actionable failures
 */
export const logError = (
  message: string,
  error?: Error,
  context?: Record<string, any>,
  traceId?: string
) => {
  const entry = createLogEntry(
    LogLevel.ERROR,
    message,
    {
      ...context,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : undefined,
    },
    traceId
  );
  console.error(formatForConsole(entry));
};

/**
 * Create a scoped logger with default context
 */
export const createLogger = (scope: string, defaultContext?: Record<string, any>) => {
  return {
    debug: (message: string, context?: Record<string, any>, traceId?: string) =>
      logDebug(`[${scope}] ${message}`, { ...defaultContext, ...context }, traceId),
    info: (message: string, context?: Record<string, any>, traceId?: string) =>
      logInfo(`[${scope}] ${message}`, { ...defaultContext, ...context }, traceId),
    warn: (message: string, context?: Record<string, any>, traceId?: string) =>
      logWarn(`[${scope}] ${message}`, { ...defaultContext, ...context }, traceId),
    error: (message: string, error?: Error, context?: Record<string, any>, traceId?: string) =>
      logError(`[${scope}] ${message}`, error, { ...defaultContext, ...context }, traceId),
  };
};

/**
 * Logger for tracing operations
 */
export const tracingLogger = createLogger('LetterTracing');

/**
 * Logger for UI operations
 */
export const uiLogger = createLogger('UI');

/**
 * Logger for storage operations
 */
export const storageLogger = createLogger('Storage');
