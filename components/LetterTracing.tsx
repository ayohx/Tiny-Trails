import React, { useState, useRef, useCallback } from 'react';
import { View, Dimensions, Text } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  createAnimatedComponent,
} from '@/utils/animatedCompat';
import CelebrationOverlay from './CelebrationOverlay';
import { theme } from '@/styles/theme';
import { getLetterPath, getLetterDots } from '@/utils/letterPaths';
import { triggerHapticFeedback } from '@/utils/audioUtils';
import { styles } from '@/styles/tracingStyles';
import TikoMascot from './TikoMascot';
import {
  Point,
  smoothPath,
  simplifyPath,
  pointsToSvgPath,
  isPointNearPath,
  calculatePathCoverage,
  getStrokeVelocity,
  shouldAddPoint,
} from '@/utils/pathSmoothing';

const AnimatedView = Animated.View;
const AnimatedText = createAnimatedComponent(Text);

const { width: screenWidth } = Dimensions.get('window');
const TRACING_SIZE = Math.min(screenWidth - 40, 300);
const COMPLETION_THRESHOLD = 75; // 75% coverage needed
const PATH_TOLERANCE = 30; // Pixels tolerance for path matching

interface LetterTracingProps {
  letter: string;
  onComplete: () => void;
  showCelebration: boolean;
}

