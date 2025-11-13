import { Component, HostBinding, Input } from '@angular/core';
import { COLORS, type Colors } from '../../constants';

@Component({
  standalone: true,
  selector: 'mcs-hello',
  imports: [],
  styleUrls: [ './hello.component.scss' ],
  template: `
    <h2>
      Bonjour Microcosmos
    </h2>
  `,
  host: {
    'class': `mcs-hello`,
  },
})
export class Hello {
  @Input() public color: Colors = COLORS.BRAND;


  @HostBinding('class') get hostClasses(): string {
    return `
    mcs-color--${ this.color }
    `.trim();
  }
}
