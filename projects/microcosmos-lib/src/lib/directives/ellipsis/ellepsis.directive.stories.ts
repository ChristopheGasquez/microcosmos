import { Component, Input } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { ParagraphComponent } from '../../components';
import { EllipsisDirective } from './ellipsis.directive';

const LONG_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

@Component({
  selector: 'story-ellipsis-wrapper',
  standalone: true,
  imports: [ EllipsisDirective, ParagraphComponent ],
  template: `
    <mcs-p [mcsEllipsis]="lines">
      {{ text }}
    </mcs-p>
  `,
})
class EllipsisWrapperComponent {
  @Input() lines: number | '' | null = 1;
  @Input() text: string = LONG_TEXT;
}

const meta: Meta<EllipsisWrapperComponent> = {
  title: 'Directives/Ellipsis/Ellipsis',
  component: EllipsisWrapperComponent,
  standalone: true,
  argTypes: {
    lines: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Number of lines to show before truncating with ellipsis',
      defaultValue: 1,
    },
    text: {
      control: 'text',
      description: 'Text content to display',
      defaultValue: LONG_TEXT,
    },
  },
  args: {
    lines: 1,
    text: LONG_TEXT,
  },
} as Meta<EllipsisWrapperComponent>;

export default meta;

type Story = StoryObj<EllipsisWrapperComponent>;

export const Default: Story = {
  render: (args) => ({ props: args }),
} as Story;

export const MultiLine: Story = {
  render: (args) => ({ props: { ...args, lines: 3 } }),
} as Story;
