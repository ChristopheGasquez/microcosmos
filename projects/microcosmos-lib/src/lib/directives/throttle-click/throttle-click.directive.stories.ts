import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { ButtonComponent, TagComponent } from '../../components';
import { COLORS, FLEX_ALIGN, FLEX_DIRECTION, FLEX_JUSTIFY, GAPS, VARIANTS } from '../../constants';
import { FlexComponent } from '../../layouts';

import { ThrottleClickDirective } from './throttle-click.directive';

@Component({
  standalone: true,
  selector: 'story-throttle-click-wrapper',
  imports: [ CommonModule, ThrottleClickDirective, FlexComponent, TagComponent, ButtonComponent ],
  template: `
    <mcs-flex [gap]="GAPS.MD"
              [direction]="FLEX_DIRECTION.VERTICAL"
              [align]="FLEX_ALIGN.CENTER">
      <mcs-button [mcsThrottleClickDelay]="delay"
                  (mcsThrottleClick)="onThrottledClick($event)">
        Cliquez rapidement
      </mcs-button>

      @if (log) {
        <mcs-tag [color]="COLORS.BRAND"
                 [variant]="VARIANTS.OUTLINED">
        {{ log }}
      </mcs-tag>
      }
    </mcs-flex>
  `,
})
class ThrottleClickStoryWrapperComponent {
  protected readonly COLORS = COLORS;
  protected readonly FLEX_ALIGN = FLEX_ALIGN;
  protected readonly FLEX_DIRECTION = FLEX_DIRECTION;
  protected readonly FLEX_JUSTIFY = FLEX_JUSTIFY;
  protected readonly GAPS = GAPS;
  protected readonly VARIANTS = VARIANTS;

  delay: number = 500;
  log: string = '';

  onThrottledClick(): void {
    const ts: number = new Date().getTime();
    this.log = `[${ ts }] Click reçu (throttled)`;
  }
}

const meta: Meta<ThrottleClickStoryWrapperComponent> = {
  title: 'Directives/Throttle Clicks/ThrottleClick',
  component: ThrottleClickStoryWrapperComponent,
  decorators: [
    moduleMetadata({
      imports: [ ThrottleClickDirective, ButtonComponent, TagComponent, FlexComponent ],
    }),
  ],
  argTypes: {
    delay: {
      name: 'Throttle Delay (ms)',
      control: { type: 'number' },
      defaultValue: 500,
    },
  },
} as Meta<ThrottleClickStoryWrapperComponent>;
export default meta;

type Story = StoryObj<ThrottleClickStoryWrapperComponent>;

export const Default: Story = {
  args: {
    delay: 500,
  },
  render: (args) => ({
    props: {
      delay: args.delay,
    },
  }),
} as Story;
