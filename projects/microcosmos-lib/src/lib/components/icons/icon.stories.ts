import { type Meta, type StoryObj } from '@storybook/angular';
import { COLORS } from '../../constants';
import { ICON_NAMES } from './icon-names';
import { IconRegistry } from './icon-registry.service';
import { registerAllIcons } from './icon-register';
import { IconComponent } from './icon.component';

const meta: Meta<IconComponent> = {
  title: 'Components/Media/Icon',
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
    }
  },
  args: {
    name: 'home',
    color: COLORS.INK
  },
} as Meta<IconComponent>;

export default meta;

type Story = StoryObj<IconComponent>;

export const Playground: Story = {
  args: {},
} as Story;

