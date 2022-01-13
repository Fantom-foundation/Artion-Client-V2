<template>
    <section class="accountsettingsprofile" :aria-labelledby="id">
        <div class="accountsettingsprofile_title">
            <h1 :id="id" data-focus>{{ $t('accountsettingsprofile.title') }}</h1>

            <div class="accountsettingsprofile_preview">
                <!--                Preview-->
            </div>
        </div>
        <AccountProfileForm />
    </section>
</template>
<script>
import AccountProfileForm from '@/modules/account/components/AccountProfileForm/AccountProfileForm.vue';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';
import { getUniqueId } from 'fantom-vue-components/src/utils';

export default {
    name: 'AccountSettingsProfile',

    components: { AccountProfileForm },

    data() {
        return {
            id: getUniqueId(),
        };
    },

    mounted() {
        focusElem(this.$el);
    },
};
</script>

<style lang="scss">
.accountsettingsprofile {
    &_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1 {
            margin-top: 0;
        }
    }

    &_preview {
    }
}
</style>
