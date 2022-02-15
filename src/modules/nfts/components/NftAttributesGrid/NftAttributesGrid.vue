<template>
    <div class="nftattributesgrid">
        <f-data-grid
            ref="grid"
            infinite-scroll
            strategy="remote"
            no-header
            max-height="400px"
            sticky-head
            class="agrid nfttmpgrid"
            infinite-scroll-root=".nfttmpgrid .fdatagrid_table"
            :items="items"
            :columns="columns"
        ></f-data-grid>
    </div>
</template>

<script>
import FDataGrid from 'fantom-vue-components/src/components/FDataGrid/FDataGrid.vue';
import { getTokenJsonMetadataUrl } from '@/utils/url.js';

export default {
    name: 'NftAttributesGrid',

    components: {
        FDataGrid,
    },

    data() {
        return {
            columns: [
                {
                    name: 'trait_type',
                    label: this.$t('nftattributesgrid.type'),
                },
                {
                    name: 'value',
                    label: this.$t('nftattributesgrid.value'),
                },
                {
                    name: 'frequency',
                    label: this.$t('nftattributesgrid.frequency'),
                },
            ],
            items: [],
        };
    },

    async created() {
        const routerParams = this.$route.params;
        const url = getTokenJsonMetadataUrl(routerParams.tokenContract, routerParams.tokenId);
        if (url !== '') {
            const response = await fetch(url);
            if (response.status === 200) {
                const data = await response.json();
                if (data.attributes && data.attributes.length) this.items = data.attributes;
            } else {
                console.error(response.status, response.statusText);
            }
        }
    },
};
</script>
