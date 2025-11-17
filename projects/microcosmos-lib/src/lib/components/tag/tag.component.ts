import { Component, HostBinding, Input } from '@angular/core';
import { COLORS, type Colors } from '../../constants';

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

  @HostBinding('class') get hostClasses(): string {
    return `
    mcs-color--${ this.color }
    `.trim();
  }
}
