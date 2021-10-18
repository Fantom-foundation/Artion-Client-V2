<template>
    <div class="pg-main">
        <p-g-header />

        <main>
            <router-view />
        </main>

        <p-g-footer></p-g-footer>

        <f-window ref="successModal" style="max-width: 345px">
            <p-g-success-notification></p-g-success-notification>
        </f-window>
    </div>
</template>

<script>
import PGHeader from '../../components/PGHeader/PGHeader';
import PGFooter from '../../components/PGFooter/PGFooter';
import PGSuccessNotification from '../../components/PGSuccessNotification/PGSuccessNotification';
import FWindow from 'fantom-vue-components/src/components/FWindow/FWindow';

export default {
    name: 'PGMain',

    components: { PGHeader, PGFooter, PGSuccessNotification, FWindow },
};
</script>

<style lang="scss">
@use "style";
</style>
