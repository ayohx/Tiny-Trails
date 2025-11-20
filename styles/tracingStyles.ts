import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md
  },
  
  tracingArea: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.lg
  },
  
  touchArea: {
    width: '100%',
    height: '100%'
  },
  
  progressContainer: {
    width: '100%',
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md
  },
  
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: 'hidden'
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4
  },

  coverageTextContainer: {
    marginTop: theme.spacing.sm,
    alignItems: 'center'
  },

  coverageText: {
    fontSize: theme.typography.fontSize.medium,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text
  },
  
  mascot: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
    width: 80,
    height: 80
  },
  
  wordProgress: {
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  wordProgressText: {
    fontSize: 16,
    fontFamily: 'Fredoka-SemiBold',
    color: '#4A5568',
    textAlign: 'center',
  },
});