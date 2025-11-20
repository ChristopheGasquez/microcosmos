import { Component, Input } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { SCREENS, type Screens } from '../../constants';
import { ContainerComponent } from './container.component';

@Component({
  selector: 'story-container-wrapper',
  standalone: true,
  imports: [ ContainerComponent ],
  template: `
    <div [style]="{ height: '150px',
                    borderLeft: 'var(--mcs-thickness--md) solid var(--mcs-color--neutral--20)',
                    borderRight: 'var(--mcs-thickness--md) solid var(--mcs-color--neutral--20)'}">
      <mcs-container [screen]="screen"
                     [fullHeight]="fullHeight">
        <div [style]="{ height: '100%',
                      background: 'var(--mcs-color--brand--50)',
                      color: 'var(--mcs-color--surface)',
                      padding: '20px',
                      display: 'flex',
                      gap: 'var(--mcs-gap--md)',
                      alignItems: 'center',
                      justifyContent: 'center' }">
          <strong>Container content:</strong>
          <span>screen = "{{ screen }}"</span>
          <span>fullHeight = "{{ fullHeight }}"</span>
        </div>
      </mcs-container>
    </div>
  `,
})
class StoryContainerWrapperComponent {
  @Input() screen?: Screens = SCREENS.FULL;
  @Input() fullHeight = false;
}

const meta: Meta<StoryContainerWrapperComponent> = {
  title: 'Layouts/Containers/Container',
  component: StoryContainerWrapperComponent,
  standalone: true,

  argTypes: {
    screen: {
      control: 'select',
      options: Object.values(SCREENS),
      description: 'Screen size variant for container',
      defaultValue: { summary: SCREENS.FULL },
    },
    fullHeight: {
      control: 'boolean',
      description: 'Makes container take full height',
      defaultValue: { summary: false },
    },
  },

  args: {
    screen: SCREENS.FULL,
    fullHeight: false,
  },
} as Meta<StoryContainerWrapperComponent>;

export default meta;

type Story = StoryObj<StoryContainerWrapperComponent>;

export const Default: Story = {
  args: {
    fullHeight: false,
  },
} as Story;

export const ResponsiveMd: Story = {
  name: 'Screen MD',
  args: {
    screen: SCREENS.MD,
  },
} as Story;

export const ResponsiveLg: Story = {
  name: 'Screen LG',
  args: {
    screen: SCREENS.LG,
  },
} as Story;

export const FullHeight: Story = {
  name: 'Screen fullHeight',
  args: {
    screen: SCREENS.XL,
    fullHeight: true,
  },
} as Story;
