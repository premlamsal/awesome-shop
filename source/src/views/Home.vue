<template>
  <div>
    <b-container>
      <div class="cat-slider-box">
        <b-row>
          <b-col cols="12">
            <slider></slider>
          </b-col>
        </b-row>
      </div>

      <b-row>
        <b-col>
          <h5 style="text-align:center" class="mt-2 pt-2 theme-color">
            Highlights
          </h5>
          <div class="col">
            <div class="product-container">
              <productSlider :products="products.data"></productSlider>
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div class="mt-4">
            <banner
              title="This is banner dear"
              img="https://picsum.photos/1920/700/?image=71"
            ></banner>
          </div>

          <h5 style="text-align:center" class="mt-2 pt-2 theme-color">
            Just for You
          </h5>
          <div class="product-panel">
            <div class="product-panel-insider">
              <product :products="products.data"></product>
            </div>
            <div class="inner-btn mb-4">
              <b-button variant="default" class="loadmore-btn">
                <b-icon icon="arrow-down"></b-icon>Load More
              </b-button>
            </div>
          </div>

          <div>
            <banner
              title="This is banner two dear"
              img="https://picsum.photos/1024/700/?image=77"
            ></banner>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import ProductSlider from "../components/ProductSlider";
import Product from "../components/Product";
import { mapGetters } from "vuex";
import Slider from "../components/Slider";
import Banner from "../components/Banner";

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    Slider,
    ProductSlider,
    Banner,
    Product,
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    // products(){
    //   return this.$store.getters.getProducts;
    // }
    ...mapGetters({
      //for testing purpose fetching product from dummy cart products
      // products: "cart/getProducts"
    }),
  },
  created() {
    this.loadProducts();
  },
  mounted() {},
  methods: {
    loadProducts(url) {
      this.$Progress.start();
      let url_link = url || "https://eshop.test/api/products";
      this.$http
        .get(url_link)
        .then((response) => {
          this.products = response.data;
          this.$Progress.finish();
        })
        .catch((error) => {
          console.log(error);
          this.$Progress.fail();
        });
    },
  },
};
</script>
<style>
.product-panel-insider {
  display: flex;
  justify-content: center;
}
.product-container ul {
  list-style: none;
}
.inner-btn {
  display: flex;
  justify-content: center;
}
.category-aside-panel {
}
.category-aside {
  background: #fff;
  padding: 8px;
}
.cat-slider-box {
  background: #fff;
}
.category-aside ul {
  list-style: none;
  padding-left: 5px;
  padding-bottom: 0px;
  margin: 0px;
}
.category-aside ul li {
  padding: 4px;
  display: inline-block;
}
.category-aside ul li :hover {
  padding-left: 2px;
}
.category-aside ul li a {
  color: gray;
  display: block;
  text-decoration: none;
}
.category-aside ul li a:hover {
  color: green;
}
.category-aside ul li ul.dropdown {
  min-width: 100%; /* Set width of the dropdown */
  background: #f2f2f2;
  display: none;
  position: absolute;
  z-index: 999;
  left: 0;
}
.category-aside ul li:hover ul.dropdown {
  display: block; /* Display the dropdown */
}
.category-aside ul li ul.dropdown li {
  display: block;
}
</style>
