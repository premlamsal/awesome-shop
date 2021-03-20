<template>
<div class="mt-2 bg-white">
  <b-container>
    <b-row>
      <b-col>
        <div class="CheckOut" v-if="isLoading===false">
          <div class="payment-panel">
            <h5>Please choose a payment method</h5>
            <div class="pay-box-outside">
              <div class="payment-img-holder">



                <form :action="esewa_path" method="POST">
                  <input v-bind:value="esewa_params.tAmt" name="tAmt" type="hidden" />
                  <input v-bind:value="esewa_params.amt" name="amt" type="hidden" />
                  <input v-bind:value="esewa_params.txAmt" name="txAmt" type="hidden" />
                  <input v-bind:value="esewa_params.psc" name="psc" type="hidden" />
                  <input v-bind:value="esewa_params.pdc" name="pdc" type="hidden" />
                  <input v-bind:value="esewa_params.scd_merchant" name="scd" type="hidden" />
                  <input v-bind:value="esewa_params.product_id" name="pid" type="hidden" />
                  <input
                    v-bind:value="esewa_params.su"
                    type="hidden"
                    name="su"
                  />
                  <input
                    v-bind:value="esewa_params.fu"
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

    let self=this;

    return {


      isLoading: true,


      //esewa params
      esewa_path: "https://uat.esewa.com.np/epay/main",
      esewa_params: {
        amt: 0,
        psc: 0,
        pdc: 0,
        txAmt: 0,
        tAmt: 0,
        product_id: '',
        scd_merchant: "EPAYTEST",
        su: 'http://localhost:8080/#/verify/esewa',
        fu: 'http://localhost:8080/#/error',
      },

      //kahlti params
      khaltiConfig: {
            "publicKey": "test_public_key_bd1183cb4a854bd9a1f352a7ec083945",
            "productIdentity": "fadsk",
            "productName": "fkjnadskj",
            "productUrl": "https://eshop.tes",
            "amount": 12,
            eventHandler: {
                onSuccess (payload) {
                    // console.log(payload);

                    self.verifyKhalti(payload);

                },
                onError (error) {
                    console.log(error);
                },
                onClose () {
                    console.log('widget is closing');

                }
            }
        },

    
    };
  },
  computed: {
    ...mapGetters({
      totalItemsInCart: "cart/getTotalItemsInCart",
      grandTotal: "cart/getGrandTotalCart",
      getCartItems: "cart/getCartItems",
    }),
  },
  created(){

    this.callBackForCartCheck();


    //will check cart product is uploaded by current user 
    // this.checkCartProduct();


  },
   watch: { 
     '$route.params': {
        handler: function() {

          this.callBackForCartCheck();
        },
        deep: true,
        immediate: true
      }
},
  methods: {

    // checkCartProduct(){
    //   let formData =  new FormData();
    //   formData.append('cart',JSON.stringify(this.getCartItems));
    //   formData.append('_METHOD','POST');

    //   this.$http.post('https://eshop.test/api/frontend/check/cart',formData)
    //   .then((response)=>{

    //     console.log(response.data);
    //   })
    //   .catch((error)=>{

    //     console.log(error.response.data)
        
    //     // this.$router.push("/customer/myorders");
    //     // throw user to cart since this failed to check

    //   })


    // },

    verifyKhalti(payload){
      // console.log('hello from khalti');
      let formData =  new FormData();
      formData.append('khalti',JSON.stringify(payload));
      formData.append('cart',JSON.stringify(this.getCartItems));
      formData.append('_METHOD','POST');

      this.$http.post('https://eshop.test/api/frontend/verify/khalti',formData)
      .then((response)=>{

        // console.log(response);

          //clearing the cart after puchase success 
          this.$store.commit("cart/clearCart");//commit will triger mutation
          //now cart item moved to order lists;
          
          this.$toast.success(response.data.msg,{
            timeout: 7000
          });

           this.$router.push("/customer/myorders");


      })
      .catch((response)=>{

        // console.log(response);
          this.$toast.error(response.data.msg,{
            timeout: 7000
          });
      });


    },

    callBackForCartCheck(){
console.log(this.isLoading)
      this.isLoading=true;

        // const cart = JSON.stringify(this.getCartItems);

        this.$http.post('https://eshop.test/api/frontend/cart/check',this.getCartItems)
        .then((response)=>{

          this.khaltiConfig.amount = (response.data.amount) * 100; //converting rs to paisa for khalti

          this.khaltiConfig.productIdentity = response.data.books_id; 

          this.khaltiConfig.productName = 'productName'+ response.data.books_id; 

          this.khaltiConfig.productUrl = 'http://eshop.test/'+response.data.books_id; 

          this.esewa_params.amt = response.data.amount; //amount for esewa

          this.esewa_params.tAmt = response.data.amount; //total amount for esewa

          this.esewa_params.product_id = response.data.books_id;



          // console.log(response.data);
          this.isLoading=false;
console.log(this.isLoading)

         
        })
        .catch((error)=>{
          this.isLoading=true;
            console.log(error);
        });
  
console.log(this.isLoading)


    },
    
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