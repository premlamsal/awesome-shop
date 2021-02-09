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
            Popular
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
          <div class="category-card-container">
            <h5>Start with Categories</h5>
            <div class="category-card">
              <ul v-for="category in categories" v-bind:key="category.id">
                <li>
                  <a href="javascript:" @click="showByCat(category.slug)">{{
                    category.name
                  }}</a>
                </li>
              </ul>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h5 style="text-align:center" class="mt-2 pt-2 theme-color">
            More Books
          </h5>
          <div class="product-panel">
            <div class="product-panel-insider">
              <product :products="products.data"></product>
            </div>
            <div class="inner-btn mb-4">
              <b-button
                variant="default"
                class="loadmore-btn"
                @click="loadProducts(pagination.next_link)"
                v-if="pagination.next_link!=null"
              >
                <b-icon icon="arrow-down"></b-icon>Load More
              </b-button>
            </div>
          </div>

          <div></div>
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

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    Slider,
    ProductSlider,
    Product,
  },
  data() {
    return {
      //will holds all the products meta, link and data as well
      products: {
        data: [], //will hold all the product
      },
      categories: [],
      next_page: "",
      more_data: "",
      pagination: {},
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
    this.loadCategories();
    this.loadProducts();
  },
  mounted() {},
  methods: {
    showByCat(slug) {
      this.$router.push({ name: "Category", params: { slug: slug } });
    },
    loadCategories() {
      //load random 5 Categories

      this.$http
        .get("https://eshop.test/api/categories/random")
        .then((response) => {
          this.categories = response.data.data;
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message, {
            timeout: 4000,
          });
        });
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

    pushProduct(product_object) {
      this.products.data.push(product_object);
    },
    loadProducts(page_url) {
        this.$Progress.start();

        page_url = page_url || "https://eshop.test/api/products";

        this.$http
          .get(page_url)
          .then((response) => {
            //pushing products to data of product object
            // console.log(response.data.data);

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
.category-card {
  display: flex;
  justify-content: center;
}
.category-card ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}
.category-card ul li {
  float: left;
}
.category-card ul li a {
  margin: 1em;
  padding: 2.5em;

  background: #fff;
  color: #83b759;

  box-shadow: 1px 1px 0px 1px #d1dcc8;

  border-radius: 56%;
  font-size: large;
  display: block;
  text-decoration: none;
  transition: opacity 0.5s ease-out;
  -moz-transition: opacity 0.5s ease-out;
  -webkit-transition: opacity 0.5s ease-out;
  -o-transition: opacity 0.5s ease-out;
}
.category-card ul li a:hover {
  background: #83b759;
  color: #fff;
  box-shadow: 1px 3px 10px 4px #d1dcc4;
}
.category-card-container {
  margin: 4em 0em 2em 0em;
}
.category-card-container h5 {
  color: #83b759;
  text-align: center;
}
</style>
