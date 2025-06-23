module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.svg$': '<rootDir>/test/mocks/svgMock.js'
  },
  transformIgnorePatterns: [],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/mocks/fileMock.js'
  },
  testMatch: [
    '**/src/**/**.test.js'
  ],
  setupFiles: [
    '<rootDir>/test/setup.js'
  ]
}
