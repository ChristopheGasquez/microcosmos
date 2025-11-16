import { Input } from '@angular/core';
import { type Meta, type StoryObj } from '@storybook/angular';
import { COLORS, SIZES } from '../../constants';
import { ICON_NAMES } from './icon-names';
import { IconRegistry } from './icon-registry.service';
import { registerAllIcons } from './icon-register';
import { IconComponent } from './icon.component';

const meta: Meta<IconComponent> = {
  title: 'Components/Icons/Icon',
  component: IconComponent,
  decorators: [
    (story) => {
      const registry = new IconRegistry();
      registerAllIcons(registry);
      return story();
    },
  ],
  argTypes: {
    name: {
      control: 'select',
      options: ICON_NAMES
    },
    color: {
      control: 'select',
      options: Object.values(COLORS)
    },
    size: {
      control: 'select',
      options: Object.values(SIZES),
      defaultValue: { summary: SIZES.S },

    },
    proportionalToTheFont: {
      control: 'boolean',
      defaultValue: { summary: false },

    }
  },
  args: {
    name: 'home',
    size: SIZES.XXXL,
    color: COLORS.BRAND,
    proportionalToTheFont: false,
  },
} as Meta<IconComponent>;

export default meta;

type Story = StoryObj<IconComponent>;

export const Playground: Story = {
  args: {},
} as Story;

