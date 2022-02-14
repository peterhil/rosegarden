module.exports = {
    extends: 'standard',
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 2019,
        requireConfigFile: false,
        sourceType: 'module',
        ecmaFeatures: {
            impliedstrict: true,
        }
    },
    env: {
        es6: true,
        browser: true,
    },
    globals: {
        chrome: 'readonly',
    },
    rules: {
        'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
        'comma-dangle': ['off', 'always'],
        indent: ['error', 4],
        'no-console': ['warn', {}],
        'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    },
}
