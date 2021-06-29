<template>
  <div class="content mt-2">
    <b-container>
                 
      <h4> <b-icon icon="minecart-loaded"></b-icon> Order From Customers</h4>
      <b-row>
                   <b-col>
            <div class="mt-4">

              <div class="order-collection"  v-for="order in orders" v-bind:key="order.id">
              <b-card
                :title="'order# '+ order.custom_order_id"
                style="max-width: 100%;"
                class="mb-2">
                <b-card-text>
                  Order placed on: {{order.created_at}}
                </b-card-text>
                <b-card-text>
                 Status : {{order.status}}
                </b-card-text>

                <b-button href="#" variant="primary" @click="getOrder(order.id)">View Order</b-button>
              </b-card>
            </div>




            </div>


            <!-- modal -->


           <div v-if="order!=null">
            <b-modal id="bv-modal-order-details" hide-footer size="xl">
              <template #modal-title>
              Order# {{order.custom_order_id}}
              </template>

                <div class="d-block text-center">
                                  <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Item</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in order.order_json" v-bind:key="order.id">
                      <td><img :src="order.bookImage" class="cart-item-img" width="80" height="80" /></td>
                      <td>{{order.bookName}}</td>
                      <td>{{order.bookQuantity}}</td>
                      <td>Rs. {{order.bookLineTotal}}</td>
                    </tr>
                  </tbody>
                </table>  
           
                  
                </div>
             <hr/>
             <h3>Grand Total Rs. {{ this.grandTotalOrder}}</h3>
             <h3>Status {{ order.status}}</h3>
            </b-modal>



          </div>

            <!-- modal -->

       </b-col>
      </b-row>


    </b-container>
  </div>
</template>

<script>
export default {
  name: "CustomerOrders",
  components: {},
 data() {
    return {
      orders:{

      },
      grandTotalOrder:'',
      order:{
        created_at:'',
        updated_at:'',
        order_json:{

        },

        trans_idx:'',
        user_id:'',

      }
    };
  },
  created() {

    this.getOrders();

  },
  computed: {



  },
  methods: {

    getOrders() {

      this.$http.get('https://eshop.test/api/frontend/getOrders')
        .then((response) => {

          this.orders = response.data.data;

        })
        .catch((error) => {

          console.log(error);

        })

    },

    getOrder(id) {


      this.$http.get('https://eshop.test/api/frontend/getSellerOrder/' + id)
        .then((response) => {


          console.log(response);

          this.order=response.data.data[0];

            this.$bvModal.show("bv-modal-order-details");


            this.grandTotalOrder=this.order.order_json.reduce(function (carry, cartItem) {
            return (
              carry +
              parseFloat(cartItem.bookQuantity) * parseFloat(cartItem.bookPrice)
            );
          }, 0);




        })
        .catch((error) => {
          console.log(error);
        });


      // //no api call
      // //filtering order from the orders array
      // const order = this.orders.find((order) => {
      //   return order.id == id;
      // });

      // // console.log(order);
      // this.order=order;
      // this.$bvModal.show("bv-modal-order-details");

    },

  },
};
</script>

<style scoped>
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
  display: inline-block;
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

.content {
  background: white;
  padding: 5em;
}

.book-image-inside-table {
  width: 100px;
  height: 100px;
  border-radius: 64px;
  margin: 2px;
}

.errorText {
  color: red;
}
</style>
