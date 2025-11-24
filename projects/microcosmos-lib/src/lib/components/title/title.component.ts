import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostBinding, inject, Input } from '@angular/core';
import { COLORS, type Colors, TEXT_ALIGN, type TextAlign, WEIGHT, type Weight } from '../../constants';

@Component({
  standalone: true,
  selector: 'mcs-h1, mcs-h2, mcs-h3, mcs-h4, mcs-h5, mcs-h6',
  imports: [ CommonModule ],
  template: `
    @switch (level) {
      @case (1) { <h1><ng-container [ngTemplateOutlet]="content"></ng-container></h1> }
      @case (2) { <h2><ng-container [ngTemplateOutlet]="content"></ng-container></h2> }
      @case (3) { <h3><ng-container [ngTemplateOutlet]="content"></ng-container></h3> }
      @case (4) { <h4><ng-container [ngTemplateOutlet]="content"></ng-container></h4> }
      @case (5) { <h5><ng-container [ngTemplateOutlet]="content"></ng-container></h5> }
      @case (6) { <h6><ng-container [ngTemplateOutlet]="content"></ng-container></h6> }
    }

    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `,
  styleUrls: [ './title.component.scss' ],
  host: { 'class': `mcs-title` },
})
export class TitleComponent {
  readonly #host: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

  @Input() color: Colors = COLORS.INK;
  @Input() weight: Weight = WEIGHT.REGULAR;
  @Input() ellipsis: boolean = true;
  @Input() align: TextAlign = TEXT_ALIGN.START;

  level: number = Number(
    this.#host.nativeElement.tagName.toLowerCase().replace('mcs-h', ''),
  );

  @HostBinding('class') get hostClasses(): string {
    return `
      mcs-title--h${ this.level }
      mcs-color--${ this.color }
      mcs-ellipsis--${ this.ellipsis ? 'true' : 'false' }
      mcs-text-align--${ this.align }
      mcs-f-weight--${ this.weight }
    `.trim();
  };
}
