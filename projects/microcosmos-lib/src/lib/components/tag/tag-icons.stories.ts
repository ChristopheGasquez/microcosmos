import { Component, Input } from '@angular/core';
import type { Meta } from '@storybook/angular';
import { type Colors, COLORS, type Variants, VARIANTS } from '../../constants';
import { ICON_NAMES } from '../icon/icon-names';
import { registerAllIcons } from '../icon/icon-register';
import { IconRegistry } from '../icon/icon-registry.service';
import { IconComponent } from '../icon/icon.component';
import { TagComponent } from './tag.component';

@Component({
  selector: 'story-tag-icons-wrapper',
  standalone: true,
  imports: [ TagComponent, IconComponent ],
  template: `
    <mcs-tag [color]="color"
             [variant]="variant"
             [rounded]="rounded"
             [elevated]="elevated">
      @if (iconLeft) {
        <mcs-icon [name]="iconLeft"
                  [proportionalToTheFont]="true"></mcs-icon>
      }
      <span>{{ label }}</span>
      @if (iconRight) {
        <mcs-icon [name]="iconRight"
                  [proportionalToTheFont]="true"></mcs-icon>
      }
    </mcs-tag>
  `,
})
export class StoryTagWrapperComponent {
  @Input() public color: Colors = COLORS.NEUTRAL;
  @Input() public variant: Variants = VARIANTS.TONED;
  @Input() public rounded: boolean = true;
  @Input() public elevated: boolean = false;
  @Input() public label: string = '';
  @Input() public iconLeft: string = '';
  @Input() public iconRight: string = '';
}

export default {
  title: 'Components/Tags/Tag with icons',
  parameters: {
    docs: {
      description: {
        component: `A simple example of how you can add icon on tag, using mcs-icon component with proportionalToTheFont attribute at true.`,
      },
    },
  },
  component: StoryTagWrapperComponent,
  standalone: true,
  providers: [
    {
      provide: IconRegistry,
      useFactory: () => {
        const registry = new IconRegistry();
        registerAllIcons(registry);
        return registry;
      },
    },
  ],
  argTypes: {
    color: {
      control: 'select',
      options: Object.values(COLORS),
      defaultValue: { summary: COLORS.BRAND },
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
    iconLeft: {
      control: 'select',
      options: ICON_NAMES,
    },
    iconRight: {
      control: 'select',
      options: ICON_NAMES,
    },
  },
  args: {
    label: 'Tag example',
    variant: VARIANTS.OUTLINED,
    color: COLORS.NEUTRAL,
    rounded: true,
    elevated: false,
    iconLeft: 'snowboarding',
    iconRight: 'sports-bar',
  },
} as Meta;


export const TagIcons = (args: any) => ({
  props: args,
  template: `
    <story-tag-icons-wrapper [iconLeft]="iconLeft"
                             [iconRight]="iconRight"
                             [label]="label"
                             [color]="color"
                             [variant]="variant"
                             [rounded]="rounded"
                             [elevated]="elevated">
      {{ label }}
    </story-tag-icons-wrapper>
  `,
});
TagIcons.storyName = 'Tag with icons';
