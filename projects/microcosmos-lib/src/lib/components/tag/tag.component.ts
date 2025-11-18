import { Component, HostBinding, Input } from '@angular/core';
import { COLORS, type Colors } from '../../constants';
import { VARIANTS } from '../../constants/variants';
import type { Variants } from '../../constants/variants';

@Component({
  standalone: true,
  selector: 'mcs-tag',
  imports: [],
  template: `
    <ng-content></ng-content>`,
  styleUrl: './tag.component.scss',
  host: {
    'class': `mcs-tag`,
  },
})
export class TagComponent {
  @Input() public color: Colors = COLORS.NEUTRAL;
  @Input() public variant: Variants = VARIANTS.TONED;
  @Input() public rounded: boolean = true;
  @Input() public elevated: boolean = false;

  @HostBinding('class') get hostClasses(): string {
    return `
    mcs-color--${ this.color }
    mcs-variant--${ this.variant }
    mcs-rounded--${ this.rounded ? 'true': 'false' }
    mcs-elevated--${ this.elevated ? 'true': 'false' }
    `.trim();
  }
}
