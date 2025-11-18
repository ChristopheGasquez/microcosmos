import type { ValueOf } from '../utils/types';

export const VARIANTS = {
  FILLED: 'filled',
  TONED: 'toned',
  OUTLINED: 'outlined',
} as const;

export type Variants = ValueOf<typeof VARIANTS>;
