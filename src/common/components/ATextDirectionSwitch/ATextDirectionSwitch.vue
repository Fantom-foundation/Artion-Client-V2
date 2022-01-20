<template>
    <f-toggle-button v-model="rtlDirectionOn" :label="$t('rtlDirection')" />
</template>

<script>
import { mapState } from 'vuex';
import { SET_RTL_DIRECTION } from '@/modules/app/store/mutations.js';

export default {
    name: 'ATextDirectionSwitch',

    data() {
        return {
            rtlDirectionOn: false,
        };
    },

    computed: {
        ...mapState('app', {
            rtlDirection: 'rtlDirection',
        }),
    },

    watch: {
        rtlDirectionOn(value) {
            this.$store.commit(`app/${SET_RTL_DIRECTION}`, value);
        },
    },

    created() {
        this.rtlDirectionOn = this.rtlDirection;
    },
};
</script>
