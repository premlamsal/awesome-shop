<template>
  <div class="content mt-2">
    <b-container>
      <h5>Verification is in Process..</h5>
      <b-row>
        <b-col>
          <div class="text-center" v-if="isLoading === true">
            <b-spinner variant="success" label="Spinning"></b-spinner>
            <h4>Please Wait...</h4>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VerifyEsewa",
  data() {
    return {
      esewa: {
        oid: '',
        amt: '',
        refId: '',
      },
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      totalItemsInCart: "cart/getTotalItemsInCart",
      grandTotal: "cart/getGrandTotalCart",
      getCartItems: "cart/getCartItems",
    }),
  },
watch: {
    $route: function() {
      this.initEsewaUrlParams();
    },
  },
created(){
this.initEsewaUrlParams();
 
},
methods: {
    initEsewaUrlParams(){
      this.esewa.oid = this.$route.query.oid;
      this.esewa.amt = this.$route.query.amt;
      this.esewa.refId = this.$route.query.refId
      if(this.esewa.oid!='' && this.esewa.amt!='' && this.esewa.refId!=''){
        this.VerifyEsewa();
      }
    },

    VerifyEsewa() { 
      console.log('hey from verify');
      if(this.esewa.oid!='' && this.esewa.amt!='' && this.esewa.refId!=''){

          this.isLoading = true;
      let formData = new FormData();
      formData.append("esewa", JSON.stringify(this.esewa));
      formData.append("cart", JSON.stringify(this.getCartItems));
      this.$http.post('https://eshop.test/api/frontend/verify/esewa', formData)
        .then((response)=>{
          console.log(response);
          this.$toast.success(response.data.msg,{
            timeout: 7000
          });
          this.isLoading = false;
          this.esewa.oid='';
          this.esewa.amt='';
          this.esewa.refId='';
          //clearing the cart after puchase success 
          this.$store.commit("cart/clearCart");//commit will triger mutation
          //now cart item moved to order lists;

           this.$router.push("/customer/myorders");


        })
        .catch((error) => {

          // console.log(error.response.data.msg);

          this.$toast.error(error.response.data.msg, {
            timeout: 7000
          });
          this.isLoading = false;

        });


      }else{

          console.log('nulled baby');

      }
    

    },




  }
};
</script>

<style scoped>
.content {
  background: white;
  padding: 5em;
}
</style>
