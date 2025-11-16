import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';
import { type Colors, COLORS, type Sizes, SIZES } from '../../constants';
import { ICON_NAMES } from './icon-names';
import { IconComponent } from './icon.component';

@Component({
  selector: 'mcs-icon-list',
  standalone: true,
  imports: [ CommonModule, IconComponent ],
  template: `
    <div [style]="{ display: 'flex',
                    flexWrap: 'wrap',
                    gap: '24px',
                    alignItem: 'center',
                    justifyContent: 'center',
                    height: 'calc(50vh - 100px)',
                    minHeight: '150px',
                    overflow: 'auto' }">
      <div *ngFor="let name of filteredNames"
           [style.width]="'100px'">
        <div style="text-align: center">
          <mcs-icon [name]="name"
                    [color]="color"
                    [size]="size"
                    [proportionalToTheFont]="proportionalToTheFont"></mcs-icon>
        </div>
        <div style="text-align: center">{{ name }}</div>
      </div>
    </div>
  `,
})
class IconListComponent {
  @Input() names = ICON_NAMES;
  @Input() color?: Colors;
  @Input() search?: string;
  @Input() size?: Sizes;
  @Input() proportionalToTheFont?: boolean;

  get filteredNames() {
    return this.names.filter((n: string) => !this.search || n.includes(this.search));
  }
}

const meta2: Meta<IconListComponent> = {
  component: IconListComponent,
  title: 'Components/Icons/Icon list',
  decorators: [
    componentWrapperDecorator(
      (story) => `${ story }`,
    ),
  ],
  args: {
    search: '',
    color: COLORS.INK,
    size: SIZES.S,
    proportionalToTheFont: false,
  },
  argTypes: {
    search: {
      control: { type: 'text' },
      placeholder: 'Search',
    },
    color: {
      control: 'select',
      options: Object.values(COLORS),
    },
    size: {
      control: 'select',
      options: Object.values(SIZES).slice(2,7),
      defaultValue: { summary: SIZES.S },
    },
  },
} as Meta<IconListComponent>;

export default meta2;
type Story = StoryObj<IconListComponent>;


export const Default: Story = {
  args: {},
} as Story;
