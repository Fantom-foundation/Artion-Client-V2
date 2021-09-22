module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    // testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/src/**/*.spec.{j,t}s?(x)'],
    transformIgnorePatterns: ['/node_modules\\/(?!fantom-vue-components).*/', '\\.pnp\\.[^\\/]+$'],
};
