module.exports = {
    testEnvironment: 'node',
    verbose: true,
    testTimeout: 30000,
    setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov']
};