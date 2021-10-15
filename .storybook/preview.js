import '../src/assets/scss/storybook.scss';
import Vue from 'vue';
import { addDecorator, addParameters } from '@storybook/vue';
import { withDirection } from 'storybook-rtl-addon';
import { i18n } from '@/plugins/vue-i18n.js';
import StoryRouter from 'storybook-vue-router';
import FTooltip from 'fantom-vue-components/src/components/FTooltip/FTooltip.vue';
import FNotifications from 'fantom-vue-components/src/components/FNotifications/FNotifications.vue';
import '@/plugins/notifications.js';

// global components
import '../src/global-components.js';

const decor = (story, context) => {
    const wrapped = story(context);

    return Vue.extend({
        i18n,
        components: { wrapped, FTooltip, FNotifications },
        template: `
            <div>
                <wrapped />
                <f-tooltip with-arrow />
            </div>
        `,
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
        list: [
            { name: 'dark', class: 'theme-dark', color: '#202225' },
            { name: 'PG', class: 'theme-pg', color: '#090c10' },
        ],
        target: 'root',
    },
});

addDecorator(withDirection);
addDecorator(StoryRouter());
addDecorator(decor);
