import StatusFilter from '@/modules/nfts/components/StatusFilter/StatusFilter.vue';
import FButton from 'fantom-vue-components/src/components/FButton/FButton.vue';

export default {
    title: 'Components/StatusFilter',
    components: StatusFilter,
};

export const Default = () => ({
    components: { StatusFilter },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <status-filter />
        </div>
    `,
});

export const Selected = () => ({
    components: { StatusFilter },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <status-filter :selected="['has_bids']" />
        </div>
    `,
});

export const ChangeEvent = () => ({
    components: { StatusFilter },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <status-filter @change="selected = $event" :selected="selected" />
            <br />
            selected: {{ selected }}
        </div>
    `,
    data() {
        return {
            selected: ['has_bids'],
        };
    },
});

export const Model = () => ({
    components: { StatusFilter, FButton },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <status-filter v-model="selected" />
            <br />
            selected: {{ selected }} <br />
            <f-button secondary size="small" @click.native="selected = ['buy_now']">Set value</f-button>
        </div>
    `,
    data() {
        return {
            selected: ['has_bids', 'has_offers'],
        };
    },
});
