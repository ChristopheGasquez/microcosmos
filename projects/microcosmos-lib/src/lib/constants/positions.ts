import type { ValueOf } from '../utils/types';

export const CORNER_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
  INLINE: 'inline',
} as const;

export type CornerPositions = ValueOf<typeof CORNER_POSITIONS>;

export const CENTRAL_POSITIONS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
} as const;

export type CentralPositions = ValueOf<typeof CENTRAL_POSITIONS>;
