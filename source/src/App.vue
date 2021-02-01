<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view />
    <Footer/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { mapGetters } from "vuex";
export default {
  components: {
    NavBar,Footer
  },
  data(){
    return{
       items: [
          {
            text: 'Admin',
            href: '#'
          },
          {
            text: 'Manage',
            href: '#'
          },
          {
            text: 'Library',
            active: true
          }
        ]
    }
  },

  computed: {
    ...mapGetters({
      totalItemsInCart: "cart/getTotalItemsInCart"
    })
  },
  created() {
  }
};
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #f2f2f2!important;
 
}
.custom-container {
  margin-left: 1em;
  margin-right: 1em;
}

.nav-bar a {
  text-decoration: none !important;
}
.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    color: #7cb342!important;
    /* background-color: #fff!important; */
    border: 0;
    border-bottom:2px solid #7cb342!important;
}
.theme-color{
  color: #7cb342;
}

.tabs a{
  color:slategrey!important;
}
.tabs{
  color:slategrey!important;
}
.bg-white{
  background: #fff!important;
}

.loadmore-btn {
  background: #7cb342!important;
  color: white!important;
  border: 1px solid #7cb342!important;
}
.loadmore-btn:hover {
  background: none!important;
  border: 1px solid #7cb342!important;
  color: #7cb342!important;
}
.green-btn {
  background: #7cb342!important;
  color: white!important;
  border: 1px solid #7cb342!important;
}
.green-btn:hover {
  background: none!important;
  border: 1px solid #7cb342!important;
  color: #7cb342!important;
}
</style>
