import type { ValueOf } from '../utils/types';
import { COLORS } from './colors';

export const GAPS = {
  XS: 'xs',
  S: 's',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

export type Gaps = ValueOf<typeof GAPS>;
