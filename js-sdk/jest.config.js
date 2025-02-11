const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

const common = {
  automock: false,
  coveragePathIgnorePatterns: ['tests', 'dist'],
  // transform: { '^.+\\.(t|j)sx?$': ['@swc/jest'] },
  testPathIgnorePatterns: ['cypress', 'dist'],
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

module.exports = {
  projects: [
    // {
    //   ...common,
    //   displayName: 'jsdom',
    //   testEnvironment: 'jsdom',
    // },
    {
      ...common,
      displayName: 'node',
      testEnvironment: 'node',
    },
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      lines: 80,
      functions: 80,
    },
  },
};