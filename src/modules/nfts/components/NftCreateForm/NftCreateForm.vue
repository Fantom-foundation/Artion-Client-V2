<template>
    <f-form v-model="values" class="nftcreate_form" @submit="onSubmit">
        <div class="nftcreate_col">
            <div>
                <a-upload-area @input="setTokenImage" class="auploadarea-nobackground">
                    Drop files here or browse <br />
                    JPG, PNG, BMP, GIF Max 15mb.
                </a-upload-area>
            </div>
        </div>
        <div class="nftcreate_col">
            <div class="nftcreate_wrap">
                <div class="nftcreate_panel">
                    <f-form-input
                        type="a-dropdown-listbox"
                        name="collectionId"
                        :label="$t('nftcreate.collection')"
                        class="collection_list"
                        :data="collections"
                        :validator="collectionValidator"
                        :error-message="$t('nftcreate.collectionErr')"
                        required
                    >
                        <template #button-label="{ item }">
                            <div class="flex ali-center gap-2">
                                <f-image v-if="item.img" size="24px" :src="item.img" :alt="item.label" />
                                <span>{{ item.label }}</span>
                            </div>
                        </template>
                        <template #item="{ item }">
                            <div class="flex ali-center gap-2">
                                <f-image v-if="item.img" size="24px" :src="item.img" :alt="item.label" />
                                <span>{{ item.label }}</span>
                            </div>
                        </template>
                    </f-form-input>

                    <f-form-input :label="$t('nftcreate.name')" field-size="large" type="text" name="name" required />
                    <f-form-input
                        :label="$t('nftcreate.symbol')"
                        field-size="large"
                        type="text"
                        name="symbol"
                        class="fforminput_symbol"
                    />
                    <f-form-input
                        :label="$t('nftcreate.description')"
                        field-size="large"
                        type="textarea"
                        name="description"
                        rows="5"
                    />
                </div>
                <div class="nftcreate_panel">
                    <f-form-input
                        :validator="royaltyValidator"
                        validate-on-change
                        validate-on-input
                        :error-message="$t('nftcreate.royaltyErr')"
                        type="number"
                        name="royalty"
                        field-size="large"
                    >
                        <template #label>
                            {{ $t('nftcreate.royalty') }}
                            <button class="label_btn" :data-tooltip="$t('nftcreate.royaltyTooltip')">
                                <app-iconset icon="question" />
                            </button>
                        </template>
                    </f-form-input>
                    <f-form-input field-size="large" type="text" name="linkToIp">
                        <template #label>
                            {{ $t('nftcreate.linkToIp') }}
                            <button class="label_btn" :data-tooltip="$t('nftcreate.linkToIpTooltip')">
                                <app-iconset icon="question" />
                            </button>
                        </template>
                    </f-form-input>
                    <f-form-input type="toggle" :label="$t('nftcreate.unlockContent')" name="unlockContentToogle" />
                    <f-form-input
                        :label="$t('nftcreate.unlockContent')"
                        v-if="values.unlockContentToogle"
                        field-size="large"
                        type="textarea"
                        name="unlockContent"
                    />
                </div>
            </div>
            <div v-if="fileError" class="pat-5 flex juc-center">
                <f-message type="error" with-icon>{{ fileError }}</f-message>
            </div>
            <div class="nftcreate_btn">
                <a-button type="submit" size="large" :loading="isLoading">
                    {{ $t('nftcreate.mint') }}
                </a-button>
            </div>
            <div class="nftcreate_info">
                <f-message type="info" with-icon>{{ $t('nftcreate.messageFtm') }}</f-message>
            </div>
            <a-sign-transaction :tx="txMint" @transaction-status="onMintTransactionStatus" />
            <a-sign-transaction :tx="txRoyalty" @transaction-status="onRoyaltyTransactionStatus" />
        </div>
    </f-form>
