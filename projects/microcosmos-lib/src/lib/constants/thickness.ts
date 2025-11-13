import type { ValueOf } from '../utils/types';

export const THICKNESS = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export type Thickness = ValueOf<typeof THICKNESS>;
