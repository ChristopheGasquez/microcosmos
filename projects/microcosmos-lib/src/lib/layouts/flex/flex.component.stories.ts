import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { GAPS } from '../../constants';
import type { FlexAlign, FlexDirection, FlexJustify, FlexWrap } from '../../constants/flex';
import { FLEX_ALIGN, FLEX_DIRECTION, FLEX_JUSTIFY, FLEX_WRAP } from '../../constants/flex';
import type { Gaps } from '../../constants/gaps';
import { FlexComponent } from './flex.component';

@Component({
  selector: 'story-flex-wrapper',
  standalone: true,
  imports: [ CommonModule, FlexComponent ],
  template: `
    <mcs-flex [align]="align"
              [direction]="direction"
              [justify]="justify"
              [wrap]="wrap"
              [gap]="gap"
              [fullHeight]="fullHeight">
        <div *ngFor="let box of boxes"
             [style.backgroundColor]="box"
             [style.height]="direction === 'horizontal' ? '80px' :'35px'"
             style="width: 80px; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">
        {{ box }}
      </div>
    </mcs-flex>
  `,
})
class StoryFlexWrapperComponent {
  @Input() align: FlexAlign = FLEX_ALIGN.START;
  @Input() direction: FlexDirection = FLEX_DIRECTION.HORIZONTAL;
  @Input() justify: FlexJustify = FLEX_JUSTIFY.START;
  @Input() wrap: FlexWrap = FLEX_WRAP.WRAP;
  @Input() gap: Gaps = GAPS.XL;
  @Input() fullHeight = false;

  boxes = [ '#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#03a9f4', '#4caf50', '#ff9800' ];
}

const meta: Meta<StoryFlexWrapperComponent> = {
  title: 'Layouts/Flex Box/Flex',
  component: StoryFlexWrapperComponent,
  standalone: true,
  argTypes: {
    align: {
      control: 'select',
      options: Object.values(FLEX_ALIGN),
      defaultValue: { summary: FLEX_ALIGN.START },
    },
    direction: {
      control: 'select',
      options: Object.values(FLEX_DIRECTION),
      defaultValue: { summary: FLEX_DIRECTION.HORIZONTAL },
    },
    justify: {
      control: 'select',
      options: Object.values(FLEX_JUSTIFY),
      defaultValue: { summary: FLEX_JUSTIFY.START },
    },
    wrap: {
      control: 'select',
      options: Object.values(FLEX_WRAP),
      defaultValue: { summary: FLEX_WRAP.WRAP },
    },
    gap: {
      control: 'select',
      options: Object.values(GAPS),
      defaultValue: { summary: GAPS.XL },
    },
    fullHeight: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
  },
} as Meta<StoryFlexWrapperComponent>;

export default meta;

type Story = StoryObj<StoryFlexWrapperComponent>;

export const Default: Story = {
  args: {
    direction: FLEX_DIRECTION.HORIZONTAL,
    justify: FLEX_JUSTIFY.START,
    gap: GAPS.XL,
    wrap: FLEX_WRAP.WRAP,
    align: FLEX_ALIGN.START,
    fullHeight: false,
  },
} as Story;

export const Centered: Story = {
  args: {
    align: FLEX_ALIGN.CENTER,
    justify: FLEX_JUSTIFY.CENTER,
    direction: FLEX_DIRECTION.HORIZONTAL,
    wrap: FLEX_WRAP.WRAP,
    gap: GAPS.MD,
  },
} as Story;

export const Vertical: Story = {
  args: {
    direction: FLEX_DIRECTION.VERTICAL,
    align: FLEX_ALIGN.START,
    justify: FLEX_JUSTIFY.START,
    gap: GAPS.MD,
  },
} as Story;

export const FullHeight: Story = {
  args: {
    fullHeight: true,
    gap: GAPS.LG,
    direction: FLEX_DIRECTION.HORIZONTAL,
    align: FLEX_ALIGN.START,
    justify: FLEX_JUSTIFY.BETWEEN,
  },
} as Story;
