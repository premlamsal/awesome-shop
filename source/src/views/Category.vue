<template>
  <b-container class="bg-white mt-3">
  <div class="category-full-panel">
    <b-row>
      
      <b-col cols="10">
        <div class="category-header">
          <h4>Products for this Category</h4>
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
        </div>
      </b-col>
    </b-row>
    </div>
  </b-container>
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
      category_slug: "", //to store product slug form the url
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
      this.category_slug = this.$route.params.slug; //get category slug from the url.
      this.loadProductsByCategory(); //load the product as per the slug
    },
    loadProductsByCategory(url) {
      let url_link =
        url || "https://eshop.test/api/category/" + this.category_slug;
      this.$http
        .get(url_link)
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
.category-header {
}
.category-full-panel{
    padding:10px;
}
</style>
