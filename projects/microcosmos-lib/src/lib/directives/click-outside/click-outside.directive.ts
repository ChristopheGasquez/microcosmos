import { Directive, ElementRef, EventEmitter, inject, Input, type OnDestroy, type OnInit, Output } from '@angular/core';

@Directive({
  selector: '[mcsClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  readonly #el: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
  @Input() mcsClickOutsideDisabled: boolean = false;
  @Input() mcsClickOutsideStopPropagation: boolean = false;

  @Output() mcsClickOutside: EventEmitter<void> = new EventEmitter<void>();
  @Output() mcsEscape: EventEmitter<void> = new EventEmitter<void>();

  #onClick = (event: MouseEvent): void => {
    if (this.mcsClickOutsideDisabled) return;
    if (this.mcsClickOutsideStopPropagation) event.stopPropagation();
    const target: HTMLElement = event.target as HTMLElement;
    if (this.#el.nativeElement.contains(target)) return;
    this.mcsClickOutside.emit();
  };

  #onKeydown = (event: KeyboardEvent): void => {
    if (this.mcsClickOutsideDisabled) return;
    if (event.key === 'Escape') this.mcsEscape.emit();
  };

  ngOnInit(): void {
    document.addEventListener('click', this.#onClick, true);
    document.addEventListener('keydown', this.#onKeydown, true);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.#onClick, true);
    document.removeEventListener('keydown', this.#onKeydown, true);
  }
}
