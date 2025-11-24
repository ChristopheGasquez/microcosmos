import { Component, HostBinding, Input } from '@angular/core';
import type { Gaps } from '../../constants';
import { GAPS } from '../../constants';

@Component({
  selector: 'mcs-grid',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: './grid.component.scss',
  host: { 'class': `mcs-grid` },
})
export class GridComponent {
  @Input() gap: Gaps = GAPS.ZERO;
  @Input() cols?: number;

  @HostBinding('class')
  get hostClasses(): string {
    return `
      mcs-gap--${ this.gap }
    `.trim();
  }

  @HostBinding('style.grid-template-columns')
  get colTemplate(): string | null {
    return this.cols ? `repeat(${ this.cols }, 1fr)` : null;
  }
}
