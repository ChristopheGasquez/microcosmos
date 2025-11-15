import { Component, HostBinding, Input } from '@angular/core';
import { COLORS, type Colors, type Gaps, GAPS, type Thickness, THICKNESS } from '../../constants';

@Component({
  standalone: true,
  selector: 'mcs-hr',
  imports: [],
  template: ``,
  styleUrls: ['./hr.scss'],
  host: {
    'class': `mcs-hr`,
  },
})
export class Hr {
  @Input() public color: Colors = COLORS.NEUTRAL;
  @Input() public gap: Gaps = GAPS.XL;
  @Input() public rounded: boolean = false;
  @Input() public thickness: Thickness = THICKNESS.XS;

  @HostBinding('class') get hostClasses(): string {
    return `
    mcs-color--${ this.color }
    mcs-gap--${ this.gap }
    mcs-rounded--${ this.rounded ? 'true': 'false' }
    mcs-thickness--${ this.thickness }
    `.trim();
  }
}

