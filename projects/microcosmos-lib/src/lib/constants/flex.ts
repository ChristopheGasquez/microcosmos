import type { ValueOf } from '../utils/types';

export const FLEX_ALIGN = {
  CENTER: 'center',
  END: 'end',
  START: 'start',
} as const;

export type FlexAlign = ValueOf<typeof FLEX_ALIGN>;

export const FLEX_DIRECTION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const;

export type FlexDirection = ValueOf<typeof FLEX_DIRECTION>;

export const FLEX_JUSTIFY = {
  AROUND: 'around',
  BETWEEN: 'between',
  CENTER: 'center',
  END: 'end',
  EVENLY: 'evenly',
  START: 'start',
} as const;

export type FlexJustify = ValueOf<typeof FLEX_JUSTIFY>;

export const FLEX_WRAP = {
  NOWRAP: 'nowrap',
  WRAP: 'wrap',
  WRAP_REVERSE: 'reverse',
} as const;

export type FlexWrap = ValueOf<typeof FLEX_WRAP>;
