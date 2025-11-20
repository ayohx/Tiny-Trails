import React, { useEffect } from 'react';
import { View, Text, Dimensions, Easing } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
} from '@/utils/animatedCompat';
import { styles } from '@/styles/celebrationStyles';

const AnimatedView = Animated.View;
const AnimatedText = Animated.Text;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  emoji: ['🎉', '⭐', '🌟', '✨', '🎊'][i % 5],
  initialX: Math.random() * screenWidth,
  initialY: screenHeight + 50,
}));

export default function CelebrationOverlay() {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const textScale = useSharedValue(0);

  useEffect(() => {
    // Animate overlay appearance
    opacity.value = withTiming(1, { duration: 300 });
    scale.value = withSpring(1, { damping: 8, stiffness: 100 });

    // Animate text with bounce
    textScale.value = withSequence(
      withSpring(1.2, { damping: 4 }),
      withSpring(1, { damping: 8 })
    );

    // Auto hide after 2 seconds
    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 500 });
      scale.value = withTiming(0, { duration: 500 });
    }, 1500);
  }, []);

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: textScale.value }],
  }));

  return (
    <AnimatedView style={[styles.overlay, overlayAnimatedStyle]}>
      <View style={styles.content}>
        <AnimatedText style={[styles.emoji, textAnimatedStyle]}>
          🎉
        </AnimatedText>
        <AnimatedText style={[styles.title, textAnimatedStyle]}>
          Awesome!
        </AnimatedText>
        <AnimatedText style={[styles.message, textAnimatedStyle]}>
          Great job tracing!
        </AnimatedText>
      </View>

      {/* Floating particles */}
      {PARTICLES.map((particle) => (
        <FloatingParticle key={particle.id} particle={particle} />
      ))}
    </AnimatedView>
  );
}

function FloatingParticle({ particle }: { particle: typeof PARTICLES[0] }) {
  const translateY = useSharedValue(particle.initialY);
  const translateX = useSharedValue(particle.initialX);
  const rotation = useSharedValue(0);
  const particleOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate particle appearance and movement
    particleOpacity.value = withTiming(1, { duration: 200 });

    translateY.value = withTiming(
      particle.initialY - screenHeight - 100,
      {
        duration: 2000 + Math.random() * 1000,
        easing: Easing.out(Easing.quad)
      }
    );

    translateX.value = withTiming(
      particle.initialX + (Math.random() - 0.5) * 200,
      {
        duration: 2000 + Math.random() * 1000,
        easing: Easing.inOut(Easing.ease)
      }
    );

    rotation.value = withTiming(
      360 * (Math.random() > 0.5 ? 1 : -1),
      {
        duration: 1500 + Math.random() * 1000,
        easing: Easing.linear
      }
    );

    // Fade out near the end
    setTimeout(() => {
      particleOpacity.value = withTiming(0, { duration: 500 });
    }, 1500);
  }, []);

  const particleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: particleOpacity.value,
  }));

  return (
    <AnimatedText style={[styles.particle, particleAnimatedStyle]}>
      {particle.emoji}
    </AnimatedText>
  );
}