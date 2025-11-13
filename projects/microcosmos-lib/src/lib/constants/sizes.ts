import type { ValueOf } from '../utils/types';
import { COLORS } from './colors';

export const SIZES = {
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
