<template>
    <div class="collection">
        <!-- TMP -->
        <!-- <ul>
            <li><router-link :to="{ name: 'collection-create' }">Create</router-link></li>
            <li><router-link :to="{ name: 'collection-register' }">Register</router-link></li>
        </ul> -->

        <router-view />
    </div>
</template>

<script>
export default {
    name: 'Collection',
};
</script>
