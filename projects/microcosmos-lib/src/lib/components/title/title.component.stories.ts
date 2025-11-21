import { Component, Input } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import {
  COLORS,
  type Colors,
  FLEX_DIRECTION,
  type FlexDirection,
  TEXT_ALIGN,
  type TextAlign,
  WEIGHT,
  type Weight,
} from '../../constants';
import { FlexComponent } from '../../layouts';
import { TitleComponent } from './title.component';

@Component({
  selector: 'story-title-wrapper',
  standalone: true,
  imports: [ TitleComponent, FlexComponent ],
  template: `
    <mcs-flex gap="md"
              [direction]="direction">
      <mcs-h1 [color]="color"
              [weight]="weight"
              [ellipsis]="ellipsis"
              [align]="align">Heading 1</mcs-h1>
      <mcs-h2 [color]="color"
              [weight]="weight"
              [ellipsis]="ellipsis"
              [align]="align">Heading 2</mcs-h2>
      <mcs-h3 [color]="color"
              [weight]="weight"
              [ellipsis]="ellipsis"
              [align]="align">Heading 3</mcs-h3>
      <mcs-h4 [color]="color"
              [weight]="weight"
              [ellipsis]="ellipsis"
              [align]="align">Heading 4</mcs-h4>
      <mcs-h5 [color]="color"
              [weight]="weight"
              [ellipsis]="ellipsis"
              [align]="align">Heading 5</mcs-h5>
      <mcs-h6 [color]="color"
              [weight]="weight"
              [ellipsis]="ellipsis"
              [align]="align">Heading 6</mcs-h6>
    </mcs-flex>
  `,
})
class StoryTitleWrapperComponent {
  public direction: FlexDirection = FLEX_DIRECTION.HORIZONTAL;
  @Input() public color: Colors = COLORS.INK;
  @Input() public weight: Weight = WEIGHT.REGULAR;
  @Input() public ellipsis: boolean = true;
  @Input() public align: TextAlign = TEXT_ALIGN.START;
}

const meta: Meta<StoryTitleWrapperComponent> = {
  title: 'Components/Titles/Title',
  component: StoryTitleWrapperComponent,
  standalone: true,
  parameters: {
    docs: {
      description: {
        component: 'Displays headings from h1 to h6 with configurable color, weight, alignment, and ellipsis.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: Object.values(COLORS),
    },
    weight: {
      control: 'select',
      options: Object.values(WEIGHT),
    },
    ellipsis: {
      control: 'boolean',
    },
    align: {
      control: 'select',
      options: Object.values(TEXT_ALIGN),
    },
  },
  args: {
    color: COLORS.INK,
    weight: WEIGHT.REGULAR,
    ellipsis: true,
    align: TEXT_ALIGN.START,
  },
} as Meta<StoryTitleWrapperComponent>;

export default meta;

type Story = StoryObj<StoryTitleWrapperComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
  })
} as Story;

export const BoldHeadings: Story = {
  render: (args) => ({
    props: args,
  }),
  args: {
    color: COLORS.BRAND,
    weight: WEIGHT.BOLD,
  },
} as Story;

export const NoEllipsis: Story = {
  render: (args) => ({
    props: args,
  }),
  args: {
    align: TEXT_ALIGN.CENTER,
    color: COLORS.CONTRAST,
    ellipsis: false,
  },
} as Story;

export const CenterAligned: Story = {
  render: (args) => ({
    props: args,
  }),
  args: {
    align: TEXT_ALIGN.END,
  },
} as Story;
