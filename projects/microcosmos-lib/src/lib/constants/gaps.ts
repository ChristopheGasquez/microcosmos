import type { ValueOf } from '../utils/types';

export const GAPS = {
  ZERO: 'zero',
  XS: 'xs',
  S: 's',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

export type Gaps = ValueOf<typeof GAPS>;
