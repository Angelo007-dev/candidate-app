module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json'],
    testMatch: ['**/*.spec.ts'],
    collectCoverage: true,
    coverageDirectory: '../coverage/backend',
    collectCoverageFrom: ['src/**/*.ts', '!src/app.ts'],
};