<template>
    <div class="content mt-2">
      <b-container>
      <h5>My Books</h5>
        <b-row>
          <b-col>
          <div v-if="products.length>0">
            <product :products="products" ></product>
            </div>
            <div v-else>
              <button class="btn btn-success mt-3">
                Add Book
              </button>
              <p class="mt-3">You have no Books. Please add one to start earning.</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
</template>

<script>
import Product from "../components/Product";

export default {
  name: "MyBooks",
  components: {
    Product,
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.loadMyBooks();
  },
  computed: {},
  methods: {
    loadMyBooks() {
      this.$http
        .get("https://eshop.test/api/loadMyBooks")
        .then((response) => {
          // console.log(response.data.data[0].products);
          this.products = response.data.data[0].products
        })
        .catch((error) => {
          console.log(error);
        });
    }, //end of loadMyBooks
  },
};
</script>
<style scoped>
.content {
  background: white;
  padding: 5em;
}
</style>
