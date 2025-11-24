import { Component, HostBinding, Input } from '@angular/core';
import {
  COLORS,
  type Colors,
  MARGINS,
  type Margins,
  PADDINGS,
  type Paddings,
  VARIANTS,
  type Variants,
} from '../../constants';

@Component({
  selector: 'mcs-card',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `,
  styleUrl: './card.component.scss',
  host: { 'class': `mcs-card` },
})
export class CardComponent {
  @Input() color: Colors = COLORS.NEUTRAL;
  @Input() elevated: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() fullHeight: boolean = false;
  @Input() padding: Paddings = PADDINGS.XL;
  @Input() margin: Margins = MARGINS.ZERO;
  @Input() rounded: boolean = true;
  @Input() selectable: boolean = false;
  @Input() variant: Variants = VARIANTS.OUTLINED;

  @HostBinding('class') get hostClasses(): string {
    return `
      mcs-color--${ this.color }
      mcs-elevated--${ this.elevated ? 'true' : 'false' }
      mcs-full-height--${ this.fullHeight ? 'true' : 'false' }
      mcs-full-width--${ this.fullWidth ? 'true' : 'false' }
      mcs-m--${ this.margin }
      mcs-p--${ this.padding }
      mcs-rounded--${ this.rounded ? 'true' : 'false' }
      mcs-selectable--${ this.selectable ? 'true' : 'false' }
      mcs-variant--${ this.variant }
    `.trim();
  }
}
