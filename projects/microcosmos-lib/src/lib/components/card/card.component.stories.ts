import { Component, Input } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

import {
  COLORS,
  type Colors,
  FLEX_ALIGN,
  FLEX_JUSTIFY,
  type Margins,
  MARGINS,
  PADDINGS,
  type Paddings,
  SIZES,
  VARIANTS,
  type Variants,
} from '../../constants';

import { FlexComponent } from '../../layouts';
import { IconComponent } from '../icon/icon.component';
import { CardComponent } from './card.component';

@Component({
  selector: 'story-card-wrapper',
  standalone: true,
  imports: [ CardComponent, FlexComponent, IconComponent ],
  template: `
    <div [style]="{ height: '200px'}">
      <mcs-card
        [color]="color"
        [elevated]="elevated"
        [fullHeight]="fullHeight"
        [fullWidth]="fullWidth"
        [margin]="margin"
        [padding]="padding"
        [rounded]="rounded"
        [selectable]="selectable"
        [variant]="variant">

        <mcs-flex
          [justify]="FLEX_JUSTIFY.CENTER"
          [align]="FLEX_ALIGN.CENTER"
          [fullHeight]="true">
          <mcs-icon
            [name]="'kayaking'"
            [size]="SIZES.XL"
            [color]="COLORS.INK">
          </mcs-icon>
        </mcs-flex>

      </mcs-card>
    </div>
  `,
})
class StoryCardWrapperComponent {
  @Input() color: Colors = COLORS.NEUTRAL;
  @Input() variant: Variants = VARIANTS.OUTLINED;
  @Input() rounded: boolean = true;
  @Input() elevated: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() fullHeight: boolean = false;
  @Input() selectable: boolean = false;
  @Input() margin: Margins = MARGINS.ZERO;
  @Input() padding: Paddings = PADDINGS.XL;

  protected readonly FLEX_JUSTIFY = FLEX_JUSTIFY;
  protected readonly FLEX_ALIGN = FLEX_ALIGN;
  protected readonly SIZES = SIZES;
  protected readonly COLORS = COLORS;
}

const meta: Meta<StoryCardWrapperComponent> = {
  title: 'Components/Cards/Card',
  component: StoryCardWrapperComponent,
  standalone: true,
  argTypes: {
    color: { control: 'select', options: Object.values(COLORS) },
    variant: { control: 'select', options: Object.values(VARIANTS) },
    rounded: { control: 'boolean' },
    elevated: { control: 'boolean' },
    selectable: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    fullHeight: { control: 'boolean' },
    margin: { control: 'select', options: Object.values(MARGINS) },
    padding: { control: 'select', options: Object.values(PADDINGS) },
  },
  args: {
    padding: PADDINGS.XL,
    margin: MARGINS.ZERO,
    color: COLORS.NEUTRAL,
    variant: VARIANTS.OUTLINED,
    rounded: true,
    elevated: false,
    selectable: false,
    fullWidth: false,
    fullHeight: false,
  },
} as Meta<StoryCardWrapperComponent>;

export default meta;

type Story = StoryObj<StoryCardWrapperComponent>;

export const Default: Story = {
  render: (args) => ({ props: args }),
} as Story;

export const Elevated: Story = {
  render: (args) => ({ props: args }),
  args: {
    elevated: true,
  },
} as Story;

export const Outlined: Story = {
  render: (args) => ({ props: args }),
  args: {
    variant: VARIANTS.OUTLINED,
  },
} as Story;

export const TonedRounded: Story = {
  render: (args) => ({ props: args }),
  args: {
    variant: VARIANTS.TONED,
    rounded: true,
  },
} as Story;

export const Selectable: Story = {
  render: (args) => ({ props: args }),
  args: {
    selectable: true,
  },
} as Story;

export const FullWidth: Story = {
  render: (args) => ({ props: args }),
  args: {
    fullWidth: true,
  },
} as Story;

export const FullHeight: Story = {
  render: (args) => ({ props: args }),
  args: {
    fullHeight: true,
  },
} as Story;

export const WithMarginAndPadding: Story = {
  render: (args) => ({ props: args }),
  args: {
    margin: MARGINS.LG,
    padding: PADDINGS.XXL,
  },
} as Story;

export const HighlightWarning: Story = {
  render: (args) => ({ props: args }),
  args: {
    color: COLORS.WARNING,
    variant: VARIANTS.FILLED,
    elevated: true,
  },
} as Story;
