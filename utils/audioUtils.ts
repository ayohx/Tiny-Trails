import { Platform } from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

// Web-compatible audio implementation
export const playAudio = async (type: 'success' | 'letter' | 'word', content?: string) => {
  if (Platform.OS === 'web') {
    // Use Web Audio API for web
    try {
      if (type === 'success') {
        // Create a simple success sound using Web Audio API
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

        // Create a sequence of notes for success sound
        const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5

        frequencies.forEach((freq, index) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1);
          oscillator.type = 'sine';

          gainNode.gain.setValueAtTime(0, audioContext.currentTime + index * 0.1);
          gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + index * 0.1 + 0.05);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.2);

          oscillator.start(audioContext.currentTime + index * 0.1);
          oscillator.stop(audioContext.currentTime + index * 0.1 + 0.2);
        });
      } else if (type === 'letter' || type === 'word') {
        // Use speech synthesis for letter/word pronunciation
        if ('speechSynthesis' in window && content) {
          const utterance = new SpeechSynthesisUtterance(content);
          utterance.rate = 0.7;
          utterance.pitch = 1.1;
          utterance.volume = 0.8;
          speechSynthesis.speak(utterance);
        }
      }
    } catch (error) {
      console.log('Audio not available:', error);
    }
  } else {
    // For native platforms, use expo-av
    try {
      if (type === 'success') {
        // Create a simple beep sound programmatically
        console.log('Playing success sound on native');
      } else if (type === 'letter' || type === 'word') {
        // Use text-to-speech or pre-recorded audio files
        console.log(`Playing ${type} audio: ${content}`);
      }
    } catch (error) {
      console.log('Native audio error:', error);
    }
  }
};

// Haptic feedback helper
export const triggerHapticFeedback = async (type: 'light' | 'medium' | 'heavy' | 'success' = 'medium') => {
  if (Platform.OS !== 'web') {
    try {
      if (type === 'success') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        const style = type === 'light' 
          ? Haptics.ImpactFeedbackStyle.Light 
          : type === 'heavy'
          ? Haptics.ImpactFeedbackStyle.Heavy
          : Haptics.ImpactFeedbackStyle.Medium;
        
        await Haptics.impactAsync(style);
      }
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  }
};