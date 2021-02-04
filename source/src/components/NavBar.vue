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
            />
            <button>
              <b-icon icon="search"></b-icon>
            </button>
          </div>

          <!-- Right aligned nav items -->
          <b-navbar-nav class>
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
                <b-icon icon="person" style="color:#7cb342"></b-icon>
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

    <Menu v-bind:menus="menuslist" />

    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import Menu from "./menu/Menu";

import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  components: {
    Menu,
  },
  data() {
    return {
      menuslist: [],
      isLoggedIn: false,
    };
  },
  computed: {
    ...mapGetters({
      totalItemsInCart: "cart/getTotalItemsInCart",
      hasToken: "auth/getToken",
    }),
  },
  created() {
    this.getMenu();
    // this.checkIsLogIn();
  },
  watch:{
    $route:function(){
      this.checkIsLogIn();
    },
  },
  methods: {
    
    getMenu() {
      this.$http
        .get("https://eshop.test/api/getmenu")
        .then((response) => {
          this.menuslist = response.data.data;
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
  color: #7cb342;
  opacity: 0.8;
}
a:hover {
  opacity: 1;
  color: #7cb342;
}
input.search-input {
  width: 30em;
  height: 40px;
  background: #eeeeee91;
  border: 0px;
  transition: ease-in-out, width 0.35s ease-in-out;
  box-shadow: 0px 2px 4px -2px #7cb342;
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
  box-shadow: 0px 2px 4px -2px #7cb342 !important;
}
.search-bar button {
  border: 0px;
  position: absolute;
  right: 2px;
  background: unset;
  color: #7cb342;
  top: 8px;
}

/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  input.search-input {
    width: 100%;
  }
}
</style>
