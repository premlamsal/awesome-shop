<template>
  <b-container class="mt-4 bg-white">
    <b-row>
      <b-col>
        <div class="cart-container">
          <div class="cart-inside">
            <h3 class="theme-color">
              <b-icon icon="bag-fill" v-if="totalItemsInCart>0"></b-icon>
              <b-icon icon="bag" v-else></b-icon> Cart
            </h3>
            <b-row>
              <b-col md="4">
                <span class="cart-item-table-heading">Item</span>
              </b-col>
              <b-col md="2">
                <span class="cart-item-table-heading">Quantity</span>
              </b-col>
              <b-col md="2">
                <span class="cart-item-table-heading">Total</span>
              </b-col>
              <b-col md="2"></b-col>
              <b-col md="2"></b-col>
            </b-row>
            <ul v-for="cart in cart" :key="cart.id">
              <li>
                <b-row>
                  <b-col md="4">
                    <b-row>
                      <b-col md="3">
                        <div class="cart-img-box">
                          <img :src="cart.productImage" class="cart-item-img" />
                        </div>
                      </b-col>
                      <b-col md="5">
                        <div>
                          <h6>{{cart.productName}}</h6>
                          <span style="color:#607D8B">$ {{cart.productPrice}}</span>
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col md="2">{{cart.productQuantity}}</b-col>
                  <b-col md="2">$ {{cart.productLineTotal}}</b-col>
                  <b-col md="2">
                    <b-button @click="incrementTheCart(cart.productId)" variant="default">
                      <b-icon icon="plus-circle"></b-icon>
                    </b-button>
                    <b-button @click="decrementTheCart(cart.productId)" variant="default">
                      <b-icon icon="dash-circle"></b-icon>
                    </b-button>
                  </b-col>
                  <b-col md="2">
                    <b-button @click="removeProductFromCart(cart.productId)" variant="default">
                      <b-icon icon="x-circle" style="color:#f44336"></b-icon>
                    </b-button>
                  </b-col>
                </b-row>
              </li>
            </ul>
            <div class="sidebox-cart">
              <b-row>
                <b-col md="4">{{totalItemsInCart}} Items</b-col>
                <b-col md="2">
                  <h5 class="theme-color">Grand Total</h5>
                </b-col>
                <b-col md="2">
                  <span class="grand-total-cart">$ {{grandTotal}}</span>
                </b-col>
                <b-col md="4">
                  <div class="checkout-button">
                    <b-button class="btn-checkout" v-if="totalItemsInCart>0" @click="goToCheckout()">
                      <b-icon icon="cart-check"></b-icon>Checkout
                    </b-button>
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  computed: {
    ...mapGetters({
      cart: "cart/getCartItems",
      totalItemsInCart: "cart/getTotalItemsInCart",
      grandTotal: "cart/getGrandTotalCart"
    })
  },
  methods: {
    decrementTheCart(productId) {
      this.$store.dispatch("cart/decrementTheCart", productId);
    },
    incrementTheCart(productId) {
      this.$store.dispatch("cart/incrementTheCart", productId);
    },
    removeProductFromCart(productId) {
      this.$store.dispatch("cart/removeProductFromCart", productId);
    },
    goToCheckout(){
       this.$router.push({ path: `/checkout` });
    }
  }
};
</script>
<style scoped>
.cart-container ul {
  list-style: none;
  padding: 0px;
  margin-top: 1em;
}
span.grand-total-cart {
  font-weight: bold;
}
.cart-item-table-heading {
  font-weight: bold;
}
.cart-container {
  padding: 1em;
}
.cart-img-box {
  width: 100px;
  height: 80px;
}
.cart-item-img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  display: block;

  /* margin: 0 auto; */
}
.btn-checkout {
  outline: 0;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  width: 15em;
  margin: 1em;
  margin-left: 0;
  font-size: 16px;
  display: block;
  color: white;
  border: 1px solid #7cb34261;
  background-color: #7cb342;
}
.btn-checkout:hover {
  opacity: 0.9;
  color: #7cb342;
  border: 1px solid #7cb34261;
  background-color: #7cb34200;
}
.sidebox-cart {
  margin-top: 1em;
  padding-top: 1em;
  border-top: 1px solid #eee;
}
</style>
