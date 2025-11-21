import { Component, ElementRef, HostBinding, inject, Input, type OnInit, Renderer2 } from '@angular/core';
import { COLORS, type Colors, TEXT_ALIGN, type TextAlign, WEIGHT, type Weight } from '../../constants';

@Component({
  standalone: true,
  selector: 'mcs-h1, mcs-h2, mcs-h3, mcs-h4, mcs-h5, mcs-h6',
  template: '<ng-content></ng-content>',
  styleUrls: [ './title.component.scss' ],
  host: {
    'class': 'mcs-title',
  },
})
export class TitleComponent implements OnInit {
  readonly #host: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
  readonly #renderer: Renderer2 = inject(Renderer2);

  public level: string = 'h1';

  @Input() public color: Colors = COLORS.INK;
  @Input() public weight: Weight = WEIGHT.REGULAR;
  @Input() public ellipsis: boolean = true;
  @Input() public align: TextAlign = TEXT_ALIGN.START;

  @HostBinding('class') get hostClasses(): string {
    return `
      mcs-title--${ this.level }
      mcs-color--${ this.color }
      mcs-ellipsis--${ this.ellipsis ? 'true' : 'false' }
      mcs-text-align--${ this.align }
      mcs-weight--${ this.weight }
    `.trim().replace(/\s+/g, ' ');
  }

  ngOnInit() {
    const tag: string = this.#host.nativeElement.tagName.toLowerCase();
    this.level = tag.replace('mcs-', '');

    const heading = this.#renderer.createElement(this.level);

    while (this.#host.nativeElement.firstChild) {
      this.#renderer.appendChild(heading, this.#host.nativeElement.firstChild);
    }
    this.#renderer.appendChild(this.#host.nativeElement, heading);
  }
}
