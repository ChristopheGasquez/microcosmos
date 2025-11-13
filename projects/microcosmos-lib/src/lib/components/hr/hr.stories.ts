import type { Meta, StoryObj } from '@storybook/angular';
import { COLORS, GAPS, THICKNESS } from '../../constants';
import { Hr } from './hr';

const meta: Meta<Hr> = {
  title: 'Components/Separators/Hr',
  component: Hr,
  argTypes: {
    color: {
      control: 'select',
      options: Object.values(COLORS),
    },
    gap: {
      control: 'select',
      options: Object.values(GAPS),
    },
    rounded: {
      control: 'boolean',
    },
    thickness: {
      control: 'select',
      options: Object.values(THICKNESS),
    },
  },
} as Meta<Hr>;

export default meta;

type Story = StoryObj<Hr>;

export const Default: Story = {
  args: {
    color: COLORS.NEUTRAL,
    gap: GAPS.XL,
    rounded: false,
    thickness: THICKNESS.XS,
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
