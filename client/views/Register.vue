<template>
    <form @submit.prevent="sendRegistration">
        <div class="form-group">
            <label for="username">Username</label>
            <input class="form-control" type="text" name="username" v-model="username">
            <small class="form-text text-info" v-show="checkingUsername">Checking username...</small>
            <small class="form-text text-danger" v-if="!usernameAvailable">Username is already taken.</small>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" type="password" name="password" v-model="password">
        </div>
        <div class="form-group">
            <label for="password_confirm">Password (confirm)</label>
            <input class="form-control" type="password" name="password_confirm" v-model="password_confirm">
        </div>
        <p v-if="passwordsNoMatch">Passwords do not match.</p>
        <button class="btn btn-primary" :disabled="!canRegister">Register</button>
    </form>
</template>

<script>
import Vue from 'vue';
import { debounce } from 'lodash';

export default {
    data: function () {
        return {
            username: '',
            password: '',
            password_confirm: '',
            usernameAvailable: true,
            checkingUsername: false,
        }
    },
    computed: {
        passwordsNoMatch: function() {
            return this.password !== this.password_confirm;
        },
        canRegister: function() {
            return this.password !== '' &&
                this.password === this.password_confirm &&
                this.username &&
                this.usernameAvailable &&
                !this.checkingUsername;
        }
    },
    watch: {
        username: debounce(function(newVal, oldVal) {
            this.checkingUsername = true;
            this.$http.post('/users/canRegister', { username: newVal })
                .then(response => this.usernameAvailable = !!response.data)
                .finally(() => this.checkingUsername = false);
        }, 2000)
    },
    methods: {
        sendRegistration: function() {
            this.$http.post('/users/register', {
                username: this.username,
                password: this.password,
                password_confirm: this.password_confirm
            }).then(response => {
                this.$store.commit('setUser', response.data);
                this.$router.push('/');
            })

        }
    }
};
</script>