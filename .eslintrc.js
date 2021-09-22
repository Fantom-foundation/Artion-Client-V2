module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
    overrides: [
        /*{
            files: [
                '**!/__tests__/!*.{j,t}s?(x)',
                '**!/tests/unit/!**!/!*.spec.{j,t}s?(x)',
                '**!/tests/unit/!**!/!*.test.{j,t}s?(x)',
            ],
            env: {
                mocha: true,
            },
        },*/
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/src/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true,
            },
        },
    ],
};
