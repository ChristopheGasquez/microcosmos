import { Component, HostBinding, Input } from '@angular/core';
import { COLORS, type Colors, WEIGHT, type Weight } from '../../constants';

@Component({
  standalone: true,
  selector: 'mcs-hello',
  imports: [],
  styleUrls: [ './hello.component.scss' ],
  template: `
    <h2>
      Hello Microcosmos
    </h2>
  `,
  host: {
    'class': `mcs-hello`,
  },
})
export class HelloComponent {
  @Input() public color: Colors = COLORS.BRAND;
  @Input() public weight: Weight = WEIGHT.REGULAR;

  @HostBinding('class') get hostClasses(): string {
    return `
    mcs-color--${ this.color }
    mcs-f-weight--${ this.weight }
    `.trim();
  }
}
