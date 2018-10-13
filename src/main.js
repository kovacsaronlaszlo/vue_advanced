// css
import 'bootstrap/scss/bootstrap.scss';
import './style.scss';

// js
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';

import DataService from './DataService';

// init
Vue.use(VueRouter);
new Vue({
    el: '#app',
    router,
    data() {
        return {
            user: {
                kind: "",
                idToken: "",
                email: "",
                refreshToken: "",
                expiresIn: "",
                localId: ""
            }
        }
    },
    methods: {
        signInAction(credentialsPayload) {
            return this.authAction({
                email: credentialsPayload.email,
                password: credentialsPayload.password,
                isSignUp: false
            })
        },
        signUpAction(credentialsPayload) {
            return this.authAction({
                email: credentialsPayload.email,
                password: credentialsPayload.password,
                isSignUp: true
            })
        },
        authAction(authPlayload) {
            return DataService.Auth(authPlayload)
                .then(r => this.setUserMutation(r));
        },
        setUserMutation(userPayload) {
            console.log('userMutation: ', userPayload);
            this.user = Object.assign({}, userPayload);
        }
    },
    render: h => h(App)
});
