import type { ValueOf } from '../utils/types';

export const IMG_FILTER = {
  NONE: 'none',
  BLUR: 'blur',
  CONTRAST: 'contrast',
  GRAY: 'gray',
} as const;

export type ImgFilter = ValueOf<typeof IMG_FILTER>;

export const IMG_FIT = {
  COVER: 'cover',
  CONTAIN: 'contain',
  FILL: 'fill',
  NONE: 'none',
  SCALE_DOWN: 'scale-down',
} as const;

export type ImgFit = ValueOf<typeof IMG_FIT>;
