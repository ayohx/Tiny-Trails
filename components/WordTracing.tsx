import React, { useState, useRef } from 'react';
import { View, Dimensions, PanResponder, Text } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence
} from '@/utils/animatedCompat';
import CelebrationOverlay from './CelebrationOverlay';
import { getWordPath, getWordDots } from '@/utils/wordPaths';
import { triggerHapticFeedback } from '@/utils/audioUtils';
import { styles } from '@/styles/tracingStyles';

const AnimatedView = Animated.View;

const { width: screenWidth } = Dimensions.get('window');
const TRACING_SIZE = Math.min(screenWidth - 40, 350);

interface WordTracingProps {
  word: string;
  onComplete: () => void;
  showCelebration: boolean;
}

export default function WordTracing({ word, onComplete, showCelebration }: WordTracingProps) {
  const [tracedDots, setTracedDots] = useState<Set<number>>(new Set());
  const [currentPath, setCurrentPath] = useState('');
  const [isTracing, setIsTracing] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(0);

  const scale = useSharedValue(1);

  const wordPaths = getWordPath(word);
  const wordDots = getWordDots(word);
  const totalDots = wordDots.reduce((sum, letterDots) => sum + letterDots.length, 0);

  const checkDotProximity = (x: number, y: number) => {
    const threshold = 25;
    const currentLetterDots = wordDots[currentLetter];
    if (!currentLetterDots) return -1;

    return currentLetterDots.findIndex(dot => {
      const distance = Math.sqrt(Math.pow(x - dot.x, 2) + Math.pow(y - dot.y, 2));
      return distance <= threshold && !tracedDots.has(dot.id);
    });
  };

  const addToPath = (x: number, y: number) => {
    setCurrentPath(prev => {
      if (prev === '') {
        return `M${x},${y}`;
      }
      return `${prev} L${x},${y}`;
    });
  };

  const handleTouchStart = (x: number, y: number) => {
    setIsTracing(true);
    const dotIndex = checkDotProximity(x, y);

    if (dotIndex !== -1) {
      const currentLetterDots = wordDots[currentLetter];
      setTracedDots(prev => new Set([...prev, currentLetterDots[dotIndex].id]));
      addToPath(x, y);

      triggerHapticFeedback();

      scale.value = withSequence(
        withSpring(0.95),
        withSpring(1.05),
        withSpring(1)
      );
    }
  };

  const handleTouchMove = (x: number, y: number) => {
    const dotIndex = checkDotProximity(x, y);

    if (dotIndex !== -1) {
      const currentLetterDots = wordDots[currentLetter];
      setTracedDots(prev => {
        const newSet = new Set([...prev, currentLetterDots[dotIndex].id]);

        // Check if current letter is complete
        const currentLetterComplete = currentLetterDots.every(dot => newSet.has(dot.id));
        if (currentLetterComplete && currentLetter < word.length - 1) {
          setCurrentLetter(prev => prev + 1);
          setCurrentPath('');
        } else if (currentLetterComplete && currentLetter === word.length - 1) {
          // Word complete
          setTimeout(() => {
            onComplete();
            setTracedDots(new Set());
            setCurrentPath('');
            setCurrentLetter(0);
          }, 500);
        }

        return newSet;
      });
      addToPath(x, y);
      triggerHapticFeedback();
    } else if (isTracing) {
      addToPath(x, y);
    }
  };

  const handleTouchEnd = () => {
    setIsTracing(false);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        handleTouchStart(locationX, locationY);
      },

      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        handleTouchMove(locationX, locationY);
      },

      onPanResponderRelease: () => {
        handleTouchEnd();
      },
    })
  ).current;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getRainbowColor = (index: number, total: number) => {
    const hue = (index / total) * 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.wordProgress}>
        <Text style={styles.wordProgressText}>
          Letter {currentLetter + 1} of {word.length}: {word[currentLetter]?.toUpperCase()}
        </Text>
      </View>

      <AnimatedView style={[styles.tracingArea, animatedStyle]}>
        <View {...panResponder.panHandlers} style={styles.touchArea}>
          <Svg width={TRACING_SIZE} height={TRACING_SIZE} viewBox={`0 0 ${TRACING_SIZE} ${TRACING_SIZE}`}>
            <Defs>
              <LinearGradient id="wordRainbow" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#FF6B6B" />
                <Stop offset="25%" stopColor="#4ECDC4" />
                <Stop offset="50%" stopColor="#45B7D1" />
                <Stop offset="75%" stopColor="#96CEB4" />
                <Stop offset="100%" stopColor="#FFEAA7" />
              </LinearGradient>
            </Defs>

            {/* Word outline paths */}
            {wordPaths.map((path, index) => (
              <Path
                key={index}
                d={path}
                stroke={index === currentLetter ? "#9CA3AF" : "#E5E7EB"}
                strokeWidth="3"
                fill="none"
                strokeDasharray="10,5"
                opacity={index === currentLetter ? 0.8 : 0.3}
              />
            ))}

            {/* Guide dots for current letter */}
            {wordDots[currentLetter]?.map((dot, index) => (
              <Circle
                key={dot.id}
                cx={dot.x}
                cy={dot.y}
                r={tracedDots.has(dot.id) ? 0 : 8}
                fill={tracedDots.has(dot.id) ? getRainbowColor(index, wordDots[currentLetter].length) : "#D1D5DB"}
                opacity={tracedDots.has(dot.id) ? 0.8 : 0.5}
              />
            ))}

            {/* Traced path */}
            {currentPath && (
              <Path
                d={currentPath}
                stroke="url(#wordRainbow)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.9}
              />
            )}
          </Svg>
        </View>
      </AnimatedView>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(tracedDots.size / totalDots) * 100}%` }
            ]}
          />
        </View>
      </View>

      {showCelebration && <CelebrationOverlay />}
    </View>
  );
}