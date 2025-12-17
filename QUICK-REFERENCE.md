# 📋 Quick Reference - Telemetry & Testing

## 🚀 Quick Start

```bash
npm test                    # Run all tests
npm run test:coverage       # Run tests with coverage
npm test -- logger.test     # Run specific test
npm run test:watch          # Watch mode
```

## 📝 Logging

```typescript
import { logger } from '@/utils/telemetry';

logger.error('Payment failed', { trace_id: 'abc123' });
logger.warn('Slow response', { duration_ms: 5000 });
logger.info('Level completed', { level: 5 });
logger.debug('Calculation', { input: 50 });
```

## 🎮 Analytics

```typescript
import { analytics } from '@/utils/telemetry';

analytics.trackGameStart('easy');
analytics.trackLevelComplete(5, 1500, 60000, 3);
analytics.trackWordFound('cat', true, 95);
analytics.trackAchievementUnlocked('first_win', 'First Victory');
```

## 🚨 Error Tracking

```typescript
import { errorTracker } from '@/utils/telemetry';

try {
  riskyOperation();
} catch (error) {
  errorTracker.captureError(error as Error, {
    screen: 'game_screen',
  });
}
```

## ⚙️ Sentry Setup

```bash
cp .env.example .env
echo "EXPO_PUBLIC_SENTRY_DSN=https://key@sentry.io/project" >> .env
npm start
```

---

**Full Docs:** See `TELEMETRY-SETUP.md` for complete guide
