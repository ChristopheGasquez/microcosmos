import type { Meta, StoryObj } from '@storybook/angular';
import { COLORS, MARGINS, TEXT_ALIGN, WEIGHT } from '../../constants';
import { FONT_SIZE, FONT_STYLE } from '../../constants/fonts';

import { ParagraphComponent } from './paragraph.component';

const DEFAULT_TEXT: string = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias animi aspernatur at autem consectetur error expedita harum impedit inventore ipsum, iure iusto officia, omnis pariatur quas sed vel voluptates.';

const meta: Meta<ParagraphComponent & { text: string }> = {
  title: 'Components/Paragraphs/Paragraph',
  component: ParagraphComponent,
  argTypes: {
    align: { control: 'select', options: Object.values(TEXT_ALIGN) },
    color: { control: 'select', options: Object.values(COLORS) },
    fontSize: { control: 'select', options: Object.values(FONT_SIZE) },
    fontStyle: { control: 'select', options: Object.values(FONT_STYLE) },
    marginBottom: { control: 'select', options: Object.values(MARGINS) },
    weight: { control: 'select', options: Object.values(WEIGHT) },
    text: {
      control: 'text',
      description: 'Content injected into <ng-content>',
      defaultValue: DEFAULT_TEXT,
    },
  },
  args: {
    align: TEXT_ALIGN.START,
    color: COLORS.INK,
    fontSize: FONT_SIZE.MD,
    fontStyle: FONT_STYLE.NORMAL,
    marginBottom: MARGINS.ZERO,
    weight: WEIGHT.REGULAR,
    text: DEFAULT_TEXT,
  },
} as Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mcs-p [align]="align"
             [color]="color"
             [fontSize]="fontSize"
             [fontStyle]="fontStyle"
             [weight]="weight"
             [marginBottom]="marginBottom">
        {{ text }}
      </mcs-p>
    `,
  }),
} as Story;


export const CenterExtraLight: Story = {
  render: (args) => ({
    props: {
      ...args,
      color: COLORS.BRAND,
      align: TEXT_ALIGN.CENTER,
      weight: WEIGHT.EXTRA_LIGHT,
    },
    template: `
      <mcs-p [align]="align"
             [color]="color"
             [fontSize]="fontSize"
             [fontStyle]="fontStyle"
             [weight]="weight"
             [marginBottom]="marginBottom">
        {{ text }}
      </mcs-p>
    `,
  }),
} as Story;

export const EndItalic: Story = {
  render: (args) => ({
    props: {
      ...args,
      color: COLORS.CONTRAST,
      align: TEXT_ALIGN.END,
      fontStyle: FONT_STYLE.ITALIC,
    },
    template: `
      <mcs-p [align]="align"
             [color]="color"
             [fontSize]="fontSize"
             [fontStyle]="fontStyle"
             [weight]="weight"
             [marginBottom]="marginBottom">
        {{ text }}
      </mcs-p>
    `,
  }),
} as Story;
