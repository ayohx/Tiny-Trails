# 🐢 Tiny Trails - Educational Letter Tracing App

A delightful educational app for children to learn letter tracing with fun, interactive tools.

## 🎯 Features

### ✅ Phase 1 - Core Tracing (Complete)
- Smooth letter tracing with path validation
- Real-time progress tracking
- Celebration animations and haptic feedback
- Tiko the turtle mascot

### ✅ Phase 2 - Drawing Tools (Complete)
- 8 colors + rainbow gradient mode
- 4 line thickness options
- Eraser with visual cursor
- Full undo/redo (20 action history)
- Professional dual toolbar

### 🚧 Phase 3 - In Development
- Progress dashboard with statistics
- Complete words tab
- Gamification (rewards, badges, achievements)

## 🏗️ Technical Stack

- **Framework**: React Native + Expo Router
- **Language**: TypeScript
- **State**: Zustand
- **Graphics**: React Native SVG
- **Animations**: Reanimated + Gesture Handler
- **Testing**: Jest + React Native Testing Library
- **Error Tracking**: Sentry
- **Logging**: Structured logs (HX standards)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- iOS Simulator (Mac) or Android Studio
- Expo CLI (installed automatically)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tiny-trails.git
cd tiny-trails

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm start
```

### Running the App

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage Goals
- **Target**: 80% coverage minimum
- **Critical paths**: 100% coverage
- Core utilities (pathSmoothing, telemetry)
- Component rendering and interactions
- Error boundaries

## 📊 Observability

### Error Tracking (Sentry)
1. Create account at https://sentry.io
2. Create new project for React Native
3. Copy your DSN
4. Add to `.env` file:
   ```
   EXPO_PUBLIC_SENTRY_DSN=https://your-key@sentry.io/your-project
   ```

### Logging
Structured logs follow Holiday Extras standards:
- **DEBUG**: Development only
- **INFO**: Key state changes
- **WARN**: Anomalies (non-critical)
- **ERROR**: Actionable failures

```typescript
import { logInfo, logError } from './utils/logger';

// Log an event
logInfo('Letter completed', { letter: 'A', coverage: 95 });

// Log an error
logError('Failed to save progress', error, { userId: 'anon' });
```

### Analytics Events
```typescript
import { logEvent, Events } from './utils/telemetry';

// Track user actions
logEvent(Events.LETTER_STARTED, { letter: 'A' });
logEvent(Events.COLOR_CHANGED, { color: 'red' });
```

## 🔒 Security & Privacy

See [SECURITY.md](./SECURITY.md) for full details.

### Key Points
- ✅ NO PII collection without consent
- ✅ COPPA/GDPR-K compliant design
- ✅ All data stored locally by default
- ✅ Error reports anonymized
- ✅ Parental controls (planned)

## 📁 Project Structure

```
tiny-trails/
├── app/                    # Expo Router pages
│   └── (tabs)/            # Tab navigation
├── components/            # React components
│   ├── ColorPicker.tsx
│   ├── ThicknessPicker.tsx
│   ├── DrawingToolbar.tsx
│   ├── ErrorBoundary.tsx  # NEW!
│   └── LetterTracingPhase2.tsx
├── utils/                 # Utilities
│   ├── telemetry.ts       # NEW! Analytics & errors
│   ├── logger.ts          # NEW! Structured logging
│   ├── pathSmoothing.ts   # Drawing algorithms
│   └── __tests__/         # NEW! Unit tests
├── styles/                # Theme and styles
├── store/                 # Zustand stores
├── CHANGELOG.md           # NEW! Version history
├── SECURITY.md            # NEW! Privacy policy
└── jest.config.js         # NEW! Test configuration
```

## 🐛 Error Handling

All screens are wrapped in Error Boundaries:
```typescript
import { ErrorBoundary } from './components/ErrorBoundary';

<ErrorBoundary>
  <YourScreen />
</ErrorBoundary>
```

Errors are automatically:
- Caught and logged to Sentry
- Displayed with child-friendly UI
- Recoverable with "Try Again" button

## 📝 Versioning

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

See [CHANGELOG.md](./CHANGELOG.md) for version history.

### Creating a Release
```bash
# Update version in package.json
npm version minor  # or major/patch

# Update CHANGELOG.md

# Create git tag
git tag -a v1.1.0 -m "Phase 3: Progress Dashboard"
git push origin v1.1.0
```

## 🚀 Deployment

### Web (Netlify)
```bash
npm run build:web
# Deploy dist/ folder to Netlify
```

### iOS App Store
```bash
expo build:ios
# Follow App Store submission guidelines
```

### Android Play Store
```bash
expo build:android
# Follow Play Store submission guidelines
```

## 🧑‍💻 Development Guidelines

### Code Standards
- TypeScript strict mode enabled
- ESLint for code quality
- Prettier for formatting (pending setup)
- 80% minimum test coverage

### Git Workflow
1. Create feature branch: `git checkout -b feature/name`
2. Write tests first (TDD encouraged)
3. Implement feature
4. Ensure tests pass: `npm test`
5. Update CHANGELOG.md
6. Create pull request

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: add progress dashboard
fix: resolve crash on letter completion
docs: update README with testing guide
test: add coverage for pathSmoothing
```

## 📊 Performance

### Targets
- 60 FPS during drawing
- <100ms gesture response time
- <2s app startup time
- <50MB memory usage

### Monitoring
- Sentry performance monitoring
- React DevTools Profiler
- Custom performance logs via `logPerformance()`

## 🤝 Contributing

1. Read [SECURITY.md](./SECURITY.md) for privacy requirements
2. Check [CHANGELOG.md](./CHANGELOG.md) for current version
3. Follow development guidelines above
4. Add tests for new features
5. Update documentation

## 📄 License

MIT License - see LICENSE file

## 🙏 Acknowledgments

- Inspired by educational apps for early childhood learning
- Uses Expo for cross-platform development
- Follows Holiday Extras technical standards

## 📞 Support

- GitHub Issues: Bug reports and feature requests
- Email: support@tinytrails.app (when available)
- Documentation: See /docs folder

---

Made with ❤️ for children's education
