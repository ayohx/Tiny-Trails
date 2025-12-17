# Tiny Trails - Architecture Documentation

## Overview
Tiny Trails is an educational React Native application for teaching children letter and word tracing. This document outlines the technical architecture following Holiday Extras standards.

## Technology Stack

### Core
- **React Native** (0.74.5) - Cross-platform mobile framework
- **Expo** (~51.0.0) - Development and build platform
- **TypeScript** (~5.3.3) - Type safety and better DX

### State Management
- **Zustand** (^5.0.6) - Lightweight state management
- React local state for component-specific state

### Graphics & Animation
- **React Native SVG** (15.2.0) - Vector graphics
- **React Native Gesture Handler** (~2.16.1) - Touch interactions
- **React Native Reanimated** (~3.10.1) - Smooth animations
- **Expo Linear Gradient** (~13.0.2) - Gradient effects

### Testing
- **Jest** (^29.2.1) - Test runner
- **Jest Expo** (~51.0.1) - Expo-specific configuration
- **React Native Testing Library** (^12.4.3) - Component testing
- **Jest Native** (^5.4.3) - Custom matchers

### Observability
- Structured logging system
- Analytics tracking
- Error tracking and reporting
- Performance monitoring (planned)

## Project Structure

```
tiny-trails/
├── src/
│   ├── components/          # React components
│   │   ├── tracing/        # Tracing-specific components
│   │   ├── common/         # Shared components
│   │   └── mascot/         # Mascot components
│   ├── features/           # Feature modules
│   │   ├── tracing/        # Tracing business logic
│   │   └── progress/       # Progress tracking
│   ├── utils/              # Utility functions
│   │   ├── telemetry/      # Observability
│   │   └── storage/        # Data persistence
│   ├── hooks/              # Custom React hooks
│   └── constants/          # App constants
├── app/                    # Expo Router screens
├── assets/                 # Static assets
├── styles/                 # Global styles
├── __tests__/             # Test files
└── docs/                  # Documentation

```

## Architecture Principles

### 1. Separation of Concerns
- **Components**: UI rendering only
- **Features**: Business logic and state
- **Utils**: Pure functions and helpers

### 2. Observability First
- Structured logging on all critical paths
- Analytics tracking for user journeys
- Error boundaries around major features
- Performance monitoring for key operations

### 3. Type Safety
- TypeScript strict mode enabled
- Explicit types for all functions
- No `any` types in production code
- Type exports for shared interfaces

### 4. Testability
- Pure functions extracted for unit testing
- Component logic separated for testing
- Mock utilities for dependencies
- 80% minimum code coverage target

### 5. Accessibility
- Proper accessibility labels
- Touch-friendly tap targets (48x48px minimum)
- Screen reader support
- High contrast mode support (planned)

## Data Flow

```
User Input → Gesture Handler → Component State → Business Logic → Storage
                                      ↓
                              Analytics/Logging
```

### Tracing Flow
1. User touches screen
2. Gesture Handler captures touch points
3. Points converted to SVG path
4. Path rendered with selected color/thickness
5. Coverage calculated against guide dots
6. Progress updated
7. Analytics event logged

### Error Flow
1. Error occurs in component
2. Error Boundary catches error
3. Error logged to telemetry
4. Error tracked in analytics
5. User shown friendly error message
6. Option to retry provided

## Key Components

### ErrorBoundary
- Wraps screens and major features
- Catches React errors
- Shows child-friendly error UI
- Logs errors to telemetry

### Letter Tracing Components
- **LetterTracingPhase2.tsx**: Main tracing component
- **ColorPicker.tsx**: Color selection
- **ThicknessPicker.tsx**: Line thickness selection
- **DrawingToolbar.tsx**: Undo/redo/eraser/clear controls
- **TikoMascot.tsx**: Mascot animations
- **CelebrationOverlay.tsx**: Success feedback

## Telemetry System

### Logger
- Structured JSON logging
- Log levels: ERROR, WARN, INFO, DEBUG
- Automatic timestamp and service info
- Context injection

### Analytics
- Screen view tracking
- User action tracking
- Error tracking
- Custom event tracking
- Session management

### Error Tracker
- Error capture and reporting
- User context tracking
- Breadcrumb logging
- Integration ready for Sentry/Bugsnag

## State Management

### Local State (useState)
- Component-specific UI state
- Temporary interaction state
- Animation states

### Zustand (Planned)
- User progress tracking
- Settings and preferences
- Achievement state
- Cross-screen shared state

## Testing Strategy

### Unit Tests
- Pure functions in utils/
- Business logic in features/
- Coverage calculation
- Path smoothing
- Collision detection

### Component Tests
- Component rendering
- User interactions
- Prop handling
- Error states

### Integration Tests (Planned)
- Complete user flows
- Multi-step interactions
- State persistence

## Performance Considerations

### Current Optimizations
- Smooth path rendering
- Efficient collision detection
- Limited undo history (20 actions)
- Debounced calculations

### Planned Optimizations
- Memoization of expensive calculations
- Virtual rendering for large datasets
- Image optimization
- Bundle size reduction

## Security & Privacy

### Current Implementation
- No data collection
- Local-only storage
- No network requests (except assets)

### Future (When Adding Sync)
- Encrypted local storage
- Minimal data collection
- COPPA/GDPR-K compliance
- Parental consent flow

## Deployment

### Current
- Expo development builds
- Local testing
- Manual QA

### Planned
- CI/CD pipeline
- Automated testing
- Staged rollouts
- Crash reporting

## Compliance

### COPPA (Children's Online Privacy Protection Act)
- No personal information collection
- Parental consent required (future)
- Clear privacy policy
- No third-party advertising

## Future Enhancements

See BMAD-FRAMEWORK.md for detailed roadmap.

### Phase 3
- Progress dashboard
- Gamification system
- Words feature completion

### Phase 4
- Performance optimization
- Accessibility enhancements
- Comprehensive testing

## References

- [Holiday Extras Observability Policy](/mnt/project/telemetry-observability.md)
- [Holiday Extras Versioning Policy](/mnt/project/versioning-policy.md)
- [React Native Best Practices](https://reactnative.dev/docs/performance)
- [Expo Documentation](https://docs.expo.dev/)
