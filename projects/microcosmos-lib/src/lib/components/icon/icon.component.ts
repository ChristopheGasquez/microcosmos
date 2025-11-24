import { Component, HostBinding, inject, Input, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { SIZES } from '../../constants';
import type { Colors, Sizes } from '../../constants';
import { type IconName } from './icon-names';
import { registerAllIcons } from './icon-register';
import { IconRegistry } from './icon-registry.service';

@Component({
  selector: 'mcs-icon',
  standalone: true,
  template: `
    <span class="mcs-icon"
          [innerHTML]="svg()"
          [style]="{fill: 'currentColor'}"></span>
  `,
  styleUrls: [ './icon.component.scss' ],
  host: { 'class': 'mcs-icon' },
})
export class IconComponent {
  #registry: IconRegistry = inject(IconRegistry);
  #sanitizer: DomSanitizer = inject(DomSanitizer);

  svg = signal<SafeHtml | null>(null);

  @Input()
  set name(value: IconName) {
    if (!value) {
      this.svg.set(null);
      return;
    }
    this.#loadIcon(value);
  }

  @Input() color?: Colors;
  @Input() size?: Sizes = SIZES.S;
  @Input() proportionalToTheFont?: boolean;

  @HostBinding('class') get hostClasses(): string {
    return `
    ${this.color ? `mcs-color--${this.color}` : ''}
    ${this.proportionalToTheFont ? `mcs-proportional--font` : ''}
    mcs-size--${this.size}
    `.trim();
  }

  constructor() {
    registerAllIcons(this.#registry);
  }

  async #loadIcon(name: string): Promise<void> {
    const raw = await this.#registry.get(name);
    this.svg.set(raw ? this.#sanitizer.bypassSecurityTrustHtml(raw) : null);
  }
}
