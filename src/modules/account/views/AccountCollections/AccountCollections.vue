<template>
    <div class="AccountCollections">
        collections grid
    </div>
</template>

<script>
export default {
    name: 'AccountCollections',

    props: {
        userAddress: {
            type: String,
            default: '',
            required: true,
        },
    },
};
</script>
