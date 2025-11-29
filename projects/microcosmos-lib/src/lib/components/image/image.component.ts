import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import {
  IMG_FILTER,
  IMG_FIT,
  type ImgFilter,
  type ImgFit,
  PADDINGS,
  type Paddings,
  VARIANTS,
  type Variants,
} from '../../constants';

@Component({
  selector: 'mcs-img',
  standalone: true,
  imports: [ NgOptimizedImage ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [ './image.component.scss' ],
  template: `
    <img class="mcs-img__image"
         [ngSrc]="src"
         [alt]="alt"
         [width]="width ?? null"
         [height]="height ?? null"
         [priority]="priority"
         [attr.loading]="priority ? null : (lazy ? 'lazy' : 'eager')"
         [style.aspect-ratio]="ratio ?? null"
         (error)="onError()"/>
  `,
})
export class ImageComponent {
  #hasFailed: boolean = false;

  @Input() alt: string = '';
  @Input() src: string = '';
  @Input() height: number | null = null;
  @Input() width: number | null = null;
  @Input() priority: boolean = false;
  @Input() fallback?: string;
  @Input() lazy: boolean = true;
  @Input() ratio?: string;
  @Input() fit: ImgFit = IMG_FIT.COVER;
  @Input() filter?: ImgFilter;
  @Input() fullWidth: boolean = false;
  @Input() fullHeight: boolean = false;
  @Input() rounded: boolean = false;
  @Input() circle: boolean = false;
  @Input() selectable: boolean = false;
  @Input() elevated: boolean = false;
  @Input() padding: Paddings = PADDINGS.ZERO;
  @Input() variant: Variants = VARIANTS.TONED;

  @HostBinding('class') get hostClasses(): string {
    return `
      mcs-img
      mcs-variant--${ this.variant }
      mcs-elevated--${ this.elevated }
      mcs-img-fit--${ this.fit }
      mcs-img-filter--${ this.filter ?? 'none' }
      mcs-full-width--${ this.fullWidth }
      mcs-full-height--${ this.fullHeight }
      mcs-rounded--${ !this.circle ? this.rounded : 'circle' }
      mcs-selectable--${ this.selectable }
      mcs-p--${ this.padding }
    `.trim();
  }

  onError() {
    if (this.fallback && !this.#hasFailed) {
      this.#hasFailed = true;
      this.src = this.fallback;
    }
  }
}
