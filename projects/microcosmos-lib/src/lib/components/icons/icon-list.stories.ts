import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';
import { type Colors, COLORS } from '../../constants';
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
                    [color]="color"></mcs-icon>
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

  get filteredNames() {
    return this.names.filter((n: string) => !this.search || n.includes(this.search));
  }
}

const meta2: Meta<IconListComponent> = {
  component: IconListComponent,
  title: 'Components/Media/Icon list',
  decorators: [
    componentWrapperDecorator(
      (story) => `${ story }`,
    ),
  ],
  args: {
    search: '',
    color: COLORS.INK,
  },
  argTypes: {
    search: {
      control: { type: 'text' },
      placeholder: 'Search'
    },
    color: {
      control: 'select',
      options: Object.values(COLORS),
    },
  },
} as Meta<IconListComponent>;

export default meta2;
type Story = StoryObj<IconListComponent>;


export const Default: Story = {
  args: {},
} as Story;
