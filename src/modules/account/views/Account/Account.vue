<template>
    <div class="account">
        <!-- TMP -->
        <ul>
            <li><router-link :to="{ name: 'account-single-items' }">Single Items</router-link></li>
            <li><router-link :to="{ name: 'account-bundles' }">Bundles</router-link></li>
            <li><router-link :to="{ name: 'account-favorited' }">Favorited</router-link></li>
            <li><router-link :to="{ name: 'account-activity' }">Activity</router-link></li>
            <li><router-link :to="{ name: 'account-offers' }">Offers</router-link></li>
            <li><router-link :to="{ name: 'account-my-offers' }">My Offers</router-link></li>
        </ul>

        <router-view />
    </div>
</template>

<script>
export default {
    name: 'Account',
};
</script>
