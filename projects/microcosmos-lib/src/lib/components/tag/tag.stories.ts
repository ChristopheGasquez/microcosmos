import { type Meta, type StoryObj } from '@storybook/angular';
import { COLORS, VARIANTS } from '../../constants';
import { TagComponent } from './tag.component';

const meta: Meta<TagComponent> = {
  title: 'Components/Tags/Tag',
  component: TagComponent,
  argTypes: {
    color: {
      control: 'select',
      options: Object.values(COLORS),
      defaultValue: { summary: COLORS.NEUTRAL },
    },
    variant: {
      control: 'select',
      options: Object.values(VARIANTS),
      defaultValue: { summary: VARIANTS.TONED },
    },
    label: {
      control: 'text',
      defaultValue: { summary: 'ng-content' },
    },
    rounded: {
      control: 'boolean',
      defaultValue: { summary: true },
    },
    elevated: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
  },
} as Meta<TagComponent>;

export default meta;

type Story = StoryObj<TagComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<mcs-tag [color]="color" [variant]="variant" [rounded]="rounded" [elevated]="elevated">{{ label }}</mcs-tag>`,
  }),
  args: {
    label: 'Tag example',
    variant: VARIANTS.TONED,
    color: COLORS.NEUTRAL,
    rounded: true,
    elevated: false,
  },
} as Story;

export const Filled: Story = {
  title: 'Filled',
  render: (args) => ({
    props: args,
    template: `<mcs-tag [color]="color" [variant]="variant" [rounded]="rounded" [elevated]="elevated">{{ label }}</mcs-tag>`,
  }),
  args: {
    color: COLORS.BRAND,
    label: 'Filled tag',
    variant: VARIANTS.FILLED,
    rounded: true,
    elevated: false,
  },
} as Story;

export const Outlined: Story = {
  title: 'Outlined',
  render: (args) => ({
    props: args,
    template: `<mcs-tag [color]="color" [variant]="variant" [rounded]="rounded" [elevated]="elevated">{{ label }}</mcs-tag>`,
  }),
  args: {
    color: COLORS.CONTRAST,
    label: 'Outlined tag',
    variant: VARIANTS.OUTLINED,
    rounded: true,
    elevated: false,
  },
} as Story;
export const Square: Story = {
  title: 'Squared',
  render: (args) => ({
    props: args,
    template: `<mcs-tag [color]="color" [variant]="variant" [rounded]="rounded" [elevated]="elevated">{{ label }}</mcs-tag>`,
  }),
  args: {
    color: COLORS.SUCCESS,
    label: 'Squared tag',
    variant: VARIANTS.OUTLINED,
    rounded: false,
    elevated: false,
  },
} as Story;

export const Elevated: Story = {
  title: 'Elevated',
  render: (args) => ({
    props: args,
    template: `<mcs-tag [color]="color" [variant]="variant" [rounded]="rounded" [elevated]="elevated">{{ label }}</mcs-tag>`,
  }),
  args: {
    color: COLORS.WARNING,
    label: 'Elevated tag',
    variant: VARIANTS.TONED,
    rounded: true,
    elevated: true,
  },
} as Story;
