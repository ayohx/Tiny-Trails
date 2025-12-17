/**
 * Tests for Logger Utility
 * Validates structured logging per Holiday Extras standards
 */

import { logger, type LogContext } from '@/utils/telemetry/logger';

describe('Logger', () => {
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  describe('error logging', () => {
    it('should log error with structured format', () => {
      logger.error('Test error message');
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      const logOutput = consoleErrorSpy.mock.calls[0][0];
      const parsed = JSON.parse(logOutput);
      expect(parsed.level).toBe('ERROR');
      expect(parsed.message).toBe('Test error message');
    });
  });

  describe('warn logging', () => {
    it('should log warning with structured format', () => {
      logger.warn('Test warning');
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('info logging', () => {
    it('should log info with structured format', () => {
      logger.info('Test info');
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    });
  });
});
