<template>
    <div class="nftdetailcollection">
        <a-placeholder :content-loaded="!!collection.contract" :replacement-num-chars="15">
            <router-link :to="{ name: 'explore', query: { collections: collection.contract } }">
                {{ collection.name }}
            </router-link>
        </a-placeholder>
    </div>
</template>

<script>
import { getCollection } from '@/modules/nfts/queries/collection.js';

export default {
    name: 'NftDetailCollection',

    props: {
        contract: {
            type: String,
            default: '',
            required: true,
        },
    },

    data() {
        return {
            /** @type {Collection} */
            collection: {},
        };
    },

    watch: {
        contract: {
            handler(value) {
                if (value) {
                    this.loadCollection(value);
                }
            },
            immediate: true,
        },
    },

    methods: {
        /**
         * @param {string} contract
         * @return {Promise<void>}
         */
        async loadCollection(contract) {
            this.collection = (await getCollection(contract)) || {};
        },
    },
};
</script>
