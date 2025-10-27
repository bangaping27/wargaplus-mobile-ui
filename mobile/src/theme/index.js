import colors from './colors';
import typography from './typography';
import { spacing, borderRadius, shadows, touchTargets, container, breakpoints, zIndex } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  touchTargets,
  container,
  breakpoints,
  zIndex,

  // Utility functions
  utils: {
    // Get spacing value
    space: (value) => spacing[value] || value,

    // Get border radius value
    radius: (value) => borderRadius[value] || value,

    // Get shadow value
    shadow: (value) => shadows[value] || shadows.none,

    // Get color value
    color: (path) => {
      const keys = path.split('.');
      let value = colors;

      for (const key of keys) {
        value = value?.[key];
        if (!value) return path; // Return path if color not found
      }

      return value;
    },

    // Get typography value
    text: (style) => typography[style] || typography.body1,

    // Minimum touch target (48px)
    minTouchTarget: touchTargets.min,

    // Check if value meets minimum touch target
    isTouchTargetValid: (size) => size >= touchTargets.min,

    // Ensure minimum touch target
    ensureTouchTarget: (size) => Math.max(size, touchTargets.min),
  },
};

export default theme;