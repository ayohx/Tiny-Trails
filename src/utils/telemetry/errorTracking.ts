/**
 * Error Tracking & Crash Reporting
 * Follows Holiday Extras observability standards
 * 
 * Integrates with crash reporting services (Sentry, Bugsnag)
 * Provides structured error handling
 */

import { logger } from './logger';
import { analytics } from './analytics';

interface ErrorContext {
  screen?: string;
  action?: string;
  user_id?: string;
  additional_data?: Record<string, any>;
}

class ErrorTracker {
  private isInitialized = false;

  /**
   * Initialize error tracking service
   * Sets up Sentry integration
   */
  initialize(): void {
    if (this.isInitialized) {
      logger.warn('ErrorTracker already initialized');
      return;
    }

    // Initialize Sentry (works for both dev and prod)
    try {
      const Sentry = require('@sentry/react-native');
      const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
      
      if (sentryDsn) {
        Sentry.init({
          dsn: sentryDsn,
          environment: __DEV__ ? 'development' : 'production',
          tracesSampleRate: __DEV__ ? 1.0 : 0.1,
          enableAutoSessionTracking: true,
          enableInExpoDevelopment: false, // Don't track in Expo dev builds
        });
        logger.info('Sentry initialized successfully');
      } else {
        logger.info('Sentry DSN not configured - error tracking disabled');
      }
    } catch (error) {
      logger.error('Failed to initialize Sentry', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }

    this.isInitialized = true;
    logger.info('ErrorTracker initialized');
  }

  /**
   * Capture and report an error
   */
  captureError(error: Error, context?: ErrorContext): void {
    // Log structured error
    logger.error(error.message, {
      error_name: error.name,
      error_stack: error.stack,
      ...context,
    });

    // Track in analytics
    analytics.trackError('app_error', {
      error_message: error.message,
      error_type: error.name,
      ...context,
    });

    // Send to Sentry
    try {
      const Sentry = require('@sentry/react-native');
      Sentry.captureException(error, {
        contexts: { custom: context },
      });
    } catch (e) {
      // Sentry not available, already logged above
    }
  }

  /**
   * Capture message (non-error issue)
   */
  captureMessage(message: string, level: 'info' | 'warning' | 'error', context?: ErrorContext): void {
    logger.info(message, context);

    // Send to Sentry
    try {
      const Sentry = require('@sentry/react-native');
      Sentry.captureMessage(message, {
        level: level as any,
        contexts: { custom: context },
      });
    } catch (e) {
      // Sentry not available
    }
  }

  /**
   * Set user context for error reports
   */
  setUser(userId: string): void {
    logger.info('User context set for error tracking', { user_id: userId });
    
    // Set user in Sentry
    try {
      const Sentry = require('@sentry/react-native');
      Sentry.setUser({ id: userId });
    } catch (e) {
      // Sentry not available
    }
  }

  /**
   * Add breadcrumb for debugging
   */
  addBreadcrumb(message: string, data?: Record<string, any>): void {
    logger.debug('Breadcrumb', { message, data });
    
    // Add to Sentry
    try {
      const Sentry = require('@sentry/react-native');
      Sentry.addBreadcrumb({
        message,
        data,
      });
    } catch (e) {
      // Sentry not available
    }
  }
}

// Export singleton
export const errorTracker = new ErrorTracker();
