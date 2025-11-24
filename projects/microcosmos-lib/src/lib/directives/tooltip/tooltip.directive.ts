import { Directive, ElementRef, HostListener, inject, Input, type OnDestroy, Renderer2 } from '@angular/core';
import { CENTRAL_POSITIONS, type CentralPositions } from '../../constants';

@Directive({
  selector: '[mcsTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  private static tooltipIdCounter: number = 0;

  #el: ElementRef = inject(ElementRef);
  #renderer: Renderer2 = inject(Renderer2);
  #tooltipEl?: HTMLDivElement;
  #showTimeout?: any;
  #hideTimeout?: any;
  readonly #id: string;

  @Input('mcsTooltip') content!: string;
  @Input() mcsTooltipPosition: CentralPositions = CENTRAL_POSITIONS.TOP;
  @Input() mcsTooltipDelay: number = 0;

  constructor() {
    TooltipDirective.tooltipIdCounter += 1;
    this.#id = `mcs-tooltip-${ TooltipDirective.tooltipIdCounter }`;
  }

  @HostListener('mouseenter')
  @HostListener('focus')
  show(): void {
    if (!this.content) return;

    clearTimeout(this.#hideTimeout);
    this.#showTimeout = setTimeout((): void => {
      if (!this.#tooltipEl) {
        this.#createTooltip();
        this.#updatePosition();
      }
    }, this.mcsTooltipDelay);
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  hide(): void {
    clearTimeout(this.#showTimeout);
    if (!this.#tooltipEl) return;

    this.#renderer.setStyle(this.#tooltipEl, 'opacity', '0');
    this.#hideTimeout = setTimeout(() => {
      this.#destroyTooltip();
    }, this.mcsTooltipDelay);
  }

  #createTooltip(): void {
    this.#tooltipEl = this.#renderer.createElement('div');
    this.#renderer.addClass(this.#tooltipEl, 'mcs-tooltip');
    this.#renderer.setAttribute(this.#tooltipEl, 'role', 'tooltip');
    this.#renderer.setAttribute(this.#tooltipEl, 'id', this.#id);
    this.#renderer.setProperty(this.#tooltipEl, 'textContent', this.content);

    const arrow = this.#renderer.createElement('div');
    this.#renderer.addClass(arrow, 'mcs-tooltip-arrow');
    this.#renderer.appendChild(this.#tooltipEl, arrow);

    this.#renderer.appendChild(document.body, this.#tooltipEl);
  }

  #updatePosition(): void {
    if (!this.#tooltipEl) return;

    const hostRect = this.#el.nativeElement.getBoundingClientRect();
    const tooltipRect: DOMRect = this.#tooltipEl.getBoundingClientRect();
    let pos: CentralPositions = this.mcsTooltipPosition;

    if (pos === 'top' && hostRect.top - tooltipRect.height - 6 < 0) pos = 'bottom';
    if (pos === 'bottom' && hostRect.bottom + tooltipRect.height + 6 > window.innerHeight) pos = 'top';
    if (pos === 'left' && hostRect.left - tooltipRect.width - 6 < 0) pos = 'right';
    if (pos === 'right' && hostRect.right + tooltipRect.width + 6 > window.innerWidth) pos = 'left';

    // classes
    this.#renderer.removeClass(this.#tooltipEl, 'mcs-position--top');
    this.#renderer.removeClass(this.#tooltipEl, 'mcs-position--bottom');
    this.#renderer.removeClass(this.#tooltipEl, 'mcs-position--left');
    this.#renderer.removeClass(this.#tooltipEl, 'mcs-position--right');
    this.#renderer.addClass(this.#tooltipEl, `mcs-position--${ pos }`);

    setTimeout(() => this.#tooltipEl?.classList.add('show'));

    let top = 0, left = 0;
    switch (pos) {
      case 'top':
        top = hostRect.top - tooltipRect.height - 6;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + 6;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - 6;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + 6;
        break;
    }

    if (left < 4) left = 4;
    if (left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width - 4;
    if (top < 4) top = 4;
    if (top + tooltipRect.height > window.innerHeight) top = window.innerHeight - tooltipRect.height - 4;

    this.#renderer.setStyle(this.#tooltipEl, 'top', `${ top + window.scrollY }px`);
    this.#renderer.setStyle(this.#tooltipEl, 'left', `${ left + window.scrollX }px`);
  }


  #destroyTooltip(): void {
    if (this.#tooltipEl) {
      this.#renderer.removeChild(document.body, this.#tooltipEl);
      this.#tooltipEl = undefined;
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.#showTimeout);
    clearTimeout(this.#hideTimeout);
    this.#destroyTooltip();
  }
}
