import React, { useState, useRef } from 'react';
import { View, Dimensions, PanResponder, Platform } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming
} from '@/utils/animatedCompat';
import CelebrationOverlay from './CelebrationOverlay';
import { theme } from '@/styles/theme';
import { getLetterPath, getLetterDots } from '@/utils/letterPaths';
import { triggerHapticFeedback } from '@/utils/audioUtils';
import { styles } from '@/styles/tracingStyles';
import TikoMascot from './TikoMascot';

const AnimatedView = Animated.View;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const TRACING_SIZE = Math.min(screenWidth - 40, 300);

interface LetterTracingProps {
  letter: string;
  onComplete: () => void;
  showCelebration: boolean;
}

export default function LetterTracing({ letter, onComplete, showCelebration }: LetterTracingProps) {
  const [tracedDots, setTracedDots] = useState<Set<number>>(new Set());
  const [currentPath, setCurrentPath] = useState('');
  const [isTracing, setIsTracing] = useState(false);
  const [mascotState, setMascotState] = useState<'idle' | 'active' | 'success'>('idle');

  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const letterPath = getLetterPath(letter);
  const letterDots = getLetterDots(letter);
  const totalDots = letterDots.length;

  const checkDotProximity = (x: number, y: number) => {
    const threshold = 25;
    return letterDots.findIndex(dot => {
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
    setMascotState('active');
    const dotIndex = checkDotProximity(x, y);

    if (dotIndex !== -1) {
      setTracedDots(prev => new Set([...prev, letterDots[dotIndex].id]));
      addToPath(x, y);
      triggerHapticFeedback();

      scale.value = withSequence(
        withSpring(theme.mascot.states.active.scale),
        withSpring(1)
      );
    }
  };

  const handleTouchMove = (x: number, y: number) => {
    const dotIndex = checkDotProximity(x, y);

    if (dotIndex !== -1) {
      setTracedDots(prev => {
        const newSet = new Set([...prev, letterDots[dotIndex].id]);

        if (newSet.size === totalDots) {
          setMascotState('success');
          setTimeout(() => {
            onComplete();
            setTracedDots(new Set());
            setCurrentPath('');
            setMascotState('idle');
          }, 1000);
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
    setMascotState('idle');
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
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
  }));

  return (
    <View style={styles.container}>
      <AnimatedView style={[styles.tracingArea, animatedStyle]}>
        <View {...panResponder.panHandlers} style={styles.touchArea}>
          <Svg width={TRACING_SIZE} height={TRACING_SIZE} viewBox={`0 0 ${TRACING_SIZE} ${TRACING_SIZE}`}>
            <Defs>
              <LinearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
                {theme.colors.rainbow.map((color, index) => (
                  <Stop
                    key={index}
                    offset={`${(index / (theme.colors.rainbow.length - 1)) * 100}%`}
                    stopColor={color}
                  />
                ))}
              </LinearGradient>
            </Defs>

            {/* Letter outline */}
            <Path
              d={letterPath}
              stroke={theme.colors.border}
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,5"
              opacity={0.6}
            />

            {/* Guide dots */}
            {letterDots.map((dot, index) => (
              <Circle
                key={dot.id}
                cx={dot.x}
                cy={dot.y}
                r={tracedDots.has(dot.id) ? 0 : 8}
                fill={tracedDots.has(dot.id)
                  ? theme.colors.rainbow[index % theme.colors.rainbow.length]
                  : theme.colors.border}
                opacity={tracedDots.has(dot.id) ? 0.8 : 0.5}
              />
            ))}

            {/* Traced path with rainbow effect */}
            {currentPath && (
              <Path
                d={currentPath}
                stroke="url(#rainbow)"
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
              {
                width: `${(tracedDots.size / totalDots) * 100}%`,
                backgroundColor: theme.colors.primary
              }
            ]}
          />
        </View>
      </View>

      {/* Tiko Mascot */}
      <TikoMascot
        state={mascotState}
        style={styles.mascot}
      />

      {showCelebration && <CelebrationOverlay />}
    </View>
  );
}