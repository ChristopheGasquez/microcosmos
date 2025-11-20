import { Component, HostBinding, Input } from '@angular/core';
import { COLORS, type Colors, POSITIONS, type Positions, VARIANTS, type Variants } from '../../constants';

@Component({
  standalone: true,
  selector: 'mcs-badge',
  imports: [],
  template: `
    @if (!value) {
      <ng-content></ng-content>
    } @else {
      <span>{{ displayValue }}</span>
    }
  `,
  styleUrl: './badge.component.scss',
  host: {
    'class': `mcs-badge`,
    '(mouseenter)': 'hovered = true',
    '(mouseleave)': 'hovered = false',
  },
})
export class BadgeComponent {
  public hovered: boolean = false;

  @Input() public color: Colors = COLORS.ERROR;
  @Input() public elevated: boolean = false;
  @Input() public position: Positions = POSITIONS.TOP_RIGHT;
  @Input() public rounded: boolean = true;
  @Input() public variant: Variants = VARIANTS.FILLED;
  @Input() public value?: string | number;
  @Input() public max?: number; // Only for value type number;

  @HostBinding('class') get hostClasses(): string {
    return `
    mcs-color--${ this.color }
    mcs-elevated--${ this.elevated ? 'true': 'false' }
    mcs-position--${ this.position }
    mcs-rounded--${ this.rounded ? 'true' : 'false' }
    mcs-variant--${ this.variant }
    `.trim();
  }

  get displayValue(): string {
    if (this.value == null) return '';

    const numericValue = typeof this.value === 'number'
      ? this.value
      : (!isNaN(Number(this.value)) ? Number(this.value) : NaN);
    const isClamped = !isNaN(numericValue) && this.max !== undefined && numericValue > this.max;

    if (this.hovered && isClamped) return String(this.value);

    if (isClamped) return `${ this.max }+`;

    return String(this.value);
  }

}
