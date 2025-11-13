import type { Meta, StoryObj } from '@storybook/angular';
import { COLORS } from '../../constants';
import { Hello } from './hello.component';

const meta: Meta<Hello> = {
  title: 'Components/Hello',
  component: Hello,
  argTypes: {
    color: {
      control: 'select',
      options: Object.values(COLORS),
    },
  },
} as Meta<Hello>;

export default meta;

type Story = StoryObj<Hello>;

export const Default: Story = {
  args: { color: COLORS.NEUTRAL },
} as Story;

export const Brand: Story = {
  args: { color: COLORS.BRAND },
} as Story;
