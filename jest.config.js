module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // setupFiles: ['./setup-jest.ts'],
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json'
    }
  },
  moduleNameMapper: {
    '^test-utils$': '<rootDir>/src/test/test-utils',
    '^test-utils/(.*)$': '<rootDir>/src/test/$1'
  }
};
