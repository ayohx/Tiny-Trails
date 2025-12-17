/**
 * Tests for telemetry utilities
 */

import * as Sentry from '@sentry/react-native';
import {
  initTelemetry,
  startNewSession,
  getSessionId,
  logEvent,
  logError,
  Events,
} from '../telemetry';

// Mock Sentry
jest.mock('@sentry/react-native');

describe('telemetry utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initTelemetry', () => {
    it('should initialize Sentry with DSN', () => {
      const mockDsn = 'https://test@sentry.io/123';
      initTelemetry(mockDsn);
      
      expect(Sentry.init).toHaveBeenCalledWith(
        expect.objectContaining({
          dsn: mockDsn,
        })
      );
    });

    it('should not initialize Sentry without DSN', () => {
      initTelemetry();
      expect(Sentry.init).not.toHaveBeenCalled();
    });
  });

  describe('session management', () => {
    it('should generate unique session IDs', () => {
      const id1 = getSessionId();
      startNewSession();
      const id2 = getSessionId();
      
      expect(id1).not.toBe(id2);
    });

    it('should log session start event', () => {
      startNewSession();
      
      expect(Sentry.addBreadcrumb).toHaveBeenCalledWith(
        expect.objectContaining({
          category: 'analytics',
          message: 'session_start',
        })
      );
    });
  });

  describe('logEvent', () => {
    it('should log event with session context', () => {
      logEvent(Events.LETTER_STARTED, { letter: 'A' });
      
      expect(Sentry.addBreadcrumb).toHaveBeenCalledWith(
        expect.objectContaining({
          category: 'analytics',
          message: Events.LETTER_STARTED,
          data: expect.objectContaining({
            letter: 'A',
            sessionId: expect.any(String),
          }),
        })
      );
    });
  });

  describe('logError', () => {
    it('should capture exception to Sentry', () => {
      const error = new Error('Test error');
      const context = { screen: 'LetterTracing' };
      
      logError(error, context, 'error');
      
      expect(Sentry.captureException).toHaveBeenCalledWith(
        error,
        expect.objectContaining({
          level: 'error',
          extra: expect.objectContaining(context),
        })
      );
    });

    it('should include session ID in error context', () => {
      const error = new Error('Test error');
      
      logError(error);
      
      expect(Sentry.captureException).toHaveBeenCalledWith(
        error,
        expect.objectContaining({
          extra: expect.objectContaining({
            sessionId: expect.any(String),
          }),
        })
      );
    });
  });
});
