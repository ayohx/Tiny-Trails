import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  createAnimatedComponent,
} from '@/utils/animatedCompat';
import { theme } from '@/styles/theme';

interface TikoMascotProps {
  state?: 'idle' | 'active' | 'success';
  size?: number;
  style?: any;
}

const AnimatedSvg = createAnimatedComponent(Svg);

export default function TikoMascot({ state = 'idle', size = 120, style }: TikoMascotProps) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const tailWag = useSharedValue(0);

  React.useEffect(() => {
    // Start tail wagging animation in idle state
    if (state === 'idle') {
      tailWag.value = withRepeat(
        withSequence(
          withTiming(5, { duration: 1000 }),
          withTiming(-5, { duration: 1000 })
        ),
        -1,
        true
      );
    }

    // Apply state-specific animations
    switch (state) {
      case 'active':
        scale.value = withSpring(theme.mascot.states.active.scale);
        rotation.value = withSpring(theme.mascot.states.active.rotation);
        break;
      case 'success':
        scale.value = withSequence(
          withSpring(theme.mascot.states.success.scale),
          withTiming(1, { duration: 500 })
        );
        rotation.value = withSequence(
          withTiming(theme.mascot.states.success.rotation, { duration: 1000 }),
          withTiming(0, { duration: 0 })
        );
        break;
      default:
        scale.value = withSpring(theme.mascot.states.idle.scale);
        rotation.value = withSpring(theme.mascot.states.idle.rotation);
    }
  }, [state]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ]
  }));

  return (
    <View style={[{ width: size, height: size }, style]}>
      <AnimatedSvg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        style={animatedStyle}
      >
        <Defs>
          <LinearGradient id="tailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={theme.colors.mascot.trail.start} />
            <Stop offset="50%" stopColor={theme.colors.mascot.trail.middle} />
            <Stop offset="100%" stopColor={theme.colors.mascot.trail.end} />
          </LinearGradient>
        </Defs>

        {/* Tiko's Body */}
        <G>
          {/* Main body */}
          <Path
            d="M60 100c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"
            fill={theme.colors.mascot.body}
          />

          {/* Eyes */}
          <Circle cx="45" cy="50" r="5" fill={theme.colors.mascot.eyes} />
          <Circle cx="75" cy="50" r="5" fill={theme.colors.mascot.eyes} />

          {/* Smile */}
          <Path
            d="M50 65c5 5 15 5 20 0"
            stroke={theme.colors.mascot.eyes}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Animated tail */}
          <Path
            d="M85 70c10 0 20 10 25 20"
            stroke="url(#tailGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            opacity={0.8}
          />
        </G>
      </AnimatedSvg>
    </View>
  );
} 