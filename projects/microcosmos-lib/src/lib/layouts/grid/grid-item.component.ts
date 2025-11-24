import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'mcs-grid-item',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `,
  host: { 'class': `mcs-grid-item` },
})
export class GridItemComponent {
  @Input() span?: number;

  @HostBinding('style.grid-column')
  get colSpan(): string | null {
    return this.span ? `span ${ this.span }` : null;
  }
}
