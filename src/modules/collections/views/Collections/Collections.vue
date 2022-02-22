<template>
    <div class="collections">
        <div class="collections_cont">
            <collection-main-list />
        </div>
    </div>
</template>

<script>
import CollectionMainList from '@/modules/collections/components/CollectionMainList/CollectionMainList.vue';
export default {
    name: 'Collections',
    components: {
        CollectionMainList,
    },
};
</script>

<style lang="scss">
.collections {
    &_cont {
        padding: 0 var(--f-spacer-4);
    }
}
</style>
