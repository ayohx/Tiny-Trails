import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

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
    paddingBottom: 30,
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
  },
  
  progressCards: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 30,
  },
  
  progressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  
  lockedCard: {
    backgroundColor: '#F7FAFC',
    opacity: 0.7,
  },
  
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Fredoka-SemiBold',
    color: '#2D3748',
  },
  
  lockedText: {
    color: '#9CA3AF',
  },
  
  progressNumber: {
    fontSize: 36,
    fontFamily: 'Fredoka-Bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 6,
  },
  
  progressLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
  },
  
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Fredoka-SemiBold',
    color: '#2D3748',
    marginBottom: 16,
  },
  
  noAchievements: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  
  noAchievementsText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
  },
  
  achievementCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 16,
  },
  
  achievementIcon: {
    fontSize: 32,
  },
  
  achievementContent: {
    flex: 1,
  },
  
  achievementTitle: {
    fontSize: 18,
    fontFamily: 'Fredoka-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
  },
  
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  
  statNumber: {
    fontSize: 28,
    fontFamily: 'Fredoka-Bold',
    color: '#4ECDC4',
    marginBottom: 8,
  },
  
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    textAlign: 'center',
  },
  
  resetSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  
  resetButton: {
    backgroundColor: '#E53E3E',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Fredoka-SemiBold',
  },
});