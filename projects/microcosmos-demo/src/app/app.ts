import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ChipComponent, type Colors,
  COLORS,
  ContainerComponent,
  DividerComponent,
  FlexComponent,
  GAPS,
  HelloComponent,
  IconComponent,
  SCREENS,
  SIZES,
  TagComponent,
  THICKNESS,
  VARIANTS,
} from 'microcosmos-lib';
import { BadgeComponent } from '../../../microcosmos-lib/src/lib/components';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    BadgeComponent,
    ChipComponent,
    DividerComponent,
    FlexComponent,
    HelloComponent,
    IconComponent,
    RouterOutlet,
    TagComponent,
    ContainerComponent
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
  colorTest: Colors = COLORS.BRAND;

  select = signal(false);
}
