import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  
  title: {
    fontSize: 28,
    fontFamily: 'Fredoka-Bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 20,
  },
  
  controls: {
    flexDirection: 'row',
    gap: 12,
  },
  
  controlButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  controlButtonText: {
    color: '#ffffff',
    fontFamily: 'Fredoka-SemiBold',
    fontSize: 16,
  },
  
  wordContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  
  currentWord: {
    fontSize: 80,
    fontFamily: 'Fredoka-Bold',
    color: '#2D3748',
    textShadowColor: '#00000010',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 8,
  },
  
  tracingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  
  progressContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  
  progressText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
    textAlign: 'center',
  },
  
  lockImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  
  lockImage: {
    width: screenWidth * 0.6,
    height: 150,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  
  lockedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  
  lockedTitle: {
    fontSize: 32,
    fontFamily: 'Fredoka-Bold',
    color: '#718096',
    textAlign: 'center',
    marginBottom: 20,
  },
  
  lockedMessage: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#A0AEC0',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 40,
  },
  
  backButton: {
    backgroundColor: '#718096',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Fredoka-SemiBold',
  },
});