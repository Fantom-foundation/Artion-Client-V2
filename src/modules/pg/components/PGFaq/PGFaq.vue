<template>
    <li class="pg-faq__list-item" :class="{ 'pg-faq__list-item--open': isOpen }">
        <div class="flex juc-space-between">
            <div class="pg-faq__text">
                <div class="pg-faq__question">
                    Duis aute irure dolor in reprehenderit indolore eu fugiat nulla pariatur ?
                </div>
                <div class="pg-faq__answer">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>
            <span class="pg-faq__button" @click="isOpen = !isOpen">
                <f-button round aria-label="round">
                    <icon-minus v-if="isOpen" />
                    <icon-plus v-else />
                </f-button>
            </span>
        </div>
    </li>
</template>

<script>
import IconPlus from '../../../../assets/vue-icons/IconPlus';
import IconMinus from '../../../../assets/vue-icons/IconMinus';
export default {
    name: 'PGFaq',

    data() {
        return {
            isOpen: false,
        };
    },

    components: {
        IconPlus,
        IconMinus,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
