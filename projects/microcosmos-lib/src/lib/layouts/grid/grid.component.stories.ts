import { Component, Input } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { FLEX_JUSTIFY, type Gaps, GAPS } from '../../constants';
import { FlexComponent } from '../flex/flex.component';
import { GridItemComponent } from './grid-item.component';
import { GridComponent } from './grid.component';

@Component({
  selector: 'story-grid-wrapper',
  standalone: true,
  imports: [ GridComponent, GridItemComponent, FlexComponent ],
  template: `
    <mcs-grid [gap]="gap"
              [cols]="cols"
              style="width: 100%;">
      @for (span of itemSpans; let i = $index; track i) {
        <mcs-grid-item [span]="span"
                       class="mcs-p--lg"
                       [style.background-color]="'var(--mcs-color--brand--10)'">
          <mcs-flex [gap]="GAPS.MD"
                    [justify]="FLEX_JUSTIFY.AROUND">
            <span>Col n°{{ i + 1 }}</span>
            @if (span) {
              <span>Span : {{ span }}</span>
            }
          </mcs-flex>
        </mcs-grid-item>
      }
    </mcs-grid>
  `,
})
class StoryGridWrapperComponent {
  @Input() gap: Gaps = GAPS.MD;
  @Input() cols: number = 4;
  @Input() itemCount: number = 6;
  @Input() spanMode: 'none' | 'alternating' | 'random' = 'none';

  get itemSpans(): (number | undefined)[] {
    if (this.spanMode === 'none') {
      return Array.from({ length: this.itemCount }, () => undefined);
    }

    if (this.spanMode === 'alternating') {
      return Array.from({ length: this.itemCount }, (_, i) =>
        i % 2 === 0 ? 2 : undefined,
      );
    }

    if (this.spanMode === 'random') {
      return Array.from({ length: this.itemCount }, () =>
        Math.random() > 0.6 ? 2 : undefined,
      );
    }

    return [];
  }

  protected readonly GAPS = GAPS;
  protected readonly FLEX_JUSTIFY = FLEX_JUSTIFY;
}

const meta: Meta<StoryGridWrapperComponent> = {
  title: 'Layouts/Grid Box/Grid',
  component: StoryGridWrapperComponent,
  standalone: true,
  parameters: {
    docs: {
      description: {
        component: `
The \`mcs-grid\` component defines a flexible grid layout with configurable gaps and column count.
Children are wrapped inside \`mcs-grid-item\`, which may optionally define a \`span\` to expand across multiple columns.

This story dynamically generates grid items so the layout can be previewed interactively.`,
      },
    },
  },
  argTypes: {
    gap: {
      control: 'select',
      options: Object.values(GAPS),
    },
    cols: {
      control: 'number',
    },
    itemCount: {
      control: { type: 'number', min: 1, max: 30, step: 1 },
    },
    spanMode: {
      control: 'select',
      options: [ 'none', 'alternating', 'random' ],
    },
  },
  args: {
    gap: GAPS.MD,
    cols: 4,
    itemCount: 16,
    spanMode: 'none',
  },
} as Meta<StoryGridWrapperComponent>;

export default meta;

type Story = StoryObj<StoryGridWrapperComponent>;

export const Default: Story = {
  render: (args) => ({ props: args }),
} as Story;

export const AlternatingSpan: Story = {
  render: (args) => ({ props: args }),
  args: {
    spanMode: 'alternating',
  },
} as Story;

export const RandomSpan: Story = {
  render: (args) => ({ props: args }),
  args: {
    spanMode: 'random',
    itemCount: 12,
  },
} as Story;

export const DenseGrid: Story = {
  render: (args) => ({ props: args }),
  args: {
    cols: 6,
    itemCount: 20,
    gap: GAPS.S,
  },
} as Story;
