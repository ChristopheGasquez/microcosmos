import type { ValueOf } from '../utils/types';

export const FONT_STYLE = {
  NORMAL: 'normal',
  ITALIC: 'italic',
} as const;

export type FontStyle = ValueOf<typeof FONT_STYLE>;

export const FONT_SIZE = {
  XS: 'xs',
  S: 's',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  XXL: 'xxl',
} as const;

export type FontSize = ValueOf<typeof FONT_SIZE>;