export default function LetterTracing({ letter, onComplete, showCelebration }: LetterTracingProps) {
  // Path tracking state
  const [rawPoints, setRawPoints] = useState<Point[]>([]);
  const [smoothedPath, setSmoothedPath] = useState<string>('');
  const [isTracing, setIsTracing] = useState(false);
  const [coverage, setCoverage] = useState(0);
  const [mascotState, setMascotState] = useState<'idle' | 'active' | 'success'>('idle');

  // Animation values
  const scale = useSharedValue(1);
  const pathOpacity = useSharedValue(1);

  // References
  const lastPoint = useRef<Point | null>(null);
  const strokeStartTime = useRef<number>(0);

  // Get letter data
  const letterPath = getLetterPath(letter);
  const letterDots = getLetterDots(letter);

  /**
   * Add point to the drawing path with smoothing
   */
  const addPoint = useCallback((x: number, y: number) => {
    const timestamp = Date.now();
    const newPoint: Point = { x, y, timestamp };

    setRawPoints((prev) => {
      // Check if we should add this point based on distance and velocity
      if (prev.length > 0) {
        const velocity = getStrokeVelocity([...prev, newPoint]);
        if (!shouldAddPoint(prev[prev.length - 1], newPoint, velocity)) {
          return prev;
        }
      }

      const updatedPoints = [...prev, newPoint];

      // Smooth the path if we have enough points
      if (updatedPoints.length >= 3) {
        const simplified = simplifyPath(updatedPoints, 2);
        const smoothed = smoothPath(simplified, 5);
        const pathString = pointsToSvgPath(smoothed);
        setSmoothedPath(pathString);

        // Calculate coverage
        const coveragePercent = calculatePathCoverage(smoothed, letterDots, PATH_TOLERANCE);
        setCoverage(coveragePercent);

        // Check for completion
        if (coveragePercent >= COMPLETION_THRESHOLD) {
          handleComplete();
        }
      } else {
        // For first few points, draw straight lines
        setSmoothedPath(pointsToSvgPath(updatedPoints));
      }

      lastPoint.current = newPoint;
      return updatedPoints;
    });
  }, [letterDots]);

  /**
   * Handle completion of letter tracing
   */
  const handleComplete = useCallback(() => {
    setMascotState('success');
    triggerHapticFeedback('success');

    scale.value = withSequence(
      withSpring(1.2),
      withSpring(1)
    );

    setTimeout(() => {
      onComplete();
      resetPath();
    }, 1500);
  }, [onComplete, scale]);

  /**
   * Reset the drawing path
   */
  const resetPath = useCallback(() => {
    setRawPoints([]);
    setSmoothedPath('');
    setCoverage(0);
    setMascotState('idle');
    lastPoint.current = null;
  }, []);

  /**
   * Gesture handlers for smooth touch/mouse input
   */
  const panGesture = Gesture.Pan()
    .onStart((event) => {
      setIsTracing(true);
      setMascotState('active');
      strokeStartTime.current = Date.now();
      addPoint(event.x, event.y);
    })
    .onUpdate((event) => {
      if (isTracing) {
        addPoint(event.x, event.y);
      }
    })
    .onEnd(() => {
      setIsTracing(false);
      setMascotState('idle');
    })
    .onFinalize(() => {
      setIsTracing(false);
      setMascotState('idle');
    });

  /**
   * Get feedback color based on coverage
   */
  const getFeedbackColor = (): string => {
    if (coverage < 30) return theme.colors.error;
    if (coverage < 60) return theme.colors.warning;
    if (coverage < COMPLETION_THRESHOLD) return theme.colors.info;
    return theme.colors.success;
  };

  /**
   * Determine if point is on the correct path
   */
  const isOnPath = useCallback((point: Point): boolean => {
    return isPointNearPath(point, letterDots, PATH_TOLERANCE);
  }, [letterDots]);

  /**
   * Animated styles
   */
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pathAnimatedStyle = useAnimatedStyle(() => ({
    opacity: pathOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <AnimatedView style={[styles.tracingArea, animatedStyle]}>
        <GestureDetector gesture={panGesture}>
          <View style={styles.touchArea}>
            <Svg
              width={TRACING_SIZE}
              height={TRACING_SIZE}
              viewBox={`0 0 ${TRACING_SIZE} ${TRACING_SIZE}`}
            >
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
                <LinearGradient id="glow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor={getFeedbackColor()} stopOpacity="0.8" />
                  <Stop offset="100%" stopColor={getFeedbackColor()} stopOpacity="0.3" />
                </LinearGradient>
              </Defs>

              <G>
                {/* Letter outline - guide path */}
                <Path
                  d={letterPath}
                  stroke={theme.colors.border}
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="10,5"
                  opacity={0.4}
                />

                {/* Glowing guide when tracing */}
                {isTracing && (
                  <Path
                    d={letterPath}
                    stroke="url(#glow)"
                    strokeWidth="8"
                    fill="none"
                    opacity={0.3}
                  />
                )}

                {/* Guide dots - start and key points */}
                {letterDots.map((dot, index) => {
                  // Show only start dot and every 5th dot for guidance
                  const shouldShow = index === 0 || index % 5 === 0;
                  if (!shouldShow) return null;

                  const isCovered = rawPoints.some(
                    (p) => Math.sqrt(Math.pow(p.x - dot.x, 2) + Math.pow(p.y - dot.y, 2)) < PATH_TOLERANCE
                  );

                  return (
                    <Circle
                      key={dot.id}
                      cx={dot.x}
                      cy={dot.y}
                      r={index === 0 ? 12 : 8}
                      fill={isCovered ? theme.colors.success : theme.colors.primary}
                      opacity={isCovered ? 0.3 : 0.6}
                      stroke={index === 0 ? theme.colors.primary : 'none'}
                      strokeWidth={index === 0 ? 3 : 0}
                    />
                  );
                })}

                {/* User's traced path with rainbow gradient */}
                {smoothedPath && (
                  <Path
                    d={smoothedPath}
                    stroke="url(#rainbow)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.9}
                  />
                )}

                {/* Drawing cursor when active */}
                {isTracing && lastPoint.current && (
                  <Circle
                    cx={lastPoint.current.x}
                    cy={lastPoint.current.y}
                    r={6}
                    fill={getFeedbackColor()}
                    opacity={0.7}
                  />
                )}
              </G>
            </Svg>
          </View>
        </GestureDetector>
      </AnimatedView>

      {/* Progress indicator with visual feedback */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              pathAnimatedStyle,
              {
                width: `${Math.min(coverage, 100)}%`,
                backgroundColor: getFeedbackColor(),
              },
            ]}
          />
        </View>
        <View style={styles.coverageTextContainer}>
          <AnimatedText style={[styles.coverageText, { color: getFeedbackColor() }]}>
            {Math.round(coverage)}% Complete
          </AnimatedText>
        </View>
      </View>

      {/* Tiko Mascot */}
      <TikoMascot state={mascotState} style={styles.mascot} />

      {/* Celebration overlay */}
      {showCelebration && <CelebrationOverlay />}
    </View>
  );
}
