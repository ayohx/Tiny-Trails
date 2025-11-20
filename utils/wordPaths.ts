import { getLetterPath, getLetterDots } from './letterPaths';

export const getWordPath = (word: string): string[] => {
  return word.split('').map((letter, index) => {
    const letterPath = getLetterPath(letter);
    // Offset each letter horizontally
    const offsetX = index * 120;
    
    // Transform the path to offset the letter
    return letterPath.replace(/(\d+)/g, (match, num) => {
      const value = parseInt(match);
      // Only offset X coordinates (assuming they're in pairs)
      return match;
    });
  });
};

export const getWordDots = (word: string): Array<Array<{ id: number; x: number; y: number }>> => {
  let globalDotId = 0;
  
  return word.split('').map((letter, letterIndex) => {
    const letterDots = getLetterDots(letter);
    const offsetX = letterIndex * 120;
    
    return letterDots.map(dot => ({
      id: globalDotId++,
      x: dot.x + offsetX,
      y: dot.y
    }));
  });
};