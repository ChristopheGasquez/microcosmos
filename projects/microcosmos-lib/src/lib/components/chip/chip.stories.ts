import { type Meta, type StoryObj } from '@storybook/angular';
import { COLORS, VARIANTS } from '../../constants';
import { ChipComponent } from './chip.component';

const meta: Meta<ChipComponent> = {
  title: 'Components/Chips/Chip',
  component: ChipComponent,
  argTypes: {
    isRemovable: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
    isSelectable: {
      control: 'boolean',
      defaultValue: { summary: true },
    },
    selected: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
    variant: {
      control: 'select',
      options: Object.values(VARIANTS),
      defaultValue: { summary: VARIANTS.OUTLINED },
    },
    color: {
      control: 'select',
      options: Object.values(COLORS),
      defaultValue: { summary: COLORS.BRAND },
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
} as Meta<ChipComponent>;

export default meta;


type Story = StoryObj<ChipComponent>;

const _initialArgs = {
  label: 'Chip example',
  isRemovable: false,
  isSelectable: true,
  selected: false,
  variant: VARIANTS.OUTLINED,
  color: COLORS.BRAND,
  rounded: true,
  elevated: false,
};

const _initialTemplate = `
  <mcs-chip [isRemovable]="isRemovable"
            [isSelectable]="isSelectable"
            [selected]="selected"
            [color]="color"
            [variant]="variant"
            [rounded]="rounded"
            [elevated]="elevated">
    {{ label }}
  </mcs-chip>
`;

export const Default: Story = {
  storyName: 'Default chip',
  render: (args) => ({
    props: args,
    template: _initialTemplate,
  }),
  args: _initialArgs,
} as Story;

export const Selected: Story = {
  render: (args) => ({
    props: args,
    template: _initialTemplate,
  }),
  args: {
    ..._initialArgs,
    variant: VARIANTS.TONED,
    selected: true
  },
} as Story;

export const Elevated: Story = {
  render: (args) => ({
    props: args,
    template: _initialTemplate,
  }),
  args: {
    ..._initialArgs,
    variant: VARIANTS.FILLED,
    color: COLORS.CONTRAST,
    elevated: true,
    selected: true
  },
} as Story;

export const Removable: Story = {
  render: (args) => ({
    props: args,
    template: _initialTemplate,
  }),
  args: {
    ..._initialArgs,
    color: COLORS.INFO,
    removable: true
  },
} as Story;

