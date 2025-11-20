// SVG paths for letters with proper proportions for tracing
export const getLetterPath = (letter: string): string => {
  const paths: Record<string, string> = {
    // Uppercase letters
    'A': 'M50 200 L150 50 L250 200 M100 150 L200 150',
    'B': 'M50 50 L50 200 L175 200 Q225 200 225 175 Q225 150 200 137.5 Q225 125 225 100 Q225 50 175 50 L50 50',
    'C': 'M225 75 Q200 50 150 50 Q75 50 50 125 Q50 200 150 200 Q200 200 225 175',
    'D': 'M50 50 L50 200 L150 200 Q225 200 225 125 Q225 50 150 50 L50 50',
    'E': 'M50 50 L50 200 L200 200 M50 125 L175 125 M50 50 L200 50',
    'F': 'M50 50 L50 200 M50 125 L175 125 M50 50 L200 50',
    'G': 'M225 75 Q200 50 150 50 Q75 50 50 125 Q50 200 150 200 Q200 200 225 175 L225 137.5 L175 137.5',
    'H': 'M50 50 L50 200 M50 125 L200 125 M200 50 L200 200',
    'I': 'M75 50 L175 50 M125 50 L125 200 M75 200 L175 200',
    'J': 'M75 50 L175 50 M125 50 L125 175 Q125 200 100 200 Q75 200 75 175',
    'K': 'M50 50 L50 200 M50 125 L200 50 M125 112.5 L200 200',
    'L': 'M50 50 L50 200 L200 200',
    'M': 'M50 200 L50 50 L125 125 L200 50 L200 200',
    'N': 'M50 200 L50 50 L200 200 L200 50',
    'O': 'M50 125 Q50 50 125 50 Q200 50 200 125 Q200 200 125 200 Q50 200 50 125',
    'P': 'M50 200 L50 50 L175 50 Q225 50 225 100 Q225 125 175 125 L50 125',
    'Q': 'M50 125 Q50 50 125 50 Q200 50 200 125 Q200 175 175 187.5 L200 200 M200 125 Q200 200 125 200 Q50 200 50 125',
    'R': 'M50 200 L50 50 L175 50 Q225 50 225 100 Q225 125 175 125 L50 125 M125 125 L200 200',
    'S': 'M200 75 Q175 50 125 50 Q75 50 50 75 Q50 100 75 112.5 Q125 125 175 137.5 Q200 150 200 175 Q200 200 150 200 Q100 200 75 175',
    'T': 'M50 50 L200 50 M125 50 L125 200',
    'U': 'M50 50 L50 175 Q50 200 125 200 Q200 200 200 175 L200 50',
    'V': 'M50 50 L125 200 L200 50',
    'W': 'M50 50 L75 200 L125 125 L175 200 L200 50',
    'X': 'M50 50 L200 200 M200 50 L50 200',
    'Y': 'M50 50 L125 125 L200 50 M125 125 L125 200',
    'Z': 'M50 50 L200 50 L50 200 L200 200',

    // Lowercase letters
    'a': 'M175 100 Q200 100 200 125 Q200 175 175 200 Q125 200 100 175 Q75 150 100 125 Q125 100 175 100 L175 200',
    'b': 'M75 50 L75 200 M75 125 Q75 100 125 100 Q175 100 175 150 Q175 200 125 200 Q75 200 75 175',
    'c': 'M175 125 Q175 100 125 100 Q75 100 75 150 Q75 200 125 200 Q175 200 175 175',
    'd': 'M175 50 L175 200 M175 125 Q175 100 125 100 Q75 100 75 150 Q75 200 125 200 Q175 200 175 175',
    'e': 'M175 175 Q175 200 125 200 Q75 200 75 150 Q75 100 125 100 Q175 100 175 125 L100 125',
    'f': 'M150 50 Q175 50 175 75 L175 100 L125 100 L125 200 M100 125 L150 125',
    'g': 'M175 100 L175 225 Q175 250 125 250 Q75 250 75 225 M175 125 Q175 100 125 100 Q75 100 75 150 Q75 200 125 200 Q175 200 175 175',
    'h': 'M75 50 L75 200 M75 125 Q75 100 125 100 Q175 100 175 125 L175 200',
    'i': 'M125 75 Q137.5 75 137.5 87.5 Q137.5 100 125 100 Q112.5 100 112.5 87.5 Q112.5 75 125 75 M125 125 L125 200',
    'j': 'M137.5 75 Q150 75 150 87.5 Q150 100 137.5 100 Q125 100 125 87.5 Q125 75 137.5 75 M137.5 125 L137.5 225 Q137.5 250 112.5 250 Q87.5 250 87.5 225',
    'k': 'M75 50 L75 200 M75 150 L150 100 M112.5 137.5 L150 200',
    'l': 'M125 50 L125 200',
    'm': 'M50 200 L50 100 Q50 125 75 125 Q100 125 100 150 L100 200 M100 125 Q100 100 125 100 Q150 100 150 125 L150 200',
    'n': 'M75 200 L75 100 Q75 125 125 125 Q175 125 175 150 L175 200',
    'o': 'M75 150 Q75 100 125 100 Q175 100 175 150 Q175 200 125 200 Q75 200 75 150',
    'p': 'M75 100 L75 250 M75 125 Q75 100 125 100 Q175 100 175 150 Q175 200 125 200 Q75 200 75 175',
    'q': 'M175 100 L175 250 M175 125 Q175 100 125 100 Q75 100 75 150 Q75 200 125 200 Q175 200 175 175',
    'r': 'M75 200 L75 100 Q75 125 125 125 Q150 125 150 112.5',
    's': 'M150 125 Q150 100 125 100 Q100 100 100 112.5 Q100 125 112.5 137.5 Q125 150 137.5 162.5 Q150 175 150 187.5 Q150 200 125 200 Q100 200 100 175',
    't': 'M100 75 L100 175 Q100 200 125 200 M75 100 L125 100',
    'u': 'M75 100 L75 175 Q75 200 125 200 Q175 200 175 175 L175 100',
    'v': 'M75 100 L125 200 L175 100',
    'w': 'M50 100 L75 200 L100 150 L125 200 L150 100',
    'x': 'M75 100 L175 200 M175 100 L75 200',
    'y': 'M75 100 L125 200 L175 100 M125 200 L125 250',
    'z': 'M75 100 L175 100 L75 200 L175 200',
  };

  return paths[letter] || '';
};

