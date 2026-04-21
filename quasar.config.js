/* eslint-env node */
module.exports = function (/* ctx */) {
  return {
    boot: [],

    css: ['app.scss'],

    extras: ['material-icons'],

    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node20'
      },
      vueRouterMode: 'hash'
    },

    devServer: {
      open: false,
      port: 3000
    },

    framework: {
      config: {},
      plugins: []
    },

    animations: []
  }
}
