# Phase 2: Enhanced Drawing Tools

## Overview
Build upon the solid Phase 1 foundation to add enhanced drawing capabilities and user controls.

## Features to Implement

### 1. Color Picker 🎨
**Priority**: High
**Description**: Allow users to choose different colors for their traced lines

#### Implementation Details
- Color palette with 8-10 kid-friendly colors
- Visual color swatches
- Selected color indicator
- Apply color to new strokes (not retroactively)
- Store color in stroke data

#### UI Design
- Bottom toolbar with color circles
- Touch/click to select
- Highlight selected color
- Preview color on drawing cursor

#### Technical Requirements
- Update stroke state to include color property
- Modify SVG Path to use stroke color instead of rainbow gradient
- Add color state management
- Persist color selection between strokes

---

### 2. Line Thickness Controls 📏
**Priority**: High  
**Description**: Allow users to adjust line thickness

#### Implementation Details
- 3-4 thickness options (thin, medium, thick, extra thick)
- Visual preview of each thickness
- Apply to new strokes only
- Store thickness in stroke data

#### UI Design
- Bottom toolbar icons showing line thickness
- Touch/click to select
- Visual indicator for selected thickness
- Preview thickness on drawing cursor

#### Technical Requirements
- Update stroke state to include strokeWidth property
- Modify SVG Path strokeWidth dynamically
- Add thickness state management
- Default to medium thickness

---

### 3. Eraser Tool 🧹
**Priority**: Medium
**Description**: Allow users to erase parts of their drawing

#### Implementation Details
- Toggle eraser mode on/off
- Eraser removes strokes that intersect with touch/drag
- Visual eraser cursor
- Undo eraser actions

#### UI Design
- Eraser button in toolbar
- Active state indicator
- Larger circular cursor when erasing
- "X" or eraser icon

#### Technical Requirements
- Add eraser mode state
- Implement collision detection between eraser point and strokes
- Remove intersecting strokes from strokePaths array
- Add to undo history
- Visual feedback for eraser area

---

### 4. Undo/Redo Functionality ↩️↪️
**Priority**: High
**Description**: Allow users to undo and redo their drawing actions

#### Implementation Details
- Undo removes last completed stroke
- Redo restores last undone stroke
- History stack management
- Limit to last 20 actions
- Clear redo stack on new stroke

#### UI Design  
- Undo and Redo buttons in toolbar
- Disabled state when no actions available
- Icon indicators (arrow icons)
- Positioned in top-right corner

#### Technical Requirements
- History state array for undo/redo
- Push to history on stroke completion
- Pop from history on undo
- Redo stack management
- Update coverage calculation on undo/redo

---

## UI Layout Plan

### Toolbar Layout
```
┌─────────────────────────────────────────┐
│  [Undo] [Redo]                [Clear]  │  ← Top toolbar
├─────────────────────────────────────────┤
│                                          │
│         [Drawing Canvas Area]            │
│                                          │
│         [Tiko Mascot]                   │
│         [Progress Bar]                   │
├─────────────────────────────────────────┤
│  [🎨][🔴][🔵][🟢][🟡]  [─][━][▬] [🧹]  │  ← Bottom toolbar
│    Colors          Thickness   Eraser    │
└─────────────────────────────────────────┘
```

### Component Structure
```
<View style={styles.container}>
  {/* Top Toolbar */}
  <ToolbarTop>
    <UndoButton />
    <RedoButton />
    <ClearButton />
  </ToolbarTop>

  {/* Canvas Area */}
  <LetterTracing />
  
  {/* Bottom Toolbar */}
  <ToolbarBottom>
    <ColorPicker selectedColor={color} onColorChange={setColor} />
    <ThicknessPicker selectedThickness={thickness} onThicknessChange={setThickness} />
    <EraserToggle isActive={eraserMode} onToggle={setEraserMode} />
  </ToolbarBottom>
</View>
```

---

## Implementation Order

### Week 1: Foundation
1. ✅ Create toolbar components structure
2. ✅ Implement color picker UI and state
3. ✅ Apply color to strokes
4. ✅ Test color changes work correctly

### Week 2: Thickness & Eraser
5. ⬜ Implement thickness picker UI
6. ⬜ Apply thickness to strokes
7. ⬜ Implement eraser toggle
8. ⬜ Add eraser collision detection
9. ⬜ Test eraser functionality

### Week 3: Undo/Redo
10. ⬜ Implement history management
11. ⬜ Add undo button and logic
12. ⬜ Add redo button and logic
13. ⬜ Test undo/redo with all tools
14. ⬜ Edge case testing

### Week 4: Polish
15. ⬜ Refine UI/UX
16. ⬜ Add animations/transitions
17. ⬜ Accessibility improvements
18. ⬜ Performance optimization
19. ⬜ Complete testing
20. ⬜ Deploy Phase 2

---

## Success Criteria

### Color Picker ✓
- [ ] 8+ colors available
- [ ] Color selection persists across strokes
- [ ] Visual feedback on selection
- [ ] Works on touch and mouse
- [ ] No performance degradation

### Line Thickness ✓
- [ ] 3-4 thickness options
- [ ] Thickness persists across strokes  
- [ ] Visual preview works
- [ ] No rendering issues

### Eraser ✓
- [ ] Can erase individual strokes
- [ ] Visual feedback clear
- [ ] Undo-able
- [ ] No accidental erasures

### Undo/Redo ✓
- [ ] Undo removes last action
- [ ] Redo restores action
- [ ] Works with all tools
- [ ] History limit enforced
- [ ] UI updates correctly

---

## Technical Considerations

### State Management Enhancement
```typescript
interface Stroke {
  points: Point[];
  path: string;
  color: string;
  thickness: number;
  timestamp: number;
}

interface DrawingState {
  allStrokes: Stroke[];
  currentStroke: Stroke | null;
  undoStack: Stroke[][];
  redoStack: Stroke[][];
  eraserMode: boolean;
  selectedColor: string;
  selectedThickness: number;
}
```

### Performance Optimization
- Limit stroke history to prevent memory issues
- Debounce eraser collision checks
- Memoize color/thickness pickers
- Optimize re-renders with React.memo

### Accessibility
- Ensure buttons have proper labels
- Add keyboard shortcuts (if web)
- High contrast mode support
- Touch target sizes (min 44x44px)

---

## Next Steps

Ready to begin Phase 2 implementation! Starting with:
1. Create toolbar component structure
2. Implement color picker
3. Test and iterate

**Estimated Completion**: 4 weeks
**Priority**: High - Core UX enhancement
