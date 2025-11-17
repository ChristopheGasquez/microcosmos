import type { Meta, StoryObj } from '@storybook/angular';
import { COLORS, WEIGHT } from '../../constants';
import { HelloComponent } from './hello.component';

const meta: Meta<HelloComponent> = {
  title: 'Components/Hello',
  component: HelloComponent,
  argTypes: {
    color: {
      control: 'select',
      options: Object.values(COLORS),
    },
    weight: {
      control: 'select',
      options: Object.values(WEIGHT),
    },
  },
} as Meta<HelloComponent>;

export default meta;

type Story = StoryObj<HelloComponent>;

export const Default: Story = {
  args: {
    color: COLORS.BRAND,
    weight: WEIGHT.REGULAR },
} as Story;

export const Neutral: Story = {

  args: { color: COLORS.NEUTRAL },
} as Story;

export const Light: Story = {
  args: { weight: WEIGHT.LIGHT },
} as Story;

export const Succes_Heavy: Story = {
  title: 'Contrast and Heavy',
  args: {
    color: COLORS.CONTRAST,
    weight: WEIGHT.HEAVY
  },
} as Story;
