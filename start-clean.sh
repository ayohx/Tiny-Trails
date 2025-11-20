#!/bin/bash
# Clean start script for Expo

# Kill any lingering processes
pkill -9 -f "expo|metro" 2>/dev/null

# Increase file limit
ulimit -n 10240

# Clean caches
rm -rf .expo node_modules/.cache 2>/dev/null

# Start expo
cd "$(dirname "$0")"
npx expo start --web --clear
