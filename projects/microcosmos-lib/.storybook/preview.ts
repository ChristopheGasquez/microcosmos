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
          'Layouts',
          'Components',
          [
            'Hello',
            'Badges',
            'Chips', [ 'Chip' ],
            'Dividers',
            'Icons', [ 'Icon', 'Icon list' ],
            'Tags', [ 'Tag', 'Tag with icons' ],
          ],
        ],
      },
    },
  },
  tags: [ 'autodocs' ],
} as Preview;

export default preview;
