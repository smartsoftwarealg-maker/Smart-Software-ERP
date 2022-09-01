/* eslint-disable */
export default {
    name: 'stock-ui-inventory-exit-lines',
    preset: '../../../jest.config.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
            astTransformers: [
                'jest-preset-angular/build/InlineFilesTransformer',
                'jest-preset-angular/build/StripStylesTransformer',
            ],
        },
    },
    coverageDirectory: '../../../coverage/libs/stock/ui-inventory-exit-lines',
    snapshotSerializers: [
        'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
        'jest-preset-angular/build/AngularSnapshotSerializer.js',
        'jest-preset-angular/build/HTMLCommentSerializer.js',
    ],
};
