import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs"
  ],
  "framework": {
    "name": "@storybook/angular",
    "options": {}
  },
  "staticDirs": [
    '../src/assets',
    { from: "../src/assets", to: "/assets"}
  ],
} as StorybookConfig;
export default config;
