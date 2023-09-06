module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*\\.test\\.ts$',
    setupFilesAfterEnv: ['./setupTests.js']
};
