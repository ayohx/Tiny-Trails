import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Star, Target, RotateCcw } from 'lucide-react-native';
import { styles } from '@/styles/progressStyles';
import { useProgressStore } from '@/store/progressStore';

export default function ProgressTab() {
  const { completedLetters, completedWords, resetProgress, shouldShowWords } = useProgressStore();

  const letterProgress = Object.keys(completedLetters).length;
  const wordProgress = Object.keys(completedWords).length;
  const totalLetters = 52; // 26 uppercase + 26 lowercase
  const totalWords = 40; // 20 uppercase + 20 lowercase

  const getAchievements = () => {
    const achievements = [];
    
    if (letterProgress >= 10) {
      achievements.push({ title: 'First Steps', description: '10 letters completed!', icon: '🌟' });
    }
    if (letterProgress >= 26) {
      achievements.push({ title: 'Alphabet Master', description: 'All uppercase letters!', icon: '🎯' });
    }
    if (letterProgress >= 52) {
      achievements.push({ title: 'Letter Champion', description: 'All letters mastered!', icon: '🏆' });
    }
    if (wordProgress >= 5) {
      achievements.push({ title: 'Word Explorer', description: '5 words completed!', icon: '📚' });
    }
    if (wordProgress >= 20) {
      achievements.push({ title: 'Word Master', description: '20 words completed!', icon: '✨' });
    }
    if (wordProgress >= 40) {
      achievements.push({ title: 'Writing Champion', description: 'All words mastered!', icon: '👑' });
    }
    
    return achievements;
  };

  const achievements = getAchievements();

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#E0E6FF', '#FFE5B4', '#FFB6C1']}
        style={styles.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Keep up the great work!</Text>
      </View>

      {/* Progress Cards */}
      <View style={styles.progressCards}>
        {/* Letter Progress */}
        <View style={styles.progressCard}>
          <View style={styles.cardHeader}>
            <Star size={24} color="#FF6B6B" />
            <Text style={styles.cardTitle}>Letters</Text>
          </View>
          <Text style={styles.progressNumber}>{letterProgress}/52</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${(letterProgress / totalLetters) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressLabel}>
            {Math.round((letterProgress / totalLetters) * 100)}% Complete
          </Text>
        </View>

        {/* Word Progress */}
        <View style={[styles.progressCard, !shouldShowWords() && styles.lockedCard]}>
          <View style={styles.cardHeader}>
            <Target size={24} color={shouldShowWords() ? "#4ECDC4" : "#9CA3AF"} />
            <Text style={[styles.cardTitle, !shouldShowWords() && styles.lockedText]}>
              Words {!shouldShowWords() && '🔒'}
            </Text>
          </View>
          <Text style={[styles.progressNumber, !shouldShowWords() && styles.lockedText]}>
            {wordProgress}/40
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { 
                  width: shouldShowWords() ? `${(wordProgress / totalWords) * 100}%` : '0%',
                  backgroundColor: shouldShowWords() ? "#4ECDC4" : "#9CA3AF"
                }
              ]} 
            />
          </View>
          <Text style={[styles.progressLabel, !shouldShowWords() && styles.lockedText]}>
            {shouldShowWords() 
              ? `${Math.round((wordProgress / totalWords) * 100)}% Complete`
              : 'Complete all letters to unlock'
            }
          </Text>
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>🏆 Achievements</Text>
        {achievements.length === 0 ? (
          <View style={styles.noAchievements}>
            <Text style={styles.noAchievementsText}>
              Start tracing letters to earn your first achievement!
            </Text>
          </View>
        ) : (
          achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Stats */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>📊 Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{letterProgress + wordProgress}</Text>
            <Text style={styles.statLabel}>Total Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{achievements.length}</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
        </View>
      </View>

      {/* Reset Button */}
      <View style={styles.resetSection}>
        <TouchableOpacity style={styles.resetButton} onPress={resetProgress}>
          <RotateCcw size={20} color="#ffffff" />
          <Text style={styles.resetButtonText}>Reset Progress</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}