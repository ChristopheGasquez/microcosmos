import { type Meta, type StoryObj } from '@storybook/angular';
import { COLORS } from '../../constants';
import { TagComponent } from './tag.component';

const meta: Meta<TagComponent> = {
  title: 'Components/Tag',
  component: TagComponent,
  argTypes: {
    color: {
      control: 'select',
      options: Object.values(COLORS),
      defaultValue: { summary: COLORS.NEUTRAL },
    },
    label: {
      control: 'text',
      defaultValue: { summary: 'ng-content' },
    },
  },
} as Meta<TagComponent>;

export default meta;

type Story = StoryObj<TagComponent>;


export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<mcs-tag [color]="color">{{ label }}</mcs-tag>`,
  }),
  args: {
    color: COLORS.NEUTRAL,
    label: 'Tag example',
  },
} as Story;

export const Brand: Story = {
  render: (args) => ({
    props: args,
    template: `<mcs-tag [color]="color">{{ label }}</mcs-tag>`,
  }),
  args: {
    color: COLORS.BRAND,
    label: 'Brand tag',
  },
} as Story;

export const Contrast: Story = {
  render: (args) => ({
    props: args,
    template: `<mcs-tag [color]="color">{{ label }}</mcs-tag>`,
  }),
  args: {
    color: COLORS.CONTRAST,
    label: 'Contrast tag',
  },
} as Story;
export const Success: Story = {
  render: (args) => ({
    props: args,
    template: `<mcs-tag [color]="color">{{ label }}</mcs-tag>`,
  }),
  args: {
    color: COLORS.SUCCESS,
    label: 'Success tag',
  },
} as Story;
