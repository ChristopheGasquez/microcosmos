import { Component, HostBinding, Input } from '@angular/core';
import { SCREENS } from '../../constants';
import type { Screens } from '../../constants';

@Component({
  standalone: true,
  selector: 'mcs-container',
  imports: [],
  template: `
    <ng-content></ng-content>
  `,
  styleUrl: './container.component.scss',
  host: {
    'class': `mcs-container`,
  },
})
export class ContainerComponent {
  @Input() public screen?: Screens = SCREENS.FULL;
  @Input() public fullHeight: boolean = false;

  @HostBinding('class') get hostClasses(): string {
    return `
      mcs-screen--${ this.screen }
      mcs-full-height--${ this.fullHeight ? 'true' : 'false' }
    `.trim();
  }
}
