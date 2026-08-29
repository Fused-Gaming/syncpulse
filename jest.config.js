export default {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  roots: ['<rootDir>/packages'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: [
    'packages/*/src/**/*.ts',
    '!packages/*/src/**/__tests__/**',
    '!packages/*/src/**/*.test.ts',
  ],
  projects: [
    {
      displayName: 'core',
      testMatch: ['<rootDir>/packages/core/src/__tests__/**/*.test.ts'],
    },
    {
      displayName: 'hub',
      testMatch: ['<rootDir>/packages/hub/src/__tests__/**/*.test.ts'],
    },
    {
      displayName: 'workflows',
      testMatch: ['<rootDir>/packages/workflows/src/__tests__/**/*.test.ts'],
    },
  ],
};
