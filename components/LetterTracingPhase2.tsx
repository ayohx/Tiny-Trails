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
import ColorPicker from './ColorPicker';
import ThicknessPicker from './ThicknessPicker';
import DrawingToolbar from './DrawingToolbar';
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
const COMPLETION_THRESHOLD = 75;
const PATH_TOLERANCE = 30;
const MAX_HISTORY = 20;

// Enhanced Stroke interface with Phase 2 properties
interface Stroke {
  points: Point[];
  path: string;
  color: string;
  thickness: number;
  timestamp: number;
}

interface LetterTracingProps {
  letter: string;
  onComplete: () => void;
  showCelebration: boolean;
}

export default function LetterTracing({ letter, onComplete, showCelebration }: LetterTracingProps) {
  // Phase 2: Enhanced stroke state with color and thickness
  const [allStrokes, setAllStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [currentStrokePath, setCurrentStrokePath] = useState<string>('');
  const [isTracing, setIsTracing] = useState(false);
  const [coverage, setCoverage] = useState(0);
  const [mascotState, setMascotState] = useState<'idle' | 'active' | 'success'>('idle');
  
  // Phase 2: Tool state
  const [selectedColor, setSelectedColor] = useState<string>('rainbow');
  const [selectedThickness, setSelectedThickness] = useState<number>(8);
  const [isEraserMode, setIsEraserMode] = useState(false);
  
  // Phase 2: Undo/Redo history
  const [undoStack, setUndoStack] = useState<Stroke[][]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[][]>([]);

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
   * Phase 2: Save state to undo stack
   */
  const saveToUndoStack = useCallback(() => {
    setUndoStack(prev => {
      const newStack = [...prev, allStrokes];
      // Limit history to MAX_HISTORY
      if (newStack.length > MAX_HISTORY) {
        return newStack.slice(-MAX_HISTORY);
      }
      return newStack;
    });
    // Clear redo stack on new action
    setRedoStack([]);
  }, [allStrokes]);

  /**
   * Phase 2: Undo action
   */
  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;
    
    const previousState = undoStack[undoStack.length - 1];
    setRedoStack(prev => [...prev, allStrokes]);
    setUndoStack(prev => prev.slice(0, -1));
    setAllStrokes(previousState);
    
    // Recalculate coverage
    const allPoints = previousState.flatMap(s => s.points);
    const newCoverage = calculatePathCoverage(allPoints, letterDots, PATH_TOLERANCE);
    setCoverage(newCoverage);
    
    triggerHapticFeedback('light');
  }, [undoStack, allStrokes, letterDots]);

  /**
   * Phase 2: Redo action
   */
  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;
    
    const nextState = redoStack[redoStack.length - 1];
    setUndoStack(prev => [...prev, allStrokes]);
    setRedoStack(prev => prev.slice(0, -1));
    setAllStrokes(nextState);
    
    // Recalculate coverage
    const allPoints = nextState.flatMap(s => s.points);
    const newCoverage = calculatePathCoverage(allPoints, letterDots, PATH_TOLERANCE);
    setCoverage(newCoverage);
    
    triggerHapticFeedback('light');
  }, [redoStack, allStrokes, letterDots]);

  /**
   * Phase 2: Clear all strokes
   */
  const handleClear = useCallback(() => {
    if (allStrokes.length === 0) return;
    
    saveToUndoStack();
    setAllStrokes([]);
    setCoverage(0);
    setMascotState('idle');
    triggerHapticFeedback('warning');
  }, [allStrokes, saveToUndoStack]);

  /**
   * Add point to the drawing path with smoothing
   */
  const addPoint = useCallback((x: number, y: number) => {
    const timestamp = Date.now();
    const newPoint: Point = { x, y, timestamp };

    setCurrentStroke((prev) => {
      if (prev.length > 0) {
        const velocity = getStrokeVelocity([...prev, newPoint]);
        if (!shouldAddPoint(prev[prev.length - 1], newPoint, velocity)) {
          return prev;
        }
      }

      const updatedStroke = [...prev, newPoint];

      // Smooth path
      if (updatedStroke.length >= 3) {
        const simplified = simplifyPath(updatedStroke, 2);
        const smoothed = smoothPath(simplified, 5);
        const pathString = pointsToSvgPath(smoothed);
        setCurrentStrokePath(pathString);
      } else {
        const pathString = pointsToSvgPath(updatedStroke);
        setCurrentStrokePath(pathString);
      }

      // Calculate coverage with all strokes + current stroke
      const allPoints = [...allStrokes.flatMap(s => s.points), ...updatedStroke];
      const coveragePercent = calculatePathCoverage(allPoints, letterDots, PATH_TOLERANCE);
      setCoverage(coveragePercent);

      if (coveragePercent >= COMPLETION_THRESHOLD) {
        handleComplete();
      }

      lastPoint.current = newPoint;
      return updatedStroke;
    });
  }, [allStrokes, letterDots]);

  /**
   * Handle completion
   */
  const handleComplete = useCallback(() => {
    setMascotState('success');
    triggerHapticFeedback('success');

    scale.value = withSequence(withSpring(1.2), withSpring(1));

    setTimeout(() => {
      onComplete();
      resetPath();
    }, 1500);
  }, [onComplete, scale]);

  /**
   * Reset path
   */
  const resetPath = useCallback(() => {
    setAllStrokes([]);
    setCurrentStroke([]);
    setCurrentStrokePath('');
    setCoverage(0);
    setMascotState('idle');
    setUndoStack([]);
    setRedoStack([]);
    lastPoint.current = null;
  }, []);

  /**
   * Phase 2: Handle eraser collision detection
   */
  const handleEraser = useCallback((x: number, y: number) => {
    const eraserRadius = selectedThickness * 2;
    
    setAllStrokes(prev => {
      const remaining = prev.filter(stroke => {
        // Check if any point in stroke is within eraser radius
        return !stroke.points.some(point => {
          const distance = Math.sqrt(
            Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)
          );
          return distance < eraserRadius;
        });
      });
      
      if (remaining.length !== prev.length) {
        saveToUndoStack();
        triggerHapticFeedback('light');
        
        // Recalculate coverage
        const allPoints = remaining.flatMap(s => s.points);
        const newCoverage = calculatePathCoverage(allPoints, letterDots, PATH_TOLERANCE);
        setCoverage(newCoverage);
      }
      
      return remaining;
    });
  }, [selectedThickness, letterDots, saveToUndoStack]);

  /**
   * Gesture handlers
   */
  const panGesture = Gesture.Pan()
    .onStart((event) => {
      if (isEraserMode) {
        handleEraser(event.x, event.y);
        setIsTracing(true);
        return;
      }
      
      setCurrentStroke([]);
      setCurrentStrokePath('');
      lastPoint.current = null;
      setIsTracing(true);
      setMascotState('active');
      strokeStartTime.current = Date.now();
      addPoint(event.x, event.y);
    })
    .onUpdate((event) => {
      if (!isTracing) return;
      
      if (isEraserMode) {
        handleEraser(event.x, event.y);
      } else {
        addPoint(event.x, event.y);
      }
    })
    .onEnd(() => {
      if (isEraserMode) {
        setIsTracing(false);
        return;
      }
      
      // Phase 2: Save completed stroke with color and thickness
      if (currentStroke.length > 0) {
        saveToUndoStack();
        
        const newStroke: Stroke = {
          points: currentStroke,
          path: currentStrokePath,
          color: selectedColor,
          thickness: selectedThickness,
          timestamp: Date.now(),
        };
        
        setAllStrokes(prev => [...prev, newStroke]);
      }
      
      setCurrentStroke([]);
      setCurrentStrokePath('');
      setIsTracing(false);
      setMascotState('idle');
      lastPoint.current = null;
    })
    .onFinalize(() => {
      if (isEraserMode) {
        setIsTracing(false);
        return;
      }
      
      if (currentStroke.length > 0) {
        saveToUndoStack();
        
        const newStroke: Stroke = {
          points: currentStroke,
          path: currentStrokePath,
          color: selectedColor,
          thickness: selectedThickness,
          timestamp: Date.now(),
        };
        
        setAllStrokes(prev => [...prev, newStroke]);
      }
      
      setCurrentStroke([]);
      setCurrentStrokePath('');
      setIsTracing(false);
      setMascotState('idle');
      lastPoint.current = null;
    });

  const getFeedbackColor = (): string => {
    if (coverage < 30) return theme.colors.error;
    if (coverage < 60) return theme.colors.warning;
    if (coverage < COMPLETION_THRESHOLD) return theme.colors.info;
    return theme.colors.success;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pathAnimatedStyle = useAnimatedStyle(() => ({
    opacity: pathOpacity.value,
  }));

  /**
   * Phase 2: Get stroke color for rendering
   */
  const getStrokeColor = (color: string): string => {
    return color === 'rainbow' ? 'url(#rainbow)' : color;
  };

  return (
    <View style={styles.container}>
      {/* Phase 2: Top Toolbar */}
      <DrawingToolbar
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
        canUndo={undoStack.length > 0}
        canRedo={redoStack.length > 0}
        isEraserMode={isEraserMode}
        onToggleEraser={() => setIsEraserMode(!isEraserMode)}
      />

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
                <Path
                  d={letterPath}
                  stroke={theme.colors.border}
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="10,5"
                  opacity={0.4}
                />

                {isTracing && (
                  <Path
                    d={letterPath}
                    stroke="url(#glow)"
                    strokeWidth="8"
                    fill="none"
                    opacity={0.3}
                  />
                )}

                {letterDots.map((dot, index) => {
                  const shouldShow = index === 0 || index % 5 === 0;
                  if (!shouldShow) return null;

                  const allPoints = [...allStrokes.flatMap(s => s.points), ...currentStroke];
                  const isCovered = allPoints.some(
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

                {/* Phase 2: Render completed strokes with their color and thickness */}
                {allStrokes.map((stroke, index) => (
                  <Path
                    key={`stroke-${index}-${stroke.timestamp}`}
                    d={stroke.path}
                    stroke={getStrokeColor(stroke.color)}
                    strokeWidth={stroke.thickness}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.9}
                  />
                ))}

                {/* Phase 2: Current stroke with selected color and thickness */}
                {currentStrokePath && !isEraserMode && (
                  <Path
                    d={currentStrokePath}
                    stroke={getStrokeColor(selectedColor)}
                    strokeWidth={selectedThickness}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.9}
                  />
                )}

                {/* Phase 2: Eraser cursor */}
                {isTracing && isEraserMode && lastPoint.current && (
                  <Circle
                    cx={lastPoint.current.x}
                    cy={lastPoint.current.y}
                    r={selectedThickness * 2}
                    fill="rgba(255, 0, 0, 0.2)"
                    stroke={theme.colors.error}
                    strokeWidth={2}
                  />
                )}

                {/* Drawing cursor */}
                {isTracing && !isEraserMode && lastPoint.current && (
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

      {/* Progress indicator */}
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

      {/* Phase 2: Bottom Toolbar with Color and Thickness */}
      <View style={styles.bottomToolbar}>
        <ColorPicker selectedColor={selectedColor} onColorChange={setSelectedColor} />
        <View style={styles.toolbarDivider} />
        <ThicknessPicker selectedThickness={selectedThickness} onThicknessChange={setSelectedThickness} />
      </View>

      {showCelebration && <CelebrationOverlay />}
    </View>
  );
}
