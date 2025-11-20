import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  
  title: {
    fontSize: 36,
    fontFamily: 'Fredoka-Bold',
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 12,
  },
  
  message: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
    textAlign: 'center',
  },
  
  particle: {
    position: 'absolute',
    fontSize: 24,
    zIndex: 999,
  },
});