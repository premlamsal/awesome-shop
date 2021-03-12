import Axios from "axios";

// axios allow cross origin
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const state = {
  token: localStorage.getItem("token") || "",
  user: {},
  isAuthenticated:false,
};
const getters = {
  getToken(state) {
    return state.token;
  },
  getUser(state) {
    return state.user;
  },
  getIsAuthenticated(state){
    return state.isAuthenticated;
  }
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
  setIsAuthenticated(state,payload){
    state.isAuthenticated=payload
  }
};

const actions = {
  login(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.defaults.headers.common['Accept']='application/json';
      Axios.post(`https://eshop.test/api/frontend/login`, payload)
        .then((response) => {
          const token = response.data.access_token;
          const user = response.data.user;
          context.commit("setToken", token);
          context.commit("setUser", user);
          context.commit("setIsAuthenticated",true);
          localStorage.setItem("token", token);
          // Add the following line:
          // Axios.defaults.headers.common["Authorization"] = token;
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
      Axios.defaults.headers.common['Accept']='application/json';
      Axios.post(`https://eshop.test/api/frontend/register`, payload)
        .then((response) => {
          const token = response.data.access_token;
          const user = response.data.user;
          context.commit("setToken", token);
          context.commit("setUser", user);
          context.commit("setIsAuthenticated",true);
          localStorage.setItem("token", token);
          // Add the following line:
          // Axios.defaults.headers.common["Authorization"] = token;
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    }); //end of promise
  },
  checkAuthToken(context){
    return new Promise((resolve,reject)=>{
    const token = context.getters.getToken; //accessing getter from action
     Axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
      Axios.defaults.headers.common['Accept']='application/json';
      Axios.get('https://eshop.test/api/frontend/getUser')
      .then((response)=>{
        // console.log(response.data.data[0]);
        const user = response.data.data[0]
        context.commit("setUser", user);
        context.commit("setIsAuthenticated",true);
        resolve(response);
      })
      .catch((error)=>{
        context.logout;//clear old token from localstorage and axios config
        // console.log(error);
        context.commit("setIsAuthenticated",false);
        reject(error);
      });
    })
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
