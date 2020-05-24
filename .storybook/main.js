const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  webpackFinal: async config => {
    let rules = config.module.rules
    rules.map(rule => {
      if (rule.test && rule.test.source.includes('tsx?$')) {
        rule.use.map(loader => {
          if (loader.loader.includes('react-docgen-typescript-loader')) {
            if (loader.options) {
              loader.options.shouldExtractLiteralValuesFromEnum = true
              loader.options.propFilter = (prop) => {
                if (prop.parent) {
                  return !prop.parent.fileName.includes('node_modules')
                }
                return true
              }
            } else {
              loader.options = {
                shouldExtractLiteralValuesFromEnum: true,
                propFilter: (prop) => {
                  if (prop.parent) {
                    return !prop.parent.fileName.includes('node_modules')
                  }
                  return true
                }
              }
            }
          }
        })
        console.log(rule.test, rule.use)
      }
    })
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  }
};
