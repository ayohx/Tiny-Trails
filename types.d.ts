declare module 'react-native-svg' {
  import { Component, ComponentType, ReactNode } from 'react';
  import { ViewProps } from 'react-native';

  export interface SvgProps extends ViewProps {
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    children?: ReactNode;
  }

  export default class Svg extends Component<SvgProps> { }
  export class Path extends Component<PathProps> { }
  export class Circle extends Component<CircleProps> { }
  export class G extends Component<GProps> { }
  export class Defs extends Component<any> { }
  export class LinearGradient extends Component<any> { }
  export class Stop extends Component<any> { }

  interface PathProps extends ViewProps {
    d?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: string | number;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeDasharray?: string | number[];
    opacity?: number;
  }

  interface CircleProps extends ViewProps {
    cx?: number | string;
    cy?: number | string;
    r?: number | string;
    fill?: string;
    stroke?: string;
    strokeWidth?: string | number;
    opacity?: number;
  }

  interface GProps extends ViewProps {
    opacity?: number;
    transform?: string;
  }
}

declare module 'react-native-reanimated' {
  import { ComponentClass, ComponentType } from 'react';
  import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

  export interface SharedValue<T> {
    value: T;
  }

  export function useSharedValue<T>(initialValue: T): SharedValue<T>;
  export function useAnimatedStyle(
    updater: () => ViewStyle | TextStyle | ImageStyle,
    dependencies?: any[]
  ): ViewStyle | TextStyle | ImageStyle;

  export function withSpring<T>(
    toValue: T,
    config?: {
      damping?: number;
      mass?: number;
      stiffness?: number;
      overshootClamping?: boolean;
      restDisplacementThreshold?: number;
      restSpeedThreshold?: number;
    }
  ): T;

  export function withSequence(...animations: any[]): any;
  export function withTiming(toValue: number, config?: any): any;
  export function withRepeat(
    animation: any,
    numberOfReps?: number,
    reverse?: boolean,
    callback?: (finished?: boolean) => void
  ): any;

  export function createAnimatedComponent<P>(component: ComponentType<P>): ComponentType<P>;

  namespace Animated {
    export const View: ComponentType<any>;
    export const Text: ComponentType<any>;
    export const Image: ComponentType<any>;
    export const ScrollView: ComponentType<any>;
  }

  export default Animated;
}

declare module 'lucide-react-native' {
  import { ComponentType } from 'react';

  export interface LucideProps {
    size?: number;
    color?: string;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
  }

  export const RefreshCw: ComponentType<LucideProps>;
  export const Volume2: ComponentType<LucideProps>;
  export const ArrowLeft: ComponentType<LucideProps>;
  export const Star: ComponentType<LucideProps>;
  export const Target: ComponentType<LucideProps>;
  export const Trophy: ComponentType<LucideProps>;
  export const RotateCcw: ComponentType<LucideProps>;
  export const Router: ComponentType<LucideProps>;
}

// Add other missing type declarations as needed
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg'; 