// eslint-disable-next-line import/no-anonymous-default-export
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^@booking/shared(.*)$': '<rootDir>/../../packages/shared/src$1',
    '^@booking/ui(.*)$': '<rootDir>/../../packages/ui/src$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
