module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/web-components",
  core: {
    disableTelemetry: false
  },
  webpackFinal: async (config) => {
    // find web-components rule for extra transpilation
    const webComponentsRule = config.module.rules.find(
      (rule) => rule.use && rule.use.options && rule.use.options.babelrc === false
    );
    // add your own `my-library`
    webComponentsRule.test.push(new RegExp(`node_modules(\\/|\\\\)me3-claim-widget(.*)\\.js$`));

    return config;
  }
}
