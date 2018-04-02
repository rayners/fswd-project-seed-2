<template>
    <div id="app">
        <NavBar></NavBar>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
    components: {
        NavBar
    },
    mounted() {
        this.$store.dispatch('start');
    }
};
</script>