// Generate guide dots for letter tracing
export const getLetterDots = (letter: string): Array<{ id: number; x: number; y: number }> => {
  const path = getLetterPath(letter);
  const dots: Array<{ id: number; x: number; y: number }> = [];
  
  // Parse the SVG path and generate dots along the path
  const pathCommands = path.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi) || [];
  let currentX = 0;
  let currentY = 0;
  let dotId = 0;

  pathCommands.forEach((command) => {
    const type = command[0];
    const coords = command.slice(1).trim().split(/[\s,]+/).map(Number);

    switch (type) {
      case 'M': // Move to
        currentX = coords[0];
        currentY = coords[1];
        dots.push({ id: dotId++, x: currentX, y: currentY });
        break;
      
      case 'L': // Line to
        const targetX = coords[0];
        const targetY = coords[1];
        const distance = Math.sqrt((targetX - currentX) ** 2 + (targetY - currentY) ** 2);
        const steps = Math.max(Math.floor(distance / 20), 1);
        
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          const x = currentX + (targetX - currentX) * t;
          const y = currentY + (targetY - currentY) * t;
          dots.push({ id: dotId++, x, y });
        }
        
        currentX = targetX;
        currentY = targetY;
        break;
      
      case 'Q': // Quadratic curve
        const controlX = coords[0];
        const controlY = coords[1];
        const endX = coords[2];
        const endY = coords[3];
        
        for (let i = 1; i <= 10; i++) {
          const t = i / 10;
          const x = (1 - t) ** 2 * currentX + 2 * (1 - t) * t * controlX + t ** 2 * endX;
          const y = (1 - t) ** 2 * currentY + 2 * (1 - t) * t * controlY + t ** 2 * endY;
          dots.push({ id: dotId++, x, y });
        }
        
        currentX = endX;
        currentY = endY;
        break;
    }
  });

  return dots;
};