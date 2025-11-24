import type { ValueOf } from '../utils/types';

export const SIZES = {
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

export type Sizes = ValueOf<typeof SIZES>;
