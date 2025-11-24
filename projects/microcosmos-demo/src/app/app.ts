import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  BadgeComponent,
  ChipComponent,
  Colors,
  COLORS,
  ContainerComponent,
  DividerComponent,
  FlexComponent,
  FLEX_DIRECTION,
  GAPS,
  HelloComponent,
  IconComponent,
  SCREENS,
  SIZES,
  TagComponent,
  THICKNESS,
  Variants,
  VARIANTS,
  FLEX_ALIGN,
  FLEX_JUSTIFY,
  TitleComponent,
  TEXT_ALIGN,
  ButtonComponent,
  ButtonGroupComponent,
  TooltipDirective, CENTRAL_POSITIONS, ClickOutsideDirective, GridComponent, GridItemComponent,
} from 'microcosmos-lib';
import { ICON_NAMES, IconName } from '../../../microcosmos-lib/src/lib/components/icon/icon-names';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    BadgeComponent,
    ButtonComponent,
    ButtonGroupComponent,
    ClickOutsideDirective,
    ContainerComponent,
    CommonModule,
    ChipComponent,
    TooltipDirective,
    DividerComponent,
    FlexComponent,
    HelloComponent,
    IconComponent,
    RouterOutlet,
    TagComponent,
    TitleComponent,
    GridComponent,
    GridItemComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('microcosmos-demo');
  protected readonly GAPS = GAPS;
  protected readonly THICKNESS = THICKNESS;
  protected readonly COLORS = COLORS;
  protected readonly SCREENS = SCREENS;
  protected readonly SIZES = SIZES;
  protected readonly VARIANTS = VARIANTS;
  protected readonly FLEX_DIRECTION = FLEX_DIRECTION;
  protected readonly FLEX_ALIGN = FLEX_ALIGN;
  protected readonly FLEX_JUSTIFY = FLEX_JUSTIFY;
  protected readonly TEXT_ALIGN = TEXT_ALIGN;

  colors: Colors[] = Object.values(this.COLORS).slice(2);
  variants: Variants[] = Object.values(this.VARIANTS);

  buttons: null[] = Array(16);
  chips: string[] = [ 'One Chip', 'Two Chips', 'Three Cheeps', 'For Chips', 'Five Chips', 'Six Chips', 'Seven Chips', 'Height Chips', 'Nine Chips' ];
  tags: string[] = Array.from({ length: 13 }, (_, i): string => `Tag number ${i}`);
  icons: IconName[] = ICON_NAMES.slice(567, 583);

  getValueWithI<T>(map: T[], i: number): T {
    return map[ i % map.length ];
  }

  isFirstPart(map: any[], i: number): boolean {
    return (map.length / 2) > i;
  }
  isInQuarter<T>(map: T[], i: number): boolean {
    const q = Math.floor(map.length / 4);
    return i < q || i >= map.length - q;
  }

  logMe(me: string): void {
    console.log('Log me =>', me);
  }

  protected readonly ICON_NAMES = ICON_NAMES;
  protected readonly CENTRAL_POSITIONS = CENTRAL_POSITIONS;
}
