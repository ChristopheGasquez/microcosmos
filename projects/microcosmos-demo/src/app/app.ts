import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  DividerComponent,
  HelloComponent,
  IconComponent,
  TagComponent,
  COLORS,
  GAPS,
  SIZES,
  THICKNESS,
} from 'microcosmos-lib';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [ RouterOutlet, HelloComponent, DividerComponent, IconComponent, TagComponent ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('microcosmos-demo');
  protected readonly GAPS = GAPS;
  protected readonly THICKNESS = THICKNESS;
  protected readonly COLORS = COLORS;
  protected readonly SIZES = SIZES;
}
