<template>
  <div class="search-full-panel bg-white mt-2">
    <b-container>
      <b-row>
        <b-col cols="10">
          <div class="search-header mt-4">
            <h3>You've searched for {{ search_key }}</h3>
            <h4>We found this for you !</h4>
            <div class="product-panel mt-5">
              <div class="product-panel-insider">
                <product :products="products.data"></product>
              </div>
              <div class="inner-btn mb-4">
                <b-button
                  variant="default"
                  class="loadmore-btn"
                  @click="loadProductsByCategory(pagination.next_link)"
                  v-if="pagination.next_link != null"
                >
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
      render_product_block: true,
      products: {
        data: [], //will hold all the product
      }, //for loding more products content on product details page
      pagination: {},
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
    makePagination(meta, links) {
      let pagination = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        from_page: meta.from,
        to_page: meta.to,
        total_pages: meta.total,
        path_page: meta.path + "?page=",
        first_link: links.first,
        last_link: links.last,
        prev_link: links.prev,
        next_link: links.next,
      };
      this.pagination = pagination;
    },
    loadProductsBySearch(page_url) {
      this.$Progress.start();
      page_url = page_url || "https://eshop.test/api/search/" + this.search_key;

      this.$http
        .get(page_url)
        .then((response) => {
          response.data.data.forEach((data) => {
            this.products.data.push(data);
          });

          this.products.meta = response.data.meta;
          this.products.links = response.data.links;

          this.makePagination(response.data.meta, response.data.links);
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
  text-align: center;
}
.search-full-panel {
  padding: 10px;
}
</style>
