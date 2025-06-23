module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 2 versions',
            'ie >= 11'
          ]
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    'react-require',
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-dev-expression',
    '@babel/plugin-transform-parameters',
    [
      'module-resolver',
      {
        root: [
          './src'
        ],
        alias: {
          underscore: 'lodash'
        }
      }
    ]
  ]
}
