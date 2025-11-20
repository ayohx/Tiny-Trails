import { StyleSheet, Dimensions } from 'react-native';
import { theme, getShadowStyle, getTextShadowStyle } from './theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    ...getShadowStyle(2, 0.1)
  },
  
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  
  header: {
    paddingTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    alignItems: 'center',
  },
  
  title: {
    fontSize: theme.typography.fontSize.xxlarge,
    fontFamily: theme.typography.fontFamily.heading,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  
  subtitle: {
    fontSize: theme.typography.fontSize.medium,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  
  controls: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  
  controlButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
    ...getShadowStyle(4, 0.15)
  },
  
  controlButtonText: {
    color: theme.colors.background,
    fontFamily: theme.typography.fontFamily.subheading,
    fontSize: theme.typography.fontSize.medium,
  },
  
  letterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    ...getShadowStyle(4, 0.2)
  },
  
  currentLetter: {
    fontSize: 120,
    fontFamily: theme.typography.fontFamily.heading,
    color: theme.colors.text,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    ...getTextShadowStyle(2, 0.1)
  },
  
  tracingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  
  progressContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  
  progressText: {
    fontSize: theme.typography.fontSize.medium,
    fontFamily: theme.typography.fontFamily.semibold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  
  heroContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  
  heroImage: {
    width: screenWidth * 0.8,
    height: 200,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  
  completionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  
  completionTitle: {
    fontSize: theme.typography.fontSize.xxlarge,
    fontFamily: theme.typography.fontFamily.heading,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  
  completionMessage: {
    fontSize: theme.typography.fontSize.large,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: theme.spacing.xl,
  },
  
  wordsButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  
  wordsButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.large,
    fontFamily: theme.typography.fontFamily.subheading,
    textAlign: 'center',
  },
  
  letterText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    ...getTextShadowStyle(2, 0.1)
  },
  
  button: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#4A90E2',
    marginTop: 20,
    ...getShadowStyle(4, 0.15)
  }
});