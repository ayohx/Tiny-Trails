import { Platform } from 'react-native';

export const theme = {
  colors: {
    // Primary Brand Colors
    primary: '#58C472',    // Grass Green
    secondary: '#FFC940',  // Sunshine Yellow
    tertiary: '#3DA9F5',   // Sky Blue
    
    // Mascot Colors
    mascot: {
      body: '#6AD484',     // Tiko's body color
      eyes: '#4A3B2C',     // Deep friendly brown
      trail: {
        start: '#FFE5A3',  // Light yellow
        middle: '#FFB5D8', // Soft pink
        end: '#B5E5FF'     // Light blue
      }
    },
    
    // UI Colors
    background: '#FFFFFF',
    text: '#2D3748',
    textSecondary: '#718096',
    border: '#E2E8F0',
    success: '#58C472',
    error: '#FF6B6B',
    warning: '#FFC940',
    info: '#3DA9F5',
    disabled: '#CBD5E0',
    primaryLight: '#E8F7ED',
    errorLight: '#FFF5F5',
    
    // Rainbow Gradient for Tracing
    rainbow: [
      '#FFE5A3', // Start: Light yellow
      '#FFB5D8', // Middle: Soft pink
      '#B5E5FF', // End: Light blue
      '#58C472', // Brand green
      '#FFC940', // Brand yellow
      '#3DA9F5'  // Brand blue
    ]
  },
  
  typography: {
    fontFamily: {
      heading: 'Fredoka-Bold',
      subheading: 'Fredoka-SemiBold',
      body: 'Inter-Regular',
      medium: 'Inter-Medium',
      semibold: 'Inter-SemiBold'
    },
    fontSize: {
      small: 14,
      medium: 16,
      large: 20,
      xlarge: 24,
      xxlarge: 32
    }
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  
  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500
    },
    easing: {
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  
  mascot: {
    states: {
      idle: {
        scale: 1,
        rotation: 0
      },
      active: {
        scale: 1.05,
        rotation: 5
      },
      success: {
        scale: 1.2,
        rotation: 360
      }
    }
  }
};

export const getShadowStyle = (
  elevation: number = 4,
  opacity: number = 0.1,
  color: string = '#000'
) => {
  if (Platform.OS === 'web') {
    const shadowRadius = elevation * 2;
    const height = elevation / 2;
    return {
      boxShadow: `0px ${height}px ${shadowRadius}px rgba(0, 0, 0, ${opacity})`
    };
  }
  
  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: elevation },
    shadowOpacity: opacity,
    shadowRadius: elevation * 2,
    elevation: elevation, // for Android
  };
};

export const getTextShadowStyle = (
  elevation: number = 2,
  opacity: number = 0.1,
  color: string = '#000'
) => {
  if (Platform.OS === 'web') {
    return {
      textShadow: `${elevation}px ${elevation}px ${elevation * 2}px rgba(0, 0, 0, ${opacity})`
    };
  }

  return {
    textShadowColor: color,
    textShadowOffset: { width: elevation, height: elevation },
    textShadowRadius: elevation * 2,
  };
}; 