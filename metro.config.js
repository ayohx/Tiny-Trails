// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Aggressively reduce file watching to prevent EMFILE errors
config.watchFolders = [
  path.resolve(__dirname, 'app'),
  path.resolve(__dirname, 'components'),
  path.resolve(__dirname, 'store'),
  path.resolve(__dirname, 'utils'),
  path.resolve(__dirname, 'styles'),
  path.resolve(__dirname, 'assets'),
];
config.resolver = {
  ...config.resolver,
  blacklistRE: /node_modules\/.*\/node_modules\/.*/,
  sourceExts: ['tsx', 'ts', 'jsx', 'js', 'json'],
};
config.watcher = {
  ...config.watcher,
  additionalExts: ['tsx', 'ts'],
  watchman: {
    deferStates: ['hg.update'],
  },
  healthCheck: {
    enabled: true,
    interval: 10000,
    timeout: 5000,
  },
};

// Configure transformer for better web compatibility
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

module.exports = config; 