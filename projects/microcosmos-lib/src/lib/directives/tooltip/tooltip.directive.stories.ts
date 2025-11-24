import { Component, Input } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { CENTRAL_POSITIONS, type CentralPositions, FLEX_ALIGN, FLEX_JUSTIFY, GAPS, VARIANTS } from '../../constants';
import { FlexComponent } from '../../layouts';
import { TooltipDirective } from './tooltip.directive';
import { TagComponent } from '../../components/tag/tag.component';
import { COLORS } from '../../constants';

@Component({
  selector: 'story-tooltip-wrapper',
  standalone: true,
  imports: [ TagComponent, TooltipDirective, FlexComponent ],
  template: `
    <mcs-flex [justify]="FLEX_JUSTIFY.CENTER">
      <mcs-tag [variant]="VARIANTS.TONED"
               [color]="COLORS.NEUTRAL"
               [mcsTooltip]="content"
               [mcsTooltipPosition]="position"
               [mcsTooltipDelay]="delay">
        Hover me
      </mcs-tag>
    </mcs-flex>
  `,
})
class StoryTooltipWrapperComponent {
  @Input() content: string = 'Tooltip content';
  @Input() position: CentralPositions = CENTRAL_POSITIONS.TOP;
  @Input() delay: number = 0;
  protected readonly VARIANTS = VARIANTS;
  protected readonly GAPS = GAPS;
  protected readonly COLORS = COLORS;
  protected readonly FLEX_ALIGN = FLEX_ALIGN;
  protected readonly FLEX_JUSTIFY = FLEX_JUSTIFY;
}

const meta: Meta<StoryTooltipWrapperComponent> = {
  title: 'Directives/Tooltips/Tooltip',
  component: StoryTooltipWrapperComponent,
  standalone: true,
  parameters: {
    docs: {
      description: {
        component: `Demonstrates the \`mcsTooltip\` directive. Attach it to any element. Tooltip positions: top, right, bottom, left. Parent should be visible and preferably a neutral color for contrast.`,
      },
    },
  },
  argTypes: {
    content: {
      control: 'text',
    },
    position: {
      control: 'select',
      options: Object.values(CENTRAL_POSITIONS),
    },
    delay: {
      control: 'number',
    },
  },
  args: {
    content: 'Tooltip content',
    position: CENTRAL_POSITIONS.TOP,
    delay: 0,
  },
} as Meta<StoryTooltipWrapperComponent>;

export default meta;

type Story = StoryObj<StoryTooltipWrapperComponent>;

export const Default: Story = {
  render: (args) => ({ props: args }),
} as Story;

export const WithDelay: Story = {
  render: (args) => ({ props: args }),
  args: {
    delay: 500,
  },
} as Story;

