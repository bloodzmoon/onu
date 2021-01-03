const path = require('path')

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      Components: path.resolve(__dirname, './src/components/index'),
      Hooks: path.resolve(__dirname, './src/hooks/index'),
      Utils: path.resolve(__dirname, './src/utils'),
    },
  }

  return config
}
