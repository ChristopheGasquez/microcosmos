import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  Hello,
  DividerComponent,
  IconComponent,
  COLORS,
  GAPS,
  SIZES,
  THICKNESS,
} from 'microcosmos-lib';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [ RouterOutlet, Hello, DividerComponent, IconComponent ],
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
