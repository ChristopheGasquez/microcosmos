import { Component, HostBinding, Input } from '@angular/core';
import {
  COLORS,
  type Colors,
  MARGINS,
  type Margins,
  TEXT_ALIGN,
  type TextAlign,
  WEIGHT,
  type Weight,
} from '../../constants';
import { FONT_SIZE, FONT_STYLE, type FontSize, type FontStyle } from '../../constants/fonts';

@Component({
  selector: 'mcs-p',
  standalone: true,
  imports: [],
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: [ './paragraph.component.scss' ],
  host: {
    'class': `mcs-p`,
  },
})
export class ParagraphComponent {
  @Input() align: TextAlign = TEXT_ALIGN.START;
  @Input() color: Colors = COLORS.INK;
  @Input() fontSize: FontSize = FONT_SIZE.MD;
  @Input() fontStyle: FontStyle = FONT_STYLE.NORMAL;
  @Input() marginBottom: Margins = MARGINS.ZERO;
  @Input() weight: Weight = WEIGHT.REGULAR;

  @HostBinding('class') get hostClasses(): string {
    return `
      mcs-color--${ this.color }
      mcs-f-size--${ this.fontSize }
      mcs-f-style--${ this.fontStyle }
      mcs-text-align--${ this.align }
      mcs-margin-bottom--${ this.marginBottom }
      mcs-f-weight--${ this.weight }
    `.trim();
  }
}
