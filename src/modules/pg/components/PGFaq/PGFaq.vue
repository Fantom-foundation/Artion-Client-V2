<template>
    <li class="pg-faq__list-item" :class="{ 'pg-faq__list-item--open': isOpen }">
        <div class="flex juc-space-between">
            <div class="pg-faq__text">
                <div class="pg-faq__question" @click="isOpen = !isOpen">
                    {{ faq.question }}
                </div>
                <div
                    class="pg-faq__answer"
                    ref="answer"
                    :style="{ maxHeight: isOpen ? `${$refs.answer.scrollHeight}px` : 0 }"
                    v-html="faq.answer"
                ></div>
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

    props: {
        faq: {
            type: Object,
            required: true,
        },
    },

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
