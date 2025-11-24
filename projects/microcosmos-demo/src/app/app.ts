import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  BadgeComponent,
  ButtonComponent,
  ButtonGroupComponent, CardComponent,
  CENTRAL_POSITIONS,
  ChipComponent,
  ClickOutsideDirective,
  Colors,
  COLORS,
  ContainerComponent,
  DividerComponent,
  FLEX_ALIGN,
  FLEX_DIRECTION,
  FLEX_JUSTIFY,
  FlexComponent,
  GAPS,
  GridComponent,
  GridItemComponent,
  HelloComponent,
  IconComponent, PADDINGS,
  SCREENS,
  SIZES,
  TagComponent,
  TEXT_ALIGN,
  THICKNESS,
  TitleComponent,
  TooltipDirective,
  Variants,
  VARIANTS,
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
    CardComponent,
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
  tags: string[] = Array.from({ length: 13 }, (_, i): string => `Tag number ${ i }`);
  icons: IconName[] = ICON_NAMES.slice(567, 583);
  grid: number[] = [ 1, 1, 2, 2, 2, 1, 2, 1 ];

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
  protected readonly PADDINGS = PADDINGS;
}
