import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RefreshCw, Volume2, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import WordTracing from '@/components/WordTracing';
import { styles } from '@/styles/wordStyles';
import { useProgressStore } from '@/store/progressStore';
import { playAudio } from '@/utils/audioUtils';

const TWO_LETTER_WORDS = [
  'AT', 'BE', 'GO', 'HE', 'IF', 'IN', 'IS', 'IT', 'MY', 'NO',
  'OF', 'ON', 'OR', 'SO', 'TO', 'UP', 'WE', 'BY', 'DO', 'AM'
];

export default function WordsTab() {
  const [currentWord, setCurrentWord] = useState('AT');
  const [isUppercase, setIsUppercase] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const { completedWords, completeWordTracing, shouldShowWords } = useProgressStore();

  const getRandomWord = () => {
    const availableWords = TWO_LETTER_WORDS.filter(word => 
      !completedWords[isUppercase ? word : word.toLowerCase()]
    );
    
    if (availableWords.length === 0) {
      if (isUppercase) {
        setIsUppercase(false);
        setCurrentWord('at');
        return;
      }
    }
    
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    setCurrentWord(isUppercase ? randomWord : randomWord.toLowerCase());
  };

  const handleWordComplete = () => {
    setShowCelebration(true);
    completeWordTracing(currentWord);
    
    playAudio('success');
    
    setTimeout(() => {
      setShowCelebration(false);
      getRandomWord();
    }, 2500);
  };

  const handleNewWord = () => {
    getRandomWord();
  };

  const toggleCase = () => {
    setIsUppercase(!isUppercase);
    setCurrentWord(isUppercase ? currentWord.toLowerCase() : currentWord.toUpperCase());
  };

  const navigateToLetters = () => {
    router.push('/(tabs)/');
  };

  useEffect(() => {
    getRandomWord();
  }, [isUppercase]);

  if (!shouldShowWords()) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#FFE5B4', '#FFB6C1', '#E0E6FF']}
          style={styles.background}
        />
        
        {/* Lock Image */}
        <View style={styles.lockImageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.lockImage}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.lockedContainer}>
          <Text style={styles.lockedTitle}>🔒 Words Locked</Text>
          <Text style={styles.lockedMessage}>
            Complete all letters first{'\n'}to unlock word tracing!
          </Text>
          <TouchableOpacity style={styles.backButton} onPress={navigateToLetters}>
            <ArrowLeft size={20} color="#ffffff" />
            <Text style={styles.backButtonText}>Back to Letters</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E0E6FF', '#FFB6C1', '#FFE5B4']}
        style={styles.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Write Words!</Text>
        <Text style={styles.subtitle}>
          Trace the {isUppercase ? 'uppercase' : 'lowercase'} word
        </Text>
        
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleCase}>
            <Text style={styles.controlButtonText}>
              {isUppercase ? 'Aa' : 'AA'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={handleNewWord}>
            <RefreshCw size={20} color="#ffffff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.controlButton} 
            onPress={() => playAudio('word', currentWord)}
          >
            <Volume2 size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Word Display */}
      <View style={styles.wordContainer}>
        <Text style={styles.currentWord}>{currentWord}</Text>
      </View>

      {/* Tracing Area */}
      <View style={styles.tracingContainer}>
        <WordTracing
          word={currentWord}
          onComplete={handleWordComplete}
          showCelebration={showCelebration}
        />
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Words completed: {Object.keys(completedWords).length}/40
        </Text>
      </View>
    </View>
  );
}