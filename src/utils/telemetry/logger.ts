/**
 * Structured Logging Utility
 * Follows Holiday Extras observability standards
 * 
 * Log Levels:
 * - ERROR: Actionable failures
 * - WARN: Anomalies, not paging
 * - INFO: Key state changes
 * - DEBUG: Development only (off in prod)
 */

type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

interface LogContext {
  trace_id?: string;
  user_id?: string;
  screen?: string;
  action?: string;
  [key: string]: any;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  service: string;
  version: string;
  message: string;
  context?: LogContext;
}

class Logger {
  private service = 'tiny-trails';
  private version = '1.0.0'; // Will be synced with package.json
  private isDevelopment = __DEV__;

  /**
   * Generate RFC 3339 timestamp in UTC
   */
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Create structured log entry
   */
  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): LogEntry {
    return {
      timestamp: this.getTimestamp(),
      level,
      service: this.service,
      version: this.version,
      message,
      context,
    };
  }

  /**
   * Format log entry for console output
   */
  private formatLogEntry(entry: LogEntry): string {
    return JSON.stringify(entry);
  }

  /**
   * Log an ERROR - actionable failure
   */
  error(message: string, context?: LogContext): void {
    const entry = this.createLogEntry('ERROR', message, context);
    console.error(this.formatLogEntry(entry));
    
    // Send to Sentry in production
    if (!this.isDevelopment) {
      try {
        // Import dynamically to avoid issues in tests
        const Sentry = require('@sentry/react-native');
        Sentry.captureException(new Error(message), {
          contexts: { custom: context },
          level: 'error',
        });
      } catch (e) {
        // Sentry not initialized, skip
      }
    }
  }

  /**
   * Log a WARNING - anomaly, not critical
   */
  warn(message: string, context?: LogContext): void {
    const entry = this.createLogEntry('WARN', message, context);
    console.warn(this.formatLogEntry(entry));
    
    // Send warnings to Sentry in production for visibility
    if (!this.isDevelopment) {
      try {
        const Sentry = require('@sentry/react-native');
        Sentry.captureMessage(message, {
          contexts: { custom: context },
          level: 'warning',
        });
      } catch (e) {
        // Sentry not initialized, skip
      }
    }
  }

  /**
   * Log INFO - key state changes
   */
  info(message: string, context?: LogContext): void {
    const entry = this.createLogEntry('INFO', message, context);
    console.log(this.formatLogEntry(entry));
  }

  /**
   * Log DEBUG - development only
   */
  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      const entry = this.createLogEntry('DEBUG', message, context);
      console.log(this.formatLogEntry(entry));
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export types for use in other modules
export type { LogContext, LogLevel };
