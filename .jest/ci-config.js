const { isConstructSignatureDeclaration } = require('typescript');
const config = require('./config');

const seconds = 1000

config.coverageThreshold = {
    global: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
    },
}

config.testTimeout = 30 * seconds

module.exports = config;
