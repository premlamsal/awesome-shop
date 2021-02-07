<template>
  <div class="search-full-panel bg-white mt-2">
  <b-container>
  
    <b-row>
      <b-col cols="10">
        <div class="search-header mt-4">
        <h3>You've searched for {{search_key}}</h3>
          <h4>We found this for you !</h4>
          <div class="product-panel mt-5">
            <div class="product-panel-insider">
              <product :products="products"></product>
            </div>
            <div class="inner-btn mb-4">
              <b-button variant="default" class="loadmore-btn">
                <b-icon icon="arrow-down"></b-icon>Load More
              </b-button>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>

  </b-container>
      </div>
</template>
<script>
import Product from "../components/Product";
import { mapGetters } from "vuex";
export default {
  components: {
    Product,
  },

  data() {
    return {
      search_key: "", //to store product slug form the url
      products: [], //for loding more products content on product details page
      render_product_block: true,
    };
  },
  created() {
    this.getIdFromUrl();
  },
  mounted() {
    // this.scrollToTop();
  },
  watch: {
    $route: function() {
      this.getIdFromUrl();
    },
  },

  computed: {
    ...mapGetters({
      // products: "cart/getProducts"
    }),
  },
  methods: {
    getIdFromUrl() {
      this.scrollToTop(); //take page to top
      this.search_key = this.$route.params.key; //get search slug from the url.
      this.loadProductsBySearch(); //load the product as per the slug
    },
    loadProductsBySearch(url) {
      this.$Progress.start();

      let url_link =
        url || "https://eshop.test/api/search/" + this.search_key;
      this.$http
        .get(url_link)
        .then((response) => {
          this.products = response.data.data;
      this.$Progress.finish();

        })
        .catch((error) => {
          console.log(error);
      this.$Progress.fail();

        });
    },

    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
.search-header {
text-align:center;
}
.search-full-panel{
    padding:10px;
}
</style>
