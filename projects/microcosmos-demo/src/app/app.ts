import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ChipComponent, type Colors,
  COLORS,
  DividerComponent,
  GAPS,
  HelloComponent,
  IconComponent,
  SIZES,
  TagComponent,
  THICKNESS,
  VARIANTS,
} from 'microcosmos-lib';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    ChipComponent,
    DividerComponent,
    HelloComponent,
    IconComponent,
    RouterOutlet,
    TagComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('microcosmos-demo');
  protected readonly GAPS = GAPS;
  protected readonly THICKNESS = THICKNESS;
  protected readonly COLORS = COLORS;
  protected readonly SIZES = SIZES;
  protected readonly VARIANTS = VARIANTS;
  colorTest: Colors = COLORS.BRAND;

  select = signal(false);
}
