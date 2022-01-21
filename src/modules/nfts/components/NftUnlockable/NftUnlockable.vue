<template>
    <a-details :open="userOwnsToken" :disabled="!userOwnsToken">
        <template #label>
            <div class="nftdetail_details_wrap">
                <h2>{{ $t('nftunlockable.title') }}</h2>
            </div>
        </template>
        <template>
            <a-button v-if="!revealed" :label="$t('nftunlockable.reveal')" @click.native="onRevealClick" />
            <div v-else class="unlockable">
                {{ content }}
            </div>
        </template>
    </a-details>
</template>

<script>
import ADetails from '@/common/components/ADetails/ADetails';
import AButton from '@/common/components/AButton/AButton';
import { getUnlockable } from '@/modules/nfts/queries/unlockables';
import { checkSignIn } from '@/modules/account/auth';
import { notifications } from 'fantom-vue-components/src/plugins/notifications';

export default {
    name: 'NftUnlockable',

    components: {
        AButton,
        ADetails,
    },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
        userOwnsToken: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            revealed: false,
            content: '',
        };
    },

    methods: {
        async onRevealClick() {
            let signed = await checkSignIn();
            if (!signed) {
                console.error('not signed');
                notifications.add({
                    type: 'error',
                    text: this.$t('nftcreate.signInFirst'),
                });
                return;
            }

            this.content = await getUnlockable(this.token.contract, this.token.tokenId);
            this.revealed = true;
        },
    },
};
</script>
