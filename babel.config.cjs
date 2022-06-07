module.exports = api => {
  api.cache(false)
  const targetBrowser = { browsers: '> 1.5%, IE 11, not dead' }

  return {
    presets: [
      [
        '@babel/preset-env',
        { targets: targetBrowser }
      ]
    ],

    plugins: ['@babel/plugin-transform-runtime']
  }
}
