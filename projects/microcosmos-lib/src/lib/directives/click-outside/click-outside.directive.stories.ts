import { Component, Input, signal, type WritableSignal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { Subscription, tap, timer } from 'rxjs';
import { TagComponent } from '../../components/tag/tag.component';
import { FLEX_ALIGN, FLEX_DIRECTION, FLEX_JUSTIFY, GAPS } from '../../constants';
import { FlexComponent } from '../../layouts';
import { ClickOutsideDirective } from './click-outside.directive';

@Component({
  selector: 'story-click-outside-wrapper',
  standalone: true,
  imports: [ TagComponent, ClickOutsideDirective, FlexComponent ],
  template: `
    <mcs-flex [direction]="FLEX_DIRECTION.VERTICAL"
              [gap]="GAPS.XL"
              [align]="FLEX_ALIGN.CENTER"
              [justify]="FLEX_JUSTIFY.CENTER"
              style="min-height: 100px">
        <mcs-tag variant="toned"
                 color="neutral"
                 [mcsClickOutsideDisabled]="disabled"
                 (mcsClickOutside)="setEvent('Click outside')"
                 (click)="setEvent('Click inside')"
                 (mcsEscape)="setEvent('Key press ESC')">
          Clickable area
        </mcs-tag>
        <span>
          <strong>Last event:</strong> {{ lastEvent() }}
        </span>
    </mcs-flex>
  `,

})
class StoryClickOutsideWrapperComponent {
  timoutId?: Subscription;
  @Input() disabled: boolean = false;
  lastEvent: WritableSignal<string> = signal('none');

  setEvent(event: string) {
    console.log(event);
    this.lastEvent.set(event);

    this.timoutId?.unsubscribe();
    this.timoutId = timer(2000).pipe(
      tap(() => this.lastEvent.set('Auto reset')),
    ).subscribe();
  }

  protected readonly FLEX_DIRECTION = FLEX_DIRECTION;
  protected readonly GAPS = GAPS;
  protected readonly FLEX_ALIGN = FLEX_ALIGN;
  protected readonly FLEX_JUSTIFY = FLEX_JUSTIFY;

}

const meta: Meta<StoryClickOutsideWrapperComponent> = {
  title: 'Directives/Clicks Outside/Click Outside',
  component: StoryClickOutsideWrapperComponent,
  standalone: true,
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
  },
  args: {
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component: [
          `Demonstrates the \`mcsClickOutside\` directive. **Click outside** the tag to trigger \`mcsClickOutside\` event. **Press Escape** to trigger \`mcsEscape\` event.`,
          `The \`stopPropagation\` **behavior cannot be reliably demonstrated in Storybook** because Storybook itself relies on click event propagation to update and sync the component’s controls and parameters.`,
        ].join('\n\n'),
      },
    },
  },
} as Meta<StoryClickOutsideWrapperComponent>;

export default meta;

type Story = StoryObj<StoryClickOutsideWrapperComponent>;

export const Default: Story = {
  render: (args) => ({ props: args }),
} as Story;

export const Disabled: Story = {
  render: (args) => ({ props: args }),
  args: {
    disabled: true,
  },
} as Story;

