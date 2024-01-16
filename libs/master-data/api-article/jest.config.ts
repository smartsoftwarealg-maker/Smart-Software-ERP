/* eslint-disable */
export default {
    name: 'stock-api-article',
    preset: '../../../jest.config.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {},
    coverageDirectory: '../../../coverage/libs/stock/api-article',
    snapshotSerializers: [
        'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
        'jest-preset-angular/build/AngularSnapshotSerializer.js',
        'jest-preset-angular/build/HTMLCommentSerializer.js',
    ],
};
