import { Component, HostBinding, Input } from '@angular/core';
import type { Gaps } from '../../constants';
import { GAPS } from '../../constants';
import { FLEX_ALIGN, FLEX_DIRECTION, FLEX_JUSTIFY, FLEX_WRAP } from '../../constants/flex';
import type { FlexAlign, FlexDirection, FlexJustify, FlexWrap } from '../../constants/flex';

@Component({
  standalone: true,
  selector: 'mcs-flex',
  imports: [],
  template: `
    <ng-content></ng-content>`,
  styleUrl: './flex.component.scss',
  host: {
    'class': `mcs-flex`,
  },
})
export class FlexComponent {
  @Input() public align: FlexAlign = FLEX_ALIGN.START;
  @Input() public direction: FlexDirection = FLEX_DIRECTION.HORIZONTAL;
  @Input() public fullHeight: boolean = false;
  @Input() public gap: Gaps = GAPS.ZERO;
  @Input() public justify: FlexJustify = FLEX_JUSTIFY.START;
  @Input() public wrap: FlexWrap = FLEX_WRAP.WRAP;

  @HostBinding('class') get hostClasses(): string {
    return `
      mcs-flex-align--${ this.align }
      mcs-flex-direction--${ this.direction }
      mcs-gap--${ this.gap }
      mcs-full-height--${ this.fullHeight ? 'true' : 'false' }
      mcs-flex-justify--${ this.justify }
      mcs-flex-wrap--${ this.wrap }
    `.trim();
  }
}
