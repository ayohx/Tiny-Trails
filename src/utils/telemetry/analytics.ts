/**
 * Analytics & Event Tracking
 * Follows Holiday Extras telemetry standards
 * 
 * Tracks user journey metrics:
 * - Screen views
 * - User actions
 * - Completion rates
 * - Error rates
 */

import { logger } from './logger';

interface AnalyticsEvent {
  event_type: string;
  event_category: 'screen_view' | 'user_action' | 'error' | 'system';
  timestamp: string;
  properties?: Record<string, any>;
  user_id?: string;
  session_id?: string;
}

class Analytics {
  private sessionId: string;
  private userId?: string;

  constructor() {
    // Generate session ID on init
    this.sessionId = this.generateSessionId();
  }

  /**
   * Generate unique session identifier
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Set user identifier (if available)
   */
  setUserId(userId: string): void {
    this.userId = userId;
    logger.info('User ID set', { user_id: userId });
  }

  /**
   * Track generic event
   */
  private trackEvent(
    event_type: string,
    event_category: AnalyticsEvent['event_category'],
    properties?: Record<string, any>
  ): void {
    const event: AnalyticsEvent = {
      event_type,
      event_category,
      timestamp: new Date().toISOString(),
      properties,
      user_id: this.userId,
      session_id: this.sessionId,
    };

    logger.debug('Analytics event', event);

    // In production, send to analytics service
    // e.g., Firebase Analytics, Mixpanel, Amplitude
  }

  /**
   * Track screen view
   */
  trackScreenView(screenName: string, properties?: Record<string, any>): void {
    this.trackEvent(`screen_${screenName}`, 'screen_view', {
      screen_name: screenName,
      ...properties,
    });
  }

  /**
   * Track user action
   */
  trackAction(actionName: string, properties?: Record<string, any>): void {
    this.trackEvent(actionName, 'user_action', properties);
  }

  /**
   * Track error
   */
  trackError(errorName: string, errorDetails?: Record<string, any>): void {
    this.trackEvent(errorName, 'error', {
      error_type: errorName,
      ...errorDetails,
    });
    
    logger.error(errorName, errorDetails);
  }

  /**
   * Track letter tracing completion
   */
  trackLetterComplete(
    letter: string,
    coverage: number,
    duration: number,
    attempts: number
  ): void {
    this.trackAction('letter_completed', {
      letter,
      coverage,
      duration_ms: duration,
      attempts,
    });
  }

  /**
   * Track drawing tool usage
   */
  trackToolUsed(toolName: string, properties?: Record<string, any>): void {
    this.trackAction('tool_used', {
      tool: toolName,
      ...properties,
    });
  }

  /**
   * Track game session start
   */
  trackGameStart(difficulty?: string): void {
    this.trackAction('game_started', {
      difficulty: difficulty || 'normal',
    });
  }

  /**
   * Track level completion
   */
  trackLevelComplete(
    level: number,
    score: number,
    timeMs: number,
    starsEarned: number
  ): void {
    this.trackAction('level_completed', {
      level,
      score,
      duration_ms: timeMs,
      stars_earned: starsEarned,
    });
  }

  /**
   * Track word/letter found
   */
  trackWordFound(word: string, isCorrect: boolean, coverage: number): void {
    this.trackAction('word_submitted', {
      word_length: word.length,
      is_correct: isCorrect,
      coverage_percent: coverage,
    });
  }

  /**
   * Track hint usage
   */
  trackHintUsed(hintType: string): void {
    this.trackAction('hint_used', {
      hint_type: hintType,
    });
  }

  /**
   * Track achievement unlock
   */
  trackAchievementUnlocked(achievementId: string, achievementName: string): void {
    this.trackAction('achievement_unlocked', {
      achievement_id: achievementId,
      achievement_name: achievementName,
    });
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Export types
export type { AnalyticsEvent };
