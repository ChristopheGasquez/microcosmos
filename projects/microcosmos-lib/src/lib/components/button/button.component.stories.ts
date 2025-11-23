import { Component, Input } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { COLORS, type Colors, VARIANTS, type Variants } from '../../constants';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'story-button-wrapper',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <mcs-button
      [color]="color"
      [variant]="variant"
      [rounded]="rounded"
      [elevated]="elevated"
      [disabled]="disabled">
      {{ label }}
    </mcs-button>
  `,
})
class StoryButtonWrapperComponent {
  @Input() public color: Colors = COLORS.BRAND;
  @Input() public variant: Variants = VARIANTS.FILLED;
  @Input() public rounded: boolean = true;
  @Input() public elevated: boolean = false;
  @Input() public disabled: boolean = false;
  @Input() public label: string = 'Button';
}

const meta: Meta<StoryButtonWrapperComponent> = {
  title: 'Components/Buttons/Button',
  component: StoryButtonWrapperComponent,
  standalone: true,
  parameters: {
    docs: {
      description: {
        component: `Standard button component supporting variants, colors, rounded corners, elevation and disabled state.`,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Button content (ng-content)',
      defaultValue: { summary: 'Button' },
    },
    color: {
      control: 'select',
      options: Object.values(COLORS).slice(2),
      description: 'Button color',
      defaultValue: { summary: COLORS.BRAND },
    },
    variant: {
      control: 'select',
      options: Object.values(VARIANTS),
      description: 'Button visual style',
      defaultValue: { summary: VARIANTS.FILLED },
    },
    rounded: {
      control: 'boolean',
      description: 'Enable rounded corners',
      defaultValue: { summary: true },
    },
    elevated: {
      control: 'boolean',
      description: 'Apply elevation style',
      defaultValue: { summary: false },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction',
      defaultValue: { summary: false },
    },
  },
  args: {
    label: 'Button',
    color: COLORS.BRAND,
    variant: VARIANTS.FILLED,
    rounded: true,
    elevated: false,
    disabled: false,
  },
} as Meta<StoryButtonWrapperComponent>;

export default meta;

type Story = StoryObj<StoryButtonWrapperComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
  }),
} as Story;

export const Toned: Story = {
  render: (args) => ({
    props: args,
  }),
  args: {
    variant: VARIANTS.TONED,
    color: COLORS.INFO,
  },
} as Story;

export const Outlined: Story = {
  render: (args) => ({
    props: args,
  }),
  args: {
    variant: VARIANTS.OUTLINED,
    color: COLORS.BRAND,
  },
} as Story;

export const Disabled: Story = {
  render: (args) => ({
    props: args,
  }),
  args: {
    disabled: true,
  },
} as Story;

export const Elevated: Story = {
  render: (args) => ({
    props: args,
  }),
  args: {
    elevated: true,
    variant: VARIANTS.FILLED,
    color: COLORS.CONTRAST,
  },
} as Story;

export const Rounded: Story = {
  render: (args) => ({
    props: args,
  }),
  args: {
    rounded: true,
    variant: VARIANTS.TONED,
    color: COLORS.SUCCESS,
  },
} as Story;
