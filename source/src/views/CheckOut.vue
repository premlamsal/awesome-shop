<template>
<div class="mt-2 bg-white">
  <b-container>
    <b-row>
      <b-col>
        <div class="CheckOut">
          <div class="payment-panel">
            <h5>Please choose a payment method</h5>
            <div class="pay-box-outside">
              <div class="payment-img-holder">
                <form action="https://uat.esewa.com.np/epay/main" method="POST">
                  <input :value="grandTotal" name="tAmt" type="hidden" />
                  <input :value="grandTotal" name="amt" type="hidden" />
                  <input value="0" name="txAmt" type="hidden" />
                  <input value="0" name="psc" type="hidden" />
                  <input value="0" name="pdc" type="hidden" />
                  <input value="epay_payment" name="scd" type="hidden" />
                  <input value="ee2c3ca1-696b-4cc5-a6be-2c40d929d453" name="pid" type="hidden" />
                  <input
                    value="http://merchant.com.np/page/esewa_payment_success?q=su"
                    type="hidden"
                    name="su"
                  />
                  <input
                    value="http://merchant.com.np/page/esewa_payment_failed?q=fu"
                    type="hidden"
                    name="fu"
                  />
                  <button type="submit">
                  <img src="../assets/img/esewa.png" />
                  </button>
                  <!-- <input value="Submit" type="submit" /> -->
                </form>
                
              </div>
              <div class="payment-img-holder">
                  <vue-khalti ref="khaltiCheckout" v-bind="khaltiConfig">
                      <img src="../assets/img/khalti.png" @click="onKhaltiClick" />     
                  </vue-khalti>
              </div>
            </div>
          </div>
          <hr />
          <div class="cart-info-box">
            <h6>Cart Info</h6>
            <b-row>
              <b-col>
                Total Items
                <h5>{{totalItemsInCart}}</h5>
              </b-col>
              <b-col>
                Grand Total
                <h5>{{grandTotal}}</h5>
              </b-col>
            </b-row>
            <p>Your account details will be used for shipping. Please verify your shipping address.</p>
          </div>
          <div class="custom-button mt-4">
            <b-button
              class="green-btn"
              v-if="totalItemsInCart>0"
              @click="goToCart()"
              variant="default"
            >
              <b-icon icon="arrow-left"></b-icon>Back To Cart
            </b-button>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
  </div>

</template>
<script>
import { mapGetters } from "vuex";

import VueKhalti from 'vue-khalti';

export default {
  name: "Cart",
  components:{VueKhalti},
  data() {
    return {

      //esewa params
      esewa_path: "https://uat.esewa.com.np/epay/main",
      esewa_params: {
        amt: 100,
        psc: 0,
        pdc: 0,
        txAmt: 0,
        tAmt: 100,
        pid: "ee2c3ca1-696b-4cc5-a6be-2c40d929d453",
        scd: "epay_payment",
        su: "http://merchant.com.np/page/esewa_payment_success",
        fu: "http://merchant.com.np/page/esewa_payment_failed",
      },

      //kahlti params
      khaltiConfig: {
            "publicKey": "test_public_key_bd1183cb4a854bd9a1f352a7ec083945",
            "productIdentity": "YOUR_PRODUCT_ID",
            "productName": "YOUR_PRODUCT_NAME",
            "productUrl": "YOUR_PRODUCT_URL",
            "amount": 1000,
            "eventHandler": {
                onSuccess (payload) {
                    console.log(payload);
                },
                onError (error) {
                    console.log(error);
                },
                onClose () {
                    console.log('widget is closing');
                }
            }
        }




    
    };
  },
  computed: {
    ...mapGetters({
      totalItemsInCart: "cart/getTotalItemsInCart",
      grandTotal: "cart/getGrandTotalCart",
    }),
  },
  methods: {
    
    onKhaltiClick () {
        const khaltiCheckout = this.$refs.khaltiCheckout
        khaltiCheckout.onClick()
    },

    goToCart() {
      this.$router.push({ path: `/cart` });
    },
  },
};
</script>
<style scoped>
.CheckOut {
  padding: 0.5em;
}
.payment-img-holder {
  width: 80px;
  height: 80px;
  cursor: pointer;
}
.payment-img-holder img {
  width: 100%;
  height: 100%;
}
.pay-box-outside {
  display: flex;
}
</style>