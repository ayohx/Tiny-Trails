import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

interface ProgressState {
  completedLetters: Record<string, boolean>;
  completedWords: Record<string, boolean>;
  currentLevel: 'letters' | 'words';
  completeLetterTracing: (letter: string) => void;
  completeWordTracing: (word: string) => void;
  shouldShowWords: () => boolean;
  resetProgress: () => void;
}

// Web-compatible storage
const storage = Platform.OS === 'web'
  ? {
    getItem: async (name: string) => {
      try {
        return localStorage.getItem(name);
      } catch {
        return null;
      }
    },
    setItem: async (name: string, value: string) => {
      try {
        localStorage.setItem(name, value);
      } catch {
        // ignore
      }
    },
    removeItem: async (name: string) => {
      try {
        localStorage.removeItem(name);
      } catch {
        // ignore
      }
    },
  }
  : AsyncStorage;

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLetters: {},
      completedWords: {},
      currentLevel: 'letters',

      completeLetterTracing: (letter: string) => {
        set((state) => ({
          completedLetters: {
            ...state.completedLetters,
            [letter]: true,
          },
        }));
      },

      completeWordTracing: (word: string) => {
        set((state) => ({
          completedWords: {
            ...state.completedWords,
            [word]: true,
          },
        }));
      },

      shouldShowWords: () => {
        const { completedLetters } = get();
        const uppercaseCount = Object.keys(completedLetters).filter(
          letter => letter === letter.toUpperCase() && completedLetters[letter]
        ).length;
        const lowercaseCount = Object.keys(completedLetters).filter(
          letter => letter === letter.toLowerCase() && completedLetters[letter]
        ).length;

        // Show words when all 52 letters (26 uppercase + 26 lowercase) are completed
        return uppercaseCount >= 26 && lowercaseCount >= 26;
      },

      resetProgress: () => {
        set({
          completedLetters: {},
          completedWords: {},
          currentLevel: 'letters',
        });
      },
    }),
    {
      name: 'letter-tracing-progress',
      storage: createJSONStorage(() => storage),
    }
  )
);