<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-2">
        <router-link class="navbar-brand" to='/'>FSWD</router-link>
        <ul class="navbar-nav mr-auto">
            <li class="nav-item" v-show='!isLoggedIn'>
                <router-link class="nav-link" to='/login'>Login</router-link>
            </li>
            <li class="nav-item" v-show='!isLoggedIn'>
                <router-link class="nav-link" to='/register'>Register</router-link>
            </li>
        </ul>
        <ul class='navbar-nav' v-show='isLoggedIn'>
            <li class='nav-item dropdown'>
                <a class='nav-link dropdown-toggle' href='#' id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{ username }}
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" @click="logout">Logout</a>
                </div>                
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    computed: mapState({
        username: state => state.user ? state.user.username : '',
        isLoggedIn: 'isLoggedIn'
    }),
    methods: mapActions(['logout'])
}
</script>