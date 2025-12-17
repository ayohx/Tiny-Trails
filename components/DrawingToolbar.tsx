import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/styles/theme';

interface DrawingToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isEraserMode: boolean;
  onToggleEraser: () => void;
}

export default function DrawingToolbar({
  onUndo,
  onRedo,
  onClear,
  canUndo,
  canRedo,
  isEraserMode,
  onToggleEraser,
}: DrawingToolbarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity
          style={[styles.button, !canUndo && styles.buttonDisabled]}
          onPress={onUndo}
          disabled={!canUndo}
          accessibilityLabel="Undo last action"
        >
          <Ionicons 
            name="arrow-undo" 
            size={24} 
            color={canUndo ? theme.colors.primary : theme.colors.disabled} 
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !canRedo && styles.buttonDisabled]}
          onPress={onRedo}
          disabled={!canRedo}
          accessibilityLabel="Redo last action"
        >
          <Ionicons 
            name="arrow-redo" 
            size={24} 
            color={canRedo ? theme.colors.primary : theme.colors.disabled} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.centerSection}>
        <TouchableOpacity
          style={[styles.button, styles.eraserButton, isEraserMode && styles.eraserActive]}
          onPress={onToggleEraser}
          accessibilityLabel={isEraserMode ? "Switch to draw mode" : "Switch to eraser mode"}
        >
          <Ionicons 
            name={isEraserMode ? "brush" : "trash-bin"} 
            size={24} 
            color={isEraserMode ? theme.colors.background : theme.colors.primary} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={onClear}
          accessibilityLabel="Clear all strokes"
        >
          <Ionicons name="refresh" size={24} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  leftSection: {
    flexDirection: 'row',
    gap: 10,
  },
  centerSection: {
    flexDirection: 'row',
  },
  rightSection: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  eraserButton: {
    backgroundColor: theme.colors.primaryLight,
  },
  eraserActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  clearButton: {
    backgroundColor: theme.colors.errorLight,
  },
});
