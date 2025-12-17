/**
 * Root Layout
 * Initializes app-wide telemetry and error handling
 */

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { initializeTelemetry, logger } from '@/utils/telemetry';

export default function RootLayout() {
  useEffect(() => {
    // Initialize telemetry on app start
    initializeTelemetry();
    logger.info('App initialized');
  }, []);

  return (
    <ErrorBoundary>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ErrorBoundary>
  );
}
