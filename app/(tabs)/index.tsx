import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RefreshCw, Volume2, Router } from 'lucide-react-native';
import LetterTracing from '@/components/LetterTracing';
import { styles } from '@/styles/letterStyles';
import { useProgressStore } from '@/store/progressStore';
import { playAudio } from '@/utils/audioUtils';
import { router } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function LettersTab() {
  const [currentLetter, setCurrentLetter] = useState('A');
  const [isUppercase, setIsUppercase] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const { completedLetters, completeLetterTracing, shouldShowWords } = useProgressStore();

  const getRandomLetter = () => {
    const availableLetters = LETTERS.filter(letter =>
      !completedLetters[isUppercase ? letter : letter.toLowerCase()]
    );

    if (availableLetters.length === 0) {
      // All letters completed, switch to lowercase if on uppercase
      if (isUppercase) {
        setIsUppercase(false);
        setCurrentLetter('a');
        return;
      }
    }

    const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
    setCurrentLetter(isUppercase ? randomLetter : randomLetter.toLowerCase());
  };

  const handleLetterComplete = () => {
    setShowCelebration(true);
    completeLetterTracing(currentLetter);

    // Play completion sound
    playAudio('success');

    // Show celebration for 2 seconds
    setTimeout(() => {
      setShowCelebration(false);
      getRandomLetter();
    }, 2000);
  };

  const handleNewLetter = () => {
    getRandomLetter();
  };

  const toggleCase = () => {
    setIsUppercase(!isUppercase);
    setCurrentLetter(isUppercase ? currentLetter.toLowerCase() : currentLetter.toUpperCase());
  };

  const navigateToWords = () => {
    router.push('/(tabs)/words');
  };

  useEffect(() => {
    getRandomLetter();
  }, [isUppercase]);

  if (shouldShowWords()) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#FFE5B4', '#FFB6C1', '#E0E6FF']}
          style={styles.background}
        />

        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.completionContainer}>
          <Text style={styles.completionTitle}>🎉 Congratulations! 🎉</Text>
          <Text style={styles.completionMessage}>
            You've mastered all the letters!{'\n'}Now it's time to learn words!
          </Text>
          <TouchableOpacity
            style={styles.wordsButton}
            onPress={navigateToWords}
          >
            <Text style={styles.wordsButtonText}>Start Learning Words</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFE5B4', '#FFB6C1', '#E0E6FF']}
        style={styles.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Learn to Write!</Text>
        <Text style={styles.subtitle}>
          Trace the {isUppercase ? 'uppercase' : 'lowercase'} letter
        </Text>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleCase}>
            <Text style={styles.controlButtonText}>
              {isUppercase ? 'Aa' : 'AA'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} onPress={handleNewLetter}>
            <RefreshCw size={20} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => playAudio('letter', currentLetter)}
          >
            <Volume2 size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Letter Display */}
      <View style={styles.letterContainer}>
        <Text style={styles.currentLetter}>{currentLetter}</Text>
      </View>

      {/* Tracing Area */}
      <View style={styles.tracingContainer}>
        <LetterTracing
          letter={currentLetter}
          onComplete={handleLetterComplete}
          showCelebration={showCelebration}
        />
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Letters completed: {Object.keys(completedLetters).length}/52
        </Text>
      </View>
    </View>
  );
}