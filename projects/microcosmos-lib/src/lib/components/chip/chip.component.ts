import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  signal,
  type WritableSignal,
} from '@angular/core';
import { COLORS, type Colors, VARIANTS, type Variants } from '../../constants';
import { IconComponent } from '../icon/icon.component';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'mcs-chip',
  standalone: true,
  imports: [
    TagComponent,
    IconComponent,
  ],
  template: `
    <mcs-tag [color]="color"
             [elevated]="elevated"
             [rounded]="rounded"
             [variant]="variant">
      @if (selected) {
        <mcs-icon [name]="'check'"
                  [proportionalToTheFont]="true"></mcs-icon>
      }
      <ng-content></ng-content>
      @if (isRemovable) {

<!--Todo: replace by mcs-button with close icon (after is development ;)-->
        <mcs-icon [name]="'close'"
                  [proportionalToTheFont]="true"></mcs-icon>
      }
    </mcs-tag>
  `,
  styleUrl: './chip.component.scss',
  host: {
    'class': `mcs-chip`,
  },
})
export class ChipComponent {
  #isFocused: WritableSignal<boolean> = signal(false);
  #isSelected: WritableSignal<boolean> = signal(false);

  @Input() public isSelectable: boolean = true;
  @Input() public isRemovable: boolean = false;
  @Input() public color: Colors = COLORS.BRAND;
  @Input() public variant: Variants = VARIANTS.OUTLINED;
  @Input() public rounded: boolean = true;
  @Input() public elevated: boolean = false;

  @Input() set selected(value: boolean) {
    this.#isSelected.set(value);
  }

  get selected(): boolean {
    return this.#isSelected();
  }

  @Output() click: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('class') get hostClasses(): string {
    return `
      mcs-color--${ this.color }
      mcs-variant--${ this.variant }
      mcs-rounded--${ this.rounded ? 'true' : 'false' }
      mcs-elevated--${ this.elevated ? 'true' : 'false' }
      mcs-selectable--${ this.isSelectable ? 'true' : 'false' }
      mcs-removable--${ this.isRemovable ? 'true' : 'false' }
      mcs-selected--${ this.#isSelected() ? 'true' : 'false' }
      mcs-focused--${ this.#isFocused() ? 'true' : 'false' }
    `.trim();
  }

  @HostBinding('attr.tabindex') get tabindex(): number | null {
    return this.isSelectable ? 0 : null;
  }

  @HostBinding('attr.role') get role(): string | null {
    return this.isSelectable ? 'button' : null;
  }

  @HostBinding('attr.aria-pressed') get ariaPressed(): boolean | null {
    return this.isSelectable ? this.selected : null;
  }

  @HostListener('focus') onFocus(): void {
    this.#isFocused.set(true);
  }

  @HostListener('blur') onBlur(): void {
    this.#isFocused.set(false);
  }

  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.click.emit();
    }
  }
}
