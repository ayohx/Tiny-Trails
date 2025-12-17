# Security and Privacy Policy

## Overview

Tiny Trails is an educational app designed for children. We take security and privacy seriously, especially when dealing with young users.

## Data Collection

### Current State (v1.0.0)
- **NO personal identifiable information (PII) is collected**
- **NO user accounts or authentication required**
- **NO data transmitted to external servers**
- All data stays on the device

### Local Storage
The app stores the following data locally:
- User progress (letters completed, coverage percentages)
- App settings and preferences
- Anonymous session IDs for error tracking (if enabled)

## Privacy by Design

### COPPA/GDPR-K Compliance
- No PII collection without parental consent
- No targeted advertising
- No social features or sharing without parental controls
- No third-party analytics (except crash reporting with anonymization)

### Data Minimization
- Only collect data necessary for app functionality
- Session IDs are randomly generated UUIDs (not tied to user identity)
- Error reports strip any potential PII before transmission

## Error Reporting & Telemetry

### Sentry (Crash Reporting)
When enabled, the app uses Sentry for crash reporting with:
- **Anonymous session IDs** (randomly generated)
- Device model and OS version (for compatibility)
- App version and crash stack traces
- **NO** email addresses
- **NO** IP addresses (stripped by configuration)
- **NO** user names or identifiers

### Analytics Events
Tracked events include:
- Letter/word completion (anonymous)
- Tool usage (color, thickness, eraser)
- Performance metrics (render times, gesture lag)
- **NO** behavioral tracking across sessions
- **NO** personally identifiable patterns

## Future Features (Requiring Consent)

If we add the following features, they will require explicit parental consent:
- **Cloud sync** - Progress sync across devices
- **Accounts** - User profiles for multiple children
- **Sharing** - Share drawings with others
- **In-app purchases** - Additional content or features

## Security Measures

### Current Implementation
- All sensitive data (if any) stored in encrypted AsyncStorage
- No hardcoded secrets or API keys in code
- Error boundaries prevent app crashes from exposing state
- Input validation on all user interactions

### Best Practices
- Regular dependency updates for security patches
- Code signing for app integrity
- Secure communication (HTTPS) if external APIs added
- Least privilege principle for device permissions

## Permissions

### Required Permissions
- **Storage** - Save progress and settings locally

### Optional Permissions (Future)
- **Camera** - Take photos to trace (with parental consent)
- **Microphone** - Voice recording features (with parental consent)
- **Internet** - Cloud sync (with parental consent)

## Parental Controls (Future)

When implemented, parents will be able to:
- Enable/disable error reporting
- Enable/disable cloud sync
- View all data collected
- Export or delete all data
- Restrict internet access
- Manage in-app purchases

## Data Retention

### Local Data
- Progress data: Retained until app uninstall or manual deletion
- Error logs: Maximum 30 days locally
- Session data: Cleared on app restart

### Remote Data (If Cloud Sync Enabled)
- User progress: Retained while account is active
- Deletion: Complete within 30 days of request
- Export: Available in machine-readable format (JSON)

## Security Incident Response

If a security issue is discovered:
1. Report to: security@tinytrails.app (when available)
2. We will respond within 48 hours
3. Critical issues will be patched within 7 days
4. Users will be notified of any data breaches

## Third-Party Services

### Currently Used
- **Sentry** (Error Tracking) - https://sentry.io/privacy/
  - Data minimization configured
  - PII stripping enabled
  - EU data residency available

### Future Considerations
All third-party services will be vetted for:
- COPPA/GDPR compliance
- Data minimization practices
- Clear privacy policies
- Data processing agreements

## Contact

For privacy or security concerns:
- Email: privacy@tinytrails.app (when available)
- GitHub Issues: Report security issues privately

## Updates

This policy was last updated: November 2024  
Version: 1.0.0

Changes to this policy will be:
- Documented in CHANGELOG.md
- Communicated via app update notes
- Require re-consent for material changes
