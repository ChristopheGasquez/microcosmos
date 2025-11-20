import { Component, Input } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { COLORS, type Colors, POSITIONS, type Positions, VARIANTS, type Variants } from '../../constants';
import { BadgeComponent } from './badge.component';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'story-badge-wrapper',
  standalone: true,
  imports: [TagComponent, BadgeComponent],
  template: `
    <div style="display: flex;justify-content: center; align-content: center">
      <mcs-tag variant="outlined"
               color="brand"
               [style.position]="'relative'"
               [style.display]="'inline-block'">
        Badge parent
        <mcs-badge [value]="value"
                   [max]="max"
                   [color]="color"
                   [position]="position"
                   [variant]="variant"
                   [rounded]="rounded"
                   [elevated]="elevated">
        </mcs-badge>
      </mcs-tag>
    </div>
  `,
})
class StoryBadgeWrapperComponent {
  @Input() public value?: string | number;
  @Input() public max?: number;
  @Input() public color: Colors = COLORS.ERROR;
  @Input() public position: Positions = POSITIONS.TOP_RIGHT;
  @Input() public variant: Variants = VARIANTS.FILLED;
  @Input() public rounded: boolean = true;
  @Input() public elevated: boolean = false;
}

const meta: Meta<StoryBadgeWrapperComponent> = {
  title: 'Components/Badges/Badge',
  component: StoryBadgeWrapperComponent,
  standalone: true,
  parameters: {
    docs: {
      description: {
        component: `⚠️ The badge must be placed on a parent with \`position: relative\` (here we use a <mcs-tag>) so that it positions correctly.`,
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Value displayed inside the badge',
    },
    max: {
      control: 'number',
      description: 'Maximum value if `value` is a number',
    },
    color: {
      control: 'select',
      options: Object.values(COLORS).slice(),
    },
    position: {
      control: 'select',
      options: Object.values(POSITIONS),
    },
    variant: {
      control: 'select',
      options: Object.values(VARIANTS),
    },
    rounded: {
      control: 'boolean',
    },
    elevated: {  // <-- ajout du control
      control: 'boolean',
      description: 'Adds elevation style to the badge',
    },
  },
  args: {
    value: '590',
    max: 99,
    color: COLORS.ERROR,
    position: POSITIONS.TOP_RIGHT,
    variant: VARIANTS.FILLED,
    rounded: true,
    elevated: false, // <-- valeur par défaut
  },
} as Meta<StoryBadgeWrapperComponent>;

export default meta;

type Story = StoryObj<StoryBadgeWrapperComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
  }),
} as Story;

export const WithNumberClamping: Story = {
  render: (args) => ({
    props: args,
  }),
  args: {
    value: 12,
    max: 9,
    color: COLORS.SUCCESS
  },
} as Story;

export const Elevated: Story = {
  render: (args) => ({
    props: args,
  }),
  args: {
    variant: VARIANTS.FILLED,
    elevated: true,
    color: COLORS.BRAND,
    value: "favorite",
    max: undefined
  },
} as Story;

export const Toned: Story = {
  render: (args) => ({
    props: args,
  }),
  args: {
    variant: VARIANTS.TONED,
    color: COLORS.NEUTRAL,
    value: 'private',
  },
} as Story;
