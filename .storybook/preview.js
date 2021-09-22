import '../src/assets/scss/storybook.scss';
import Vue from 'vue';
import { addDecorator, addParameters } from '@storybook/vue';
import { withDirection } from 'storybook-rtl-addon';
import { setupI18n } from '@/plugins/vue-i18n.js';
import StoryRouter from 'storybook-vue-router';

// global components
import '../src/global-components.js';

const i18n = setupI18n(Vue);

const decor = (story, context) => {
    // wrap the passed component within the passed context
    const wrapped = story(context);
    // extend Vue to use Vuetify around the wrapped component
    return Vue.extend({
        i18n,
        components: { wrapped },
        template: '<wrapped />',
    });
};

addParameters({
    a11y: {
        // optional selector which element to inspect
        element: '#root',
        // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
        config: {},
        // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
        options: {},
        // optional flag to prevent the automatic check
        manual: false,
    },
    themes: {
        default: '',
        list: [{ name: 'dark', class: 'theme-dark', color: '#202225' }],
        target: 'root',
    },
});

addDecorator(withDirection);
addDecorator(StoryRouter());
addDecorator(decor);
