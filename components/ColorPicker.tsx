import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '@/styles/theme';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const COLORS = [
  { id: 'red', value: '#FF6B6B', name: 'Red' },
  { id: 'blue', value: '#4ECDC4', name: 'Blue' },
  { id: 'green', value: '#95E1D3', name: 'Green' },
  { id: 'yellow', value: '#FFE66D', name: 'Yellow' },
  { id: 'purple', value: '#A8E6CF', name: 'Purple' },
  { id: 'orange', value: '#FFB347', name: 'Orange' },
  { id: 'pink', value: '#FFB6D9', name: 'Pink' },
  { id: 'rainbow', value: 'rainbow', name: 'Rainbow' },
];

export default function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <View style={styles.container}>
      {COLORS.map((color) => (
        <TouchableOpacity
          key={color.id}
          style={[
            styles.colorButton,
            color.value === 'rainbow' && styles.rainbowButton,
            selectedColor === color.value && styles.selectedButton,
          ]}
          onPress={() => onColorChange(color.value)}
          accessibilityLabel={`Select ${color.name} color`}
        >
          <View
            style={[
              styles.colorCircle,
              color.value !== 'rainbow' && { backgroundColor: color.value },
              color.value === 'rainbow' && styles.rainbowGradient,
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedButton: {
    borderColor: theme.colors.primary,
    borderWidth: 3,
    transform: [{ scale: 1.1 }],
  },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  rainbowButton: {
    backgroundColor: theme.colors.background,
  },
  rainbowGradient: {
    backgroundColor: '#FF6B6B',
    // Note: For true rainbow gradient, we'll use LinearGradient from expo-linear-gradient
    // For now, using a representative color
  },
});
