import type { ValueOf } from '../utils/types';

export const WEIGHT = {
  THIN: 'thin',
  EXTRA_LIGHT: 'extra-light',
  LIGHT: 'light',
  REGULAR: 'regular',
  MEDIUM: 'medium',
  SEMI_BOLD: 'semi-bold',
  BOLD: 'bold',
  EXTRA_BOLD: 'extra-bold',
  HEAVY: 'heavy',
} as const;

export type Weight = ValueOf<typeof WEIGHT>;
