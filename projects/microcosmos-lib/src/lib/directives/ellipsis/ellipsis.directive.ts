import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[mcsEllipsis]',
  standalone: true,
})
export class EllipsisDirective {
  @Input('mcsEllipsis') lines: number | '' | null = 1;

  @HostBinding('style.overflow') overflow: string = 'hidden';
  @HostBinding('style.minWidth') minWidth: string = '0';

  @HostBinding('style.white-space') get whiteSpace(): string {
    return this.#singleLine ? 'nowrap' : 'normal';
  }

  @HostBinding('style.text-overflow') get textOverflow(): string {
    return 'ellipsis';
  }

  @HostBinding('style.display') get display(): string {
    return this.#singleLine ? 'block' : '-webkit-box';
  }

  @HostBinding('style.max-height') get maxHeight(): null | string {
    return this.#singleLine ? null : `${ this.#safeLines * 1.4 }em`;
  }

  @HostBinding('style.-webkit-line-clamp') get webkitLineClamp(): null | string {
    return this.#singleLine ? null : `${ this.#safeLines }`;
  }

  @HostBinding('style.-webkit-box-orient') get webkitBoxOrient(): null | string {
    return this.#singleLine ? null : 'vertical';
  }

  get #safeLines(): number {
    const n: number = Number(this.lines);
    return !n || n < 1 ? 1 : n;
  }

  get #singleLine(): boolean {
    return this.#safeLines === 1;
  }
}
