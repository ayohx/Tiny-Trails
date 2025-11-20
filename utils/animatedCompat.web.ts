// Web-compatible animation using React Native's built-in Animated
import { Animated as RNAnimated } from 'react-native';

export default RNAnimated;

export const useSharedValue = (initialValue: any) => {
  return { value: initialValue };
};

export const useAnimatedStyle = (styleFunction: () => any) => {
  return styleFunction();
};

export const withSpring = (toValue: any, config?: any) => {
  return toValue;
};

export const withSequence = (...animations: any[]) => {
  return animations[animations.length - 1];
};

export const withTiming = (toValue: any, config?: any) => {
  return toValue;
};

export const withRepeat = (animation: any, numberOfReps?: number, reverse?: boolean) => {
  return animation;
};

export const createAnimatedComponent = (component: any) => {
  return RNAnimated.createAnimatedComponent(component);
};
