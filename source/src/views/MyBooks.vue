<template>
    <div class="content mt-2">
      <b-container>
      <h5>My Books</h5>

        <b-row>
          <b-col>
            <product :products="products"></product>
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
          console.log(response.data);
          this.products=response.data.data[0].products;
          console.log(this.product)
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
