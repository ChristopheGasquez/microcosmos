import { Component, ElementRef, HostBinding, Input, signal, ViewChild, type WritableSignal } from '@angular/core';
import { COLORS, type Colors, VARIANTS, type Variants } from '../../constants';

@Component({
  standalone: true,
  selector: 'mcs-button',
  template: `
    <button #buttonRef
            [disabled]="disabled"
            (focus)="onFocus()"
            (blur)="onBlur()"
            class="mcs-button__inner">
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './button.component.scss',
  host: {
    'class': `mcs-button`,
  },
})
export class ButtonComponent {
  #isFocused: WritableSignal<boolean> = signal(false);
  #isActive: WritableSignal<boolean> = signal(false);

  @ViewChild('buttonRef', { static: true }) buttonRef!: ElementRef<HTMLButtonElement>;

  @Input() color: Colors = COLORS.BRAND;
  @Input() variant: Variants = VARIANTS.FILLED;
  @Input() rounded: boolean = true;
  @Input() elevated: boolean = false;
  @Input() disabled: boolean = false;

  @HostBinding('class') get hostClasses(): string {
    return `
      mcs-color--${ this.color }
      mcs-variant--${ this.variant }
      mcs-rounded--${ this.rounded ? 'true' : 'false' }
      mcs-elevated--${ this.elevated ? 'true' : 'false' }
      mcs-disabled--${ this.disabled ? 'true' : 'false' }
      mcs-focused--${ this.#isFocused() ? 'true' : 'false' }
      mcs-active--${ this.#isActive() ? 'true' : 'false' }
    `.trim();
  }

  onFocus(): void {
    this.#isFocused.set(true);
  }

  onBlur(): void {
    this.#isFocused.set(false);
    this.#isActive.set(false);
  }

  public focus(): void {
    this.buttonRef.nativeElement.focus();
  }
}
