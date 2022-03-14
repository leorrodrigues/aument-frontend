module.exports = {
  testEnvironment: 'jsdom',
  rootDir: '../',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts(x)?',
    '!src/**/stories.tsx',
    '!src/styles/*',
    '!src/mockupData/*',
    '!src/dtos/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  transform: {
    '.+\\.ts(x)?': 'babel-jest',
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.tsx', '<rootDir>/.jest/scripts/localStorageSimulator.js'],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  testTimeout: 30000
};

process.env = Object.assign(process.env, {
  SITE_NAME: 'AUMENT'
});
