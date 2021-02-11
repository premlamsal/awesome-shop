<template>
  <div class="nav-bar">
    <div class="container">
      <b-navbar toggleable="md" type="light" variant="">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand>
          <router-link to="/" class="navbar-item">
            <b-icon icon="handbag"></b-icon> Online Shop
          </router-link>
        </b-navbar-brand>

        <b-collapse id="nav-text-collapse" is-nav>
          <!-- <b-navbar-nav>
            <b-nav-text>Navbar text</b-nav-text>

            <b-nav-item href="#">
              <router-link to="/" class="navbar-item">Home</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link to="/about" class="navbar-item">About</router-link>
            </b-nav-item>
          </b-navbar-nav>-->
          <div class="search-bar">
            <input
              type="text"
              class="form-control search-input"
              placeholder="Search products.."
              v-model="search_key"
            />
            <button @click="makeSearch()">
              <b-icon icon="search"></b-icon>
            </button>
          </div>

          <!-- Right aligned nav items -->
          <b-navbar-nav class>
          
          <b-nav-item href="#">
              <router-link to="/customer/mybooks" class="navbar-item" right>
                Upload
              </router-link>
            </b-nav-item>

            <b-nav-item href="#">
              <router-link to="/cart" class="navbar-item" right>
                <b-icon icon="cart-fill" v-if="totalItemsInCart > 0"></b-icon>
                <b-icon icon="cart" v-else></b-icon>
                <b-badge variant="warning">{{ totalItemsInCart }}</b-badge>
              </router-link>
            </b-nav-item>
               
            <b-dropdown
              id="dropdown-right"
              right
              class="m-md-1"
              variant="link"
              toggle-class="text-decoration-none"
              v-if="isLoggedIn"
              no-caret
            >
              <template v-slot:button-content>
                <b-icon icon="person" style="color:#DC143C"></b-icon>
              </template>

              <b-dropdown-item>
                <router-link to="/customer/profile" class="navbar-item">
                  <b-icon icon="person-circle"></b-icon> Profile
                </router-link>
              </b-dropdown-item>

              <b-dropdown-item>
                <router-link to="/customer/transactions" class="navbar-item">
                  <b-icon icon="arrow-left-right"></b-icon> Transactions
                </router-link>
              </b-dropdown-item>

              <b-dropdown-item>
                <router-link to="/customer/mybooks" class="navbar-item">
                  <b-icon icon="collection"></b-icon> My Books
                </router-link>
              </b-dropdown-item>

              <b-dropdown-item @click="logout">
                <b-icon icon="box-arrow-right"></b-icon> Log Out
              </b-dropdown-item>
            </b-dropdown>

            <div class="login-register" v-else>
              <b-nav-item href="#">
                <router-link to="/login" class="navbar-item">
                  <b-icon icon="people"> Login</b-icon>
                </router-link>
              </b-nav-item>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <Category v-bind:categories="categories_list" />

   
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import Category from "./category/Category";

import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  components: {
    Category,
  },
  data() {
    return {
      categories_list: [],
      isLoggedIn: false,
      search_key:'',
    };
  },
  computed: {
    ...mapGetters({
      totalItemsInCart: "cart/getTotalItemsInCart",
      hasToken: "auth/getToken",
    }),
  },
  created() {
    this.getCategories();
    // this.checkIsLogIn();
  },
  watch:{
    $route:function(){
      this.checkIsLogIn();
    },
  },
  methods: {
    makeSearch(){
      const search_key=this.search_key;
      if(search_key!=''){
       this.$router.push({ name: 'Search', params: { key: search_key}})
      }
    },
    getCategories() {

      // will get categories instead of menu

      this.$http
        .get("https://eshop.test/api/getCategoriesMenu")
        .then((response) => {
          this.categories_list = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkIsLogIn() {
      this.$store.dispatch("auth/checkAuthToken").then(() => {
        this.isLoggedIn = true;
      })
      .catch((error)=>{
        // console.log(error.response.data);
        this.$toast.error(error.response.data.message, {
                timeout: 2000
            });
      })
    },
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/login");
        this.$http.defaults.headers.common = { Authorization: `` };
        this.isLoggedIn=false;
      })
      .catch((error)=>{
        console.log(error);
      })
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0;
  width: 100%;
}
a {
  color: #DC143C;
  opacity: 0.8;
}
a:hover {
  opacity: 1;
  color: #DC143C;
}
input.search-input {
  width: 30em;
  height: 40px;
  background: #eeeeee91;
  border: 0px;
  transition: ease-in-out, width 0.35s ease-in-out;
  box-shadow: 0px 2px 4px -2px #DC143C;
  padding-left: 8px;
}
.nav-bar {
  background: #fff;
}
.search-bar {
  position: relative;
  margin: 0 auto;
}
input.search-input:focus {
  border: 0px !important;
  /* width: 50em; */
  background: #eee;
  box-shadow: 0px 2px 4px -2px #DC143C !important;
}
.search-bar button {
  border: 0px;
  position: absolute;
  right: 2px;
  background: unset;
  color: #DC143C;
  top: 8px;
}

/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  input.search-input {
    width: 100%;
  }
}
</style>
