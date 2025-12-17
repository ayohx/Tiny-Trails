import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { theme } from '@/styles/theme';

interface ThicknessPickerProps {
  selectedThickness: number;
  onThicknessChange: (thickness: number) => void;
}

const THICKNESS_OPTIONS = [
  { id: 'thin', value: 4, label: 'Thin' },
  { id: 'medium', value: 8, label: 'Medium' },
  { id: 'thick', value: 12, label: 'Thick' },
  { id: 'extra-thick', value: 16, label: 'Extra' },
];

export default function ThicknessPicker({ selectedThickness, onThicknessChange }: ThicknessPickerProps) {
  return (
    <View style={styles.container}>
      {THICKNESS_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.thicknessButton,
            selectedThickness === option.value && styles.selectedButton,
          ]}
          onPress={() => onThicknessChange(option.value)}
          accessibilityLabel={`Select ${option.label} line thickness`}
        >
          <View style={styles.previewContainer}>
            <View
              style={[
                styles.thicknessLine,
                {
                  height: option.value / 2,
                  backgroundColor: selectedThickness === option.value 
                    ? theme.colors.primary 
                    : theme.colors.textSecondary,
                },
              ]}
            />
          </View>
          <Text style={[styles.label, selectedThickness === option.value && styles.selectedLabel]}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thicknessButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 8,
  },
  selectedButton: {
    borderColor: theme.colors.primary,
    borderWidth: 3,
    backgroundColor: theme.colors.primaryLight,
  },
  previewContainer: {
    width: '100%',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thicknessLine: {
    width: '80%',
    borderRadius: 10,
  },
  label: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    marginTop: 4,
    fontWeight: '600',
  },
  selectedLabel: {
    color: theme.colors.primary,
  },
});
