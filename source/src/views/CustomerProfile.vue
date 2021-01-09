<template>
  <b-container class="mt-5">
    <b-row>
      <b-col>
        <b-row>
          <b-card-group deck v-for="product in products" :key="product.id">
            <b-col>
              <b-card
                :title="product.name"
                img-src=" https://picsum.photos/seed/picsum/250/200"
                :img-alt="product.title"
                img-top
                style="max-width: 20rem;"
                class="mb-2"
              >
                <b-card-text>$ {{product.price}}</b-card-text>
                <template v-slot:footer>
                  <b-button @click="addToCart(product.id)" variant="success">Add to Cart</b-button>
                </template>
              </b-card>
            </b-col>
          </b-card-group>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "CustomerProfile",
  components: {
    // HelloWorld
  },
  data() {
    return {};
  },
  computed: {
    // products(){
    //   return this.$store.getters.getProducts;
    // }
    ...mapGetters({
      products: 'cart/getProducts',
      totalProducts: 'cart/getTotalProduct',
      cart: 'cart/getCartItems',
      totalItemsInCart: 'cart/getTotalItemsInCart',
      grandTotal: 'cart/getGrandTotalCart'
    })
  },
  methods: {
    test(){
      
    },
    addToCart(productId) {
      let payload = { productId: productId, quantity: 1 };
      // this.$store.commit('pushCart', payload);

      // // or direct send payload and its key like below
      //   this.$store.commit({
      //     type: 'pushCart',
      //     productId:productId,
      //     quantity: 1,
      //     });

      // instead using dispatch for actions
      this.$store.dispatch("cart/addProductToCart", payload);
    },
    removeFromCart(productId) {
      this.$store.dispatch("cart/removeProductFromCart", productId);
    },
    goToCart() {
      this.$router.push({ path: `/cart` });
    }
  }
};
</script>
<style scoped>
.product-container ul {
  list-style: none;
}
.cart-container ul {
  list-style: none;
}
</style>
