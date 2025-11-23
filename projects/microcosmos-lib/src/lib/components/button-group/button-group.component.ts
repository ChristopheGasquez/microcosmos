import {
  type AfterContentInit,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  QueryList,
} from '@angular/core';
import type { Colors, Variants } from '../../constants';
import { COLORS, VARIANTS } from '../../constants';
import { ButtonComponent } from '../button/button.component';

@Component({
  standalone: true,
  selector: 'mcs-button-group',
  template: `
    <ng-content></ng-content>
  `,
  styleUrl: './button-group.component.scss',
  host: {
    'class': `mcs-button-group`,
  },
})
export class ButtonGroupComponent implements AfterContentInit {
  @Input() color?: Colors;
  @Input() disabled?: boolean;
  @Input() elevated: boolean = false;
  @Input() rounded: boolean = true;
  @Input() variant?: Variants;

  @HostBinding('class') get hostClasses(): string {
    return `
      mcs-color--${ this.color }
      mcs-disabled--${ this.elevated ? 'true' : 'false' }
      mcs-elevated--${ this.elevated ? 'true' : 'false' }
      mcs-rounded--${ this.rounded ? 'true' : 'false' }
      mcs-variant--${ this.variant }
    `.trim();
  }

  @ContentChildren(ButtonComponent) buttons!: QueryList<ButtonComponent>;

  ngAfterContentInit(): void {
    this.applyPositionClasses();
    this.applyInheritedDefaults();

    this.buttons.changes.subscribe(() => this.applyPositionClasses());
  }

  private applyPositionClasses(): void {
    const list: ButtonComponent[] = this.buttons.toArray();

    list.forEach((button: ButtonComponent, index: number) => {
      const host: HTMLElement = button.hostElement.nativeElement;

      host.classList.remove(
        'mcs-button--first',
        'mcs-button--last',
        'mcs-button--middle',
        'mcs-button--single',
      );

      if (list.length === 1) {
        host.classList.add('mcs-button--single');
      } else if (index === 0) {
        host.classList.add('mcs-button--first');
      } else if (index === list.length - 1) {
        host.classList.add('mcs-button--last');
      } else {
        host.classList.add('mcs-button--middle');
      }
    });
  }

  private applyInheritedDefaults(): void {
    this.buttons.forEach((button: ButtonComponent) => {
      if (button.color === COLORS.BRAND && this.color !== undefined) {
        button.color = this.color;
      }

      if (button.variant === VARIANTS.FILLED && this.variant !== undefined) {
        button.variant = this.variant;
      }

      if (button.rounded) {
        button.rounded = this.rounded;
      }

      if (!button.elevated) {
        button.elevated = this.elevated;
      }

      if (!button.disabled && this.disabled !== undefined) {
        button.disabled = this.disabled;
      }
    });
  }
}
