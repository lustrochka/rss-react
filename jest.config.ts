export default {
  preset: 'ts-jest',
  testEnvironment: './test.environment.cjs',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  moduleNameMapper: {
    '\\.(css|less}scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': 'jest-transform-stub',
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
