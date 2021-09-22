import AccountAvatar from '@/modules/account/components/AccountAvatar/AccountAvatar.vue';

export default {
    title: 'Components/AccountAvatar',
    components: AccountAvatar,
};

export const Default = () => ({
    components: { AccountAvatar },
    //language=HTML
    template: `
        <div>
            <account-avatar src="/avatar2.jpg" />
        </div>
    `,
    data() {
        return {};
    },
});

export const Loading = () => ({
    components: { AccountAvatar },
    //language=HTML
    template: `
        <div>
            <account-avatar loading />
        </div>
    `,
    data() {
        return {};
    },
});