</template>
<script>
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import FMessage from 'fantom-vue-components/src/components/FMessage/FMessage.vue';
import AppIconset from '@/modules/app/components/AppIconset/AppIconset';
import AUploadArea from '@/common/components/AUploadArea/AUploadArea.vue';
import { getCollections } from '@/modules/nfts/queries/collections';
import { uploadTokenData } from '@/utils/upload';
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils';
import { notifications } from 'fantom-vue-components/src/plugins/notifications';
import AButton from '@/common/components/AButton/AButton';
import { checkSignIn } from '@/modules/account/auth';
import { setUnlockableContent } from '@/modules/nfts/mutations/unlockables';
import { toHex } from '@/utils/big-number';
import { eventBusMixin } from 'fantom-vue-components/src/mixins/event-bus';
import { estimateMintFeeGas } from '@/modules/nfts/queries/estimate-mint';
import { getCollectionImageUrl } from '@/utils/url.js';
import { tokenExists } from '@/modules/nfts/queries/token';
import { getContractAddress } from '@/utils/artion-contract-addresses.js';

export default {
    name: 'NftCreateForm',
    mixins: [eventBusMixin],
    components: { AUploadArea, AButton, FMessage, AppIconset, ASignTransaction },
    data() {
        return {
            values: {
                collectionId: '0x61af4d29f672e27a097291f72fc571304bc93521', // Default Artion Collection
            },
            collections: [],
            collection: {},
            imageFile: null,
            fileError: '',
            txMint: {},
            txRoyalty: {},
            tokenId: null,
            isLoading: false,
        };
    },

    async created() {
        let mintableBy = this.$wallet.account || '0x0000000000000000000000000000000000000000';
        console.log('loading collections mintable by', mintableBy);
        const collections = await getCollections({ first: 5000 }, null, mintableBy);
        this.collections = collections.edges.map(edge => {
            return {
                label: edge.node.name,
                value: edge.node.contract,
                img: getCollectionImageUrl(edge.node.contract),
            };
        });
    },

    methods: {
        royaltyValidator(_value) {
            if (_value === '') return false;
            _value = Number(_value);
            return !(_value >= 0 && _value <= 100);
        },

        async collectionValidator(_collectionId) {
            const estimation = await estimateMintFeeGas(
                this.$wallet.account || '0x0000000000000000000000000000000000000001',
                _collectionId,
                'https://minter.artion.io/default/access/minter/estimation.json'
            );
            console.log('collectionValidator', _collectionId, estimation.error);
            return estimation.error != null;
        },

        setTokenImage(_files) {
            this.imageFile = _files[0] || null;
        },

        async onSubmit(_data) {
            console.log('onSubmit', _data);
            if (!this.imageFile) {
                this.fileError = this.$t('nftcreate.fileError');
                return;
            } else {
                this.fileError = '';
            }

            this.isLoading = true;
            const val = _data.values;

            this.collection = this.collections.filter(col => col.value === val.collectionId)[0];

            const _metadata = {
                name: val.name,
                description: val.description,
                properties: {
                    symbol: val.symbol,
                    royalty: Number(val.royalty) ? val.royalty : null,
                    IP_Rights: val.linkToIp,
                    collection: this.collection.label,
                },
            };

            await this.checkWalletConnection();
            let signed = await checkSignIn();
            if (!signed) {
                console.error('not signed');
                notifications.add({
                    type: 'error',
                    text: this.$t('nftcreate.signInFirst'),
                });
                this.isLoading = false;
                return;
            }

            const estimation = await estimateMintFeeGas(
                this.$wallet.account,
                val.collectionId,
                'https://minter.artion.io/default/access/minter/estimation.json'
            );
            console.log('estimation', estimation);
            if (estimation.error != null) {
                notifications.add({
                    type: 'error',
                    text: this.$t('nftcreate.collectionErr') + ' ' + estimation.error,
                });
                this.isLoading = false;
                return;
            }

            let tokenUri;
            try {
                tokenUri = await uploadTokenData(_metadata, this.imageFile);
            } catch (err) {
                console.error('uploadTokenData fail', err);
                notifications.add({
                    type: 'error',
                    text: this.$t('nftcreate.wasntUploaded') + err,
                });
                this.isLoading = false;
                return;
            }

            notifications.add({
                type: 'info',
                text: this.$t('nftcreate.signMint'),
            });
            const web3 = new Web3();
            this.txMint = contracts.createNFT(
                this.$wallet.account,
                tokenUri,
                estimation.platformFee,
                val.collectionId,
                web3
            );
        },

        async onMintTransactionStatus(payload) {
            console.log('onMintTransactionStatus', payload);
            if (payload.status === 'error') {
                notifications.add({
                    type: 'error',
                    text: this.$t('nftcreate.mintingError'),
                });
                this.isLoading = false;
                return;
            }
            if (payload.status === 'success') {
                console.log('txHash', payload.data);
                try {
                    this.tokenId = await this.getMintedTokenId(payload.data);
                } catch (e) {
                    console.error('getMintedTokenId', e);
                    notifications.add({
                        type: 'error',
                        text: this.$t('nftcreate.noNewTokenId'),
                    });
                    this.isLoading = false;
                    return;
                }

                if (this.values.unlockContentToogle) {
                    try {
                        let res = await setUnlockableContent(
                            this.collection.value,
                            this.tokenId,
                            this.values.unlockContent
                        );
                        console.log('setUnlockableContent', res);
                    } catch (e) {
                        console.error('setUnlockableContent', e);
                        notifications.add({
                            type: 'error',
                            text: this.$t('nftcreate.unlockableNotAttached'),
                        });
                        this.isLoading = false;
                        return;
                    }
                }

                const royalty = Number(this.values.royalty);
                if (royalty) {
                    notifications.add({
                        type: 'info',
                        text: this.$t('nftcreate.signRoyalty'),
                    });
                    const royaltyDec = Math.round(royalty * 100);
                    const web3 = this.$wallet.wallet._web3;
                    const contract = await getContractAddress('marketplace');

                    console.log('registerTokenRoyalty', this.collection.value, this.tokenId, royaltyDec);
                    this.txRoyalty = contracts.registerTokenRoyalty(
                        this.collection.value,
                        this.tokenId,
                        royaltyDec,
                        web3,
                        contract
                    );
                } else {
                    await this.mintingSucceed();
                }
            }
        },

        async onRoyaltyTransactionStatus(payload) {
            console.log('onRoyaltyTransactionStatus', payload);
            if (payload.status === 'error') {
                notifications.add({
                    type: 'error',
                    text: this.$t('nftcreate.royaltyError'),
                });
                this.isLoading = false;
                return;
            }
            if (payload.status === 'success') {
                await this.mintingSucceed();
            }
        },

        async mintingSucceed() {
            notifications.add({
                type: 'success',
                text: this.$t('nftcreate.success'),
            });
            await this.redirectOrWait();
        },

        async redirectOrWait() {
            console.log('redirectOrWait');
            let exists = await tokenExists(this.collection.value, this.tokenId);
            if (exists) {
                await this.$router.push({
                    name: 'nft-detail',
                    params: { tokenContract: this.collection.value, tokenId: this.tokenId },
                });
            } else {
                notifications.add({
                    type: 'info',
                    text: this.$t('nftcreate.scanWaiting'),
                });
                setTimeout(() => this.redirectOrWait(), 1000);
            }
        },

        async getMintedTokenId(txHash) {
            const web3 = this.$wallet.wallet._web3;
            const receipt = await web3.eth.getTransactionReceipt(txHash);
            const tokenId = contracts.decodeMintedNftTokenId(receipt, web3);
            console.log('tokenId', tokenId, toHex(tokenId));
            return toHex(tokenId);
        },

        async checkWalletConnection() {
            if (!this.$wallet.connected) {
                const payload = {};
                this._eventBus.emit('show-wallet-picker', payload);
                await payload.promise;
            }
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
