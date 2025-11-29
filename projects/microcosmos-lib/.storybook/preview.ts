import type { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Hello',
          'Directives', [
            'Clicks Outside',
            'Ellipsis',
            'Throttle Clicks',
            'Tooltips',
          ],
          'Layouts',
          'Components', [
            'Badges',
            'Buttons',
            'Cards',
            'Chips', [ 'Chip' ],
            'Dividers',
            'Icons', [ 'Icon', 'Icon list' ],
            'Images',
            'Paragraphs',
            'Tags', [ 'Tag', 'Tag with icons' ],
            'Titles',
          ],
        ],
      },
    },
  },
  tags: [ 'autodocs' ],
} as Preview;

export default preview;
