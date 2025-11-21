import type { ValueOf } from '../utils/types';

export const TEXT_ALIGN = {
  CENTER: 'center',
  END: 'end',
  START: 'start',
} as const;

export type TextAlign = ValueOf<typeof TEXT_ALIGN>;
