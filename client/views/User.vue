<template>
<div>
    <h1>{{ user.username }}</h1>
    <p>Signed up on {{ user.createdAt }} ({{ user.createdAt | luxon }}, which is {{user.createdAt | luxon:diffForHumans }})</p>
</div>
</template>

<script>
export default {
    props: ['username'],
    computed: {
        user() {
            return this.$store.getters.getUserByUsername(this.username);
        }
    },
    mounted() {
        this.$store.dispatch('getUsers');
    }
}
</script>