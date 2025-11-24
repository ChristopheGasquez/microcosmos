import type { ValueOf } from '../utils/types';

export const MARGINS = {
  ZERO:   'zero',
  XXXS:   'xxxs',
  XXS: 'xxs',
  XS: 'xs',
  S: 's',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  XXL: 'xxl',
  XXXL: 'xxxl',
} as const;

export type Margins = ValueOf<typeof MARGINS>;
