<template>
    <div class="pg-faq" id="faq">
        <h2 class="h2 pg-faq__header">FAQs</h2>

        <ul class="pg-faq__list">
            <li class="pg-faq__list-item pg-faq__list-item--open">
                <div class="flex juc-space-between">
                    <div class="pg-faq__text">
                        <div class="pg-faq__question">
                            Duis aute irure dolor in reprehenderit indolore eu fugiat nulla pariatur ?
                        </div>
                        <div class="pg-faq__answer">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                    <span class="pg-faq__button">
                        <f-button round aria-label="round">
                            <icon-minus />
                        </f-button>
                    </span>
                </div>
                <div class="pg-faq__separator"></div>
            </li>

            <li class="pg-faq__list-item" v-for="item in [0, 1, 2, 3, 4, 5, 6]" :key="item">
                <div class="flex juc-space-between">
                    <div class="pg-faq__text">
                        <div class="pg-faq__question">
                            Duis aute irure dolor in reprehenderit indolore eu fugiat nulla pariatur ?
                        </div>
                        <div class="pg-faq__answer">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                    <span class="pg-faq__button">
                        <f-button round aria-label="round">
                            <icon-plus />
                        </f-button>
                    </span>
                </div>
                <div class="pg-faq__separator"></div>
            </li>
        </ul>
    </div>
</template>

<script>
import IconPlus from '../../../../assets/vue-icons/IconPlus';
import IconMinus from '../../../../assets/vue-icons/IconMinus';
export default {
    name: 'PGFaq',

    components: {
        IconPlus,
        IconMinus,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
