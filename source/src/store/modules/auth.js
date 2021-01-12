import Axios from "axios";

//axios allow cross origin
// Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// Axios.defaults.headers.common['Accept']='json';

const state = {
  token: localStorage.getItem("token") || "",
  user: {},
};
const getters = {
  getToken(state) {
    return state.token;
  },
  getUser(state) {
    return state.user;
  },
};
const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  destroyToken(state) {
    state.token = "";
  },
  setUser(state, payload) {
    state.user = payload.user;
  },
};

const actions = {
  login(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.post(`https://eshop.test/api/login`, payload)
        .then((response) => {
          const token = response.data.access_token;
          const user = response.data.user;
          context.commit("setToken", token);
          context.commit("setUser", user);
          localStorage.setItem("token", token);
          // Add the following line:
          Axios.defaults.headers.common["Authorization"] = token;
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    }); //end of promise
  }, //end of login
  register(context,payload){
    return new Promise((resolve, reject) => {
      Axios.post(`https://eshop.test/api/register`, payload)
        .then((response) => {
          const token = response.data.access_token;
          const user = response.data.user;
          context.commit("setToken", token);
          context.commit("setUser", user);
          localStorage.setItem("token", token);
          // Add the following line:
          Axios.defaults.headers.common["Authorization"] = token;
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    }); //end of promise
  },
  logout(context) {
    return new Promise((resolve) => {
      context.commit("destroyToken");
      localStorage.removeItem("token");
      delete Axios.defaults.headers.common["Authorization"];
      resolve();
    }); //end of promise
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
