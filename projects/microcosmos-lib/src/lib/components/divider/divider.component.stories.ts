import type { Meta, StoryObj } from '@storybook/angular';
import { COLORS, GAPS, THICKNESS } from '../../constants';
import { DividerComponent } from './divider.component';

const meta: Meta<DividerComponent> = {
  title: 'Components/Dividers/Divider',
  component: DividerComponent,
  argTypes: {
    color: {
      control: 'select',
      options: Object.values(COLORS),
      defaultValue: { summary: COLORS.NEUTRAL }
    },
    thickness: {
      control: 'select',
      options: Object.values(THICKNESS),
      defaultValue: { summary: THICKNESS.XS },
    },
    gap: {
      control: 'select',
      options: Object.values(GAPS),
      defaultValue: { summary: GAPS.XL },
    },
    rounded: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
  },
  args: {
    color: COLORS.NEUTRAL,
    thickness: THICKNESS.XS,
    gap: GAPS.XL,
    rounded: false
  }
} as Meta<DividerComponent>;

export default meta;

type Story = StoryObj<DividerComponent>;

export const Default: Story = {
  args: {
    color: COLORS.NEUTRAL,
    thickness: THICKNESS.XS,
    gap: GAPS.XL,
    rounded: false,
  },
} as Story;

export const Rounded: Story = {
  args: {
    color: COLORS.BRAND,
    gap: GAPS.XL,
    rounded: true,
    thickness: THICKNESS.MD,
  },
} as Story;

export const Thick: Story = {
  args: {
    color: COLORS.INK,
    gap: GAPS.MD,
    rounded: false,
    thickness: THICKNESS.LG,
  },
} as Story;
