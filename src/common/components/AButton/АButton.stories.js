import AButton from '@/common/components/AButton/AButton.vue';

export default {
    title: 'Components/AButton',
    components: AButton,
};

export const Default = () => ({
    components: { AButton },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <a-button>Save</a-button>
        </div>
    `,
});

export const Loading = () => ({
    components: { AButton },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <a-button :loading="loading" @click.native="loading = !loading">Very long text</a-button>
        </div>
    `,
    data() {
        return {
            loading: false,
        };
    },
});
