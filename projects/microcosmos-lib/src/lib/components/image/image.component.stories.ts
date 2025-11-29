import { Component, Input } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import {
  IMG_FILTER,
  IMG_FIT,
  type ImgFilter,
  type ImgFit,
  PADDINGS,
  type Paddings,
  VARIANTS,
  type Variants,
} from '../../constants';
import { ImageComponent } from './image.component';

@Component({
  selector: 'story-image-wrapper',
  standalone: true,
  imports: [ ImageComponent ],
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 200px;
      overflow: hidden
    }
  `,
  template: `
    <mcs-img [src]="src"
             [alt]="'Sample image'"
             [width]="width"
             [height]="height"
             [priority]="priority"
             [fallback]="fallback"
             [lazy]="lazy"
             [ratio]="ratio"
             [fit]="fit"
             [filter]="filter"
             [fullWidth]="fullWidth"
             [fullHeight]="fullHeight"
             [rounded]="rounded"
             [circle]="circle"
             [selectable]="selectable"
             [elevated]="elevated"
             [padding]="padding"
             [variant]="variant">
    </mcs-img>
  `,
})
class StoryImageWrapperComponent {
  @Input() src: string = 'media/microview.jpg';
  @Input() width: number = 200;
  @Input() height: number = 130;
  @Input() priority: boolean = false;
  @Input() fallback?: string;
  @Input() lazy: boolean = true;
  @Input() ratio?: string;
  @Input() filter?: ImgFilter;
  @Input() fit: ImgFit = IMG_FIT.COVER;
  @Input() fullWidth: boolean = false;
  @Input() fullHeight: boolean = false;
  @Input() rounded: boolean = false;
  @Input() circle: boolean = false;
  @Input() selectable: boolean = false;
  @Input() elevated: boolean = false;
  @Input() padding: Paddings = PADDINGS.ZERO;
  @Input() variant: Variants = VARIANTS.TONED;
}

const meta: Meta<StoryImageWrapperComponent> = {
  title: 'Components/Images/Image',
  component: StoryImageWrapperComponent,
  standalone: true,
  argTypes: {
    src: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
    priority: { control: 'boolean' },
    fallback: { control: 'text' },
    lazy: { control: 'boolean' },
    ratio: { control: 'text' },
    fit: { control: 'select', options: Object.values(IMG_FIT) },
    filter: { control: 'select', options: Object.values(IMG_FILTER) },
    fullWidth: { control: 'boolean' },
    fullHeight: { control: 'boolean' },
    rounded: { control: 'boolean' },
    circle: { control: 'boolean' },
    selectable: { control: 'boolean' },
    elevated: { control: 'boolean' },
    padding: { control: 'select', options: Object.values(PADDINGS) },
    variant: { control: 'select', options: Object.values(VARIANTS) },
  },
  args: {
    src: 'assets/media/microview.jpg',
    fit: IMG_FIT.COVER,
    filter: undefined,
    padding: PADDINGS.ZERO,
    variant: VARIANTS.TONED,
    rounded: false,
    circle: false,
    selectable: false,
    elevated: false,
    fullWidth: false,
    fullHeight: false,
    width: 200,
    height: 130,
    lazy: true,
  },
} as Meta<StoryImageWrapperComponent>;

export default meta;

type Story = StoryObj<StoryImageWrapperComponent>;

export const Default: Story = { render: (args) => ({ props: args }) } as Story;

export const RoundedCircle: Story = {
  render: (args) => ({ props: { ...args, rounded: true, circle: true, height: 200, width: 200 } }),
} as Story;

export const FullWidth: Story = {
  render: (args) => ({ props: { ...args, fullWidth: true } }),
} as Story;

export const FullHeight: Story = {
  render: (args) => ({ props: { ...args, fullHeight: true } }),
} as Story;

export const WithFallback: Story = {
  render: (args) => ({
    props: { ...args, src: 'invalid-path.jpg', fallback: 'assets/media/microview.jpg', fullHeight: true, fullWidth: true, rounded: true },
  }),
} as Story;
