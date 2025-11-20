import type { ValueOf } from '../utils/types';

export const SCREENS = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  XXL: 'xxl',
  FULL: 'full',
} as const;

export type Screens = ValueOf<typeof SCREENS>
