import type { ValueOf } from '../utils/types';

export const COLORS = {
  SURFACE: 'surface',
  INK: 'ink',
  BRAND: 'brand',
  CONTRAST: 'contrast',
  NEUTRAL: 'neutral',
  HIGHLIGHT: 'highlight',
  DISABLE: 'disable',
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
} as const;

export type Colors = ValueOf<typeof COLORS>;
