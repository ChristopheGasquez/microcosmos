import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hr, Hello, COLORS, GAPS, THICKNESS } from 'microcosmos-lib';
import { IconComponent } from '../../../microcosmos-lib/src/lib/components';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [ RouterOutlet, Hello, Hr, IconComponent ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('microcosmos-demo');
  readonly GAPS = GAPS;
  protected readonly THICKNESS = THICKNESS;
  protected readonly COLORS = COLORS;
}

