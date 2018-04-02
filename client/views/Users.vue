<template>
<div>
    <ul>
        <li v-for="user in users" :key="user.id">
            <router-link :to="{ name: 'user', params: { username: user.username }}">{{ user.username }}</router-link>
        </li>
    </ul>
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: mapState(['users']),
    mounted() {
        this.$store.dispatch('getUsers');
    }
};
</script>