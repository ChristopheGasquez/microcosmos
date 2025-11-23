import { Component, Input } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

import { COLORS, type Colors, VARIANTS, type Variants } from '../../constants';
import { ButtonComponent } from '../button/button.component';
import { ButtonGroupComponent } from './button-group.component';

@Component({
  selector: 'story-button-group-wrapper',
  standalone: true,
  imports: [ButtonGroupComponent, ButtonComponent],
  template: `
    <mcs-button-group
      [color]="color"
      [variant]="variant"
      [rounded]="rounded"
      [elevated]="elevated"
      [disabled]="disabled">
      <mcs-button>First</mcs-button>
      <mcs-button>Second</mcs-button>
      <mcs-button>Third</mcs-button>
    </mcs-button-group>
  `,
})
class StoryButtonGroupWrapperComponent {
  @Input() public color?: Colors;
  @Input() public variant?: Variants;
  @Input() public rounded: boolean = true;
  @Input() public elevated: boolean = false;
  @Input() public disabled?: boolean;
}

const meta: Meta<StoryButtonGroupWrapperComponent> = {
  title: 'Components/Buttons/Button Group',
  component: StoryButtonGroupWrapperComponent,
  standalone: true,
  parameters: {
    docs: {
      description: {
        component: `Groups buttons together and applies inherited defaults for variant, color, rounding, elevation and disabled state.`,
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: Object.values(COLORS).slice(2),
    },
    variant: {
      control: 'select',
      options: Object.values(VARIANTS),
    },
    rounded: {
      control: 'boolean',
      defaultValue: { summary: true },
    },
    elevated: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    color: undefined,
    variant: undefined,
    rounded: true,
    elevated: false,
    disabled: undefined,
  },
} as Meta<StoryButtonGroupWrapperComponent>;

export default meta;

type Story = StoryObj<StoryButtonGroupWrapperComponent>;

export const Default: Story = {
  render: (args) => ({ props: args }),
} as Story;

export const Toned: Story = {
  render: (args) => ({ props: args }),
  args: {
    variant: VARIANTS.TONED,
    color: COLORS.INFO,
  },
} as Story;

export const Outlined: Story = {
  render: (args) => ({ props: args }),
  args: {
    variant: VARIANTS.OUTLINED,
    color: COLORS.BRAND,
  },
} as Story;

export const Disabled: Story = {
  render: (args) => ({ props: args }),
  args: {
    disabled: true,
  },
} as Story;

export const Elevated: Story = {
  render: (args) => ({ props: args }),
  args: {
    elevated: true,
    color: COLORS.CONTRAST,
  },
} as Story;

export const Square: Story = {
  render: (args) => ({ props: args }),
  args: {
    rounded: false,
  },
} as Story;

export const MixedCustomButtons: Story = {
  render: () => ({
    template: `
      <mcs-button-group>
        <mcs-button color="success" variant="filled">Save</mcs-button>
        <mcs-button color="warning" variant="toned">Draft</mcs-button>
        <mcs-button color="error" variant="outlined">Delete</mcs-button>
      </mcs-button-group>
    `,
  }),
} as Story;
