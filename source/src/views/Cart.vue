<template>
        <div class="mt-2 cart-container bg-white">
        <b-container>
            <b-row>
          <b-col>
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
                      <b-col md="4">
                        <div class="cart-img-box">
                          <img :src="cart.bookImage" class="cart-item-img" />
                        </div>
                      </b-col>
                      <b-col md="4">
                        <div>
                          <h6>{{cart.bookName}}</h6>
                          <span style="color:#ff0000">$ {{cart.bookPrice}}</span>
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col md="2">{{cart.bookQuantity}}</b-col>
                  <b-col md="2">$ {{cart.bookLineTotal}}</b-col>
                  <b-col md="2">
                    <b-button @click="incrementTheCart(cart.bookId)" variant="default">
                      <b-icon icon="plus-circle"></b-icon>
                    </b-button>
                    <b-button @click="decrementTheCart(cart.bookId)" variant="default">
                      <b-icon icon="dash-circle"></b-icon>
                    </b-button>
                  </b-col>
                  <b-col md="2">
                    <b-button @click="removeBookFromCart(cart.bookId)" variant="default">
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
  
      </b-col>
    </b-row>
  </b-container>
        </div>
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
    decrementTheCart(bookId) {
      this.$store.dispatch("cart/decrementTheCart", bookId);
    },
    incrementTheCart(bookId) {
      this.$store.dispatch("cart/incrementTheCart", bookId)
      .then((response)=>{
          this.$toast.success(response, {
            timeout: 4000,
          });
      })
      .catch((error)=>{

          this.$toast.error(error, {
            timeout: 4000,
          });
      })
    },
    removeBookFromCart(bookId) {
      this.$store.dispatch("cart/removeBookFromCart", bookId);
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
  border: 1px solid #DC143C61;
  background-color: #DC143C;
}
.btn-checkout:hover {
  opacity: 0.9;
  color: #DC143C;
  border: 1px solid #DC143C61;
  background-color: #DC143C00;
}
.sidebox-cart {
  margin-top: 1em;
  padding-top: 1em;
  border-top: 1px solid #eee;
}
</style>
