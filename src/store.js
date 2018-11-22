import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

const apiKey = "AIzaSyDzrKKOwSuv3_ubA1PZ6FYl6zmXIMX1MZg";
const emptyUserObject = {
  kind: "",
  idToken: "",
  email: "",
  refreshToken: "",
  expiresIn: "",
  localId: ""
};

Vue.use(Vuex);

export const TYPES = {
  actions: {
    signIn: "signIn",
    signUp: "signUp",
    auth: "auth",
    loadPosts: "loadPosts"
  },
  mutations: {
    setUser: "setUser",
    deleteUser: "deleteUser",
    setPosts: "setPosts"
  }
};

const state = {
  url: {
    signIn: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`,
    signUp: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`,
    firebase: "https://my-vue-project-9b5f5.firebaseio.com"
  },
  user: { ...emptyUserObject, idToken: localStorage.getItem("idToken") },
  posts: []
};

const actions = {
  [TYPES.actions.signIn]({ dispatch }, credentialsPayload) {
    return dispatch(TYPES.actions.auth, {
      ...credentialsPayload,
      isSignUp: false
    });
  },
  [TYPES.actions.signUp]({ dispatch }, credentialsPayload) {
    return dispatch(TYPES.actions.auth, {
      ...credentialsPayload,
      isSignUp: true
    });
  },
  [TYPES.actions.auth]({ commit, state }, { email, password, isSignUp }) {
    return Axios.post(isSignUp ? state.url.signUp : state.url.signIn, {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .then(r => r.data)
      .then(r => {
        console.log("loginapi:", r);
        commit(TYPES.mutations.setUser, r);
        return r;
      })
      .catch(err => {
        console.warn(err);
        commit(TYPES.mutations.deleteUser);
        return Promise.reject(err.response.data.error.message);
      });
  },
  [TYPES.actions.loadPosts]({ commit, state }) {
    return Axios.get(
      `${state.url.firebase}/blogposts.json?auth=${state.user.idToken}`
    )
      .then(r => r.data)
      .then(r => {
        commit(TYPES.mutations.setPosts, r);
        return r;
      });
  }
};

const mutations = {
  [TYPES.mutations.setUser](state, userPayload) {
    console.log("userMutation: ", userPayload);
    state.user = { ...userPayload };
    localStorage.setItem("idToken", state.user.idToken);
  },
  [TYPES.mutations.deleteUser](state) {
    state.user = { ...emptyUserObject };
    localStorage.removeItem("idToken");
  },
  [TYPES.mutations.setPosts](state, fbPost) {
    state.posts = Object.values(fbPost);
  }
};

const getters = {
  isLoggedIn: state => Boolean(state.user.idToken)
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
