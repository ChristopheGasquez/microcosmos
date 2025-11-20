import type { ValueOf } from '../utils/types';

export const POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
  INLINE: 'inline',
} as const;

export type Positions = ValueOf<typeof POSITIONS>;
