<template>
  <div class="content mt-2">
    <b-container>
      <b-row>
        <b-col>
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Transactions</h5>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                   <th scope="col">Transaction ID</th>
                    <th scope="col">Date- initiated</th>
                    <th scope="col">Details</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>

                  </tr>
                </thead>
                <tbody>

                  <tr
                    v-for="transaction in user.transactions"
                    v-bind:key="transaction.id"
                  >
                    <td>{{transaction.custom_transaction_id}}</td>
                    <td scope="row">{{ new Date(transaction.created_at) }}</td>
                    <td>{{ transaction.action }} #{{ transaction.ref_id }}</td>
                    <td>Rs. {{ transaction.amount }}</td>
                    <td>{{transaction.status}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card-footer">
              <h4>Rs. {{ user.balance }}</h4>
              <b-button
                id="show-btn"
                @click="$bvModal.show('bv-modal-withdraw')"
                class="btn btn-warning"
                v-if="user.balance>0 && canWithdraw">WithDraw</b-button
              >
              <div class="someMessages" v-if="!canWithdraw">
                <p>{{messages}}</p>
              </div>
            </div>
          </div>
              <b-modal
                id="bv-modal-withdraw"
                hide-footer
                title="With Draw from Account"
              >
                <div class="d-block text-center">
                  <div class="row">
                    <div class="col-md-4">
                      <label>Enter the amount</label>
                    </div>
                    <div class="col-md-7">
                      <input
                        type="text"
                        v-model="withdraw.amount"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col-md-2"></div>
                    <div class="col-md-4 esewa">
                      <img
                        src="@/assets/img/esewa.png"
                        width="80"
                        height="80"
                      />

                      <input
                        type="radio"
                        v-model="withdraw.method"
                        value="esewa"
                      />
                    </div>
                    <div class="col-md-4 khalti">
                      <img
                        src="@/assets/img/khalti.png"
                        width="80"
                        height="80"
                      />

                      <input
                        type="radio"
                        v-model="withdraw.method"
                        value="khalti"
                      />
                    </div>
                  </div>
                </div>
                <b-button
                  class="mt-3"
                  block
                  @click="withDrawRequest"
                  >Request for WithDraw</b-button
                >
              </b-modal>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Transactions",
  components: {},
  data() {
    return {
      user: {
        details: {},
        transactions: {},
      },
      withdraw: {
        method: "",
        amount: "",
      },
      messages:'',
      canWithdraw:false,
    };
  },
  created() {
    this.getUserTransactions();
    this.checkIfWithDrawRequested();
  },
  computed: {},
  methods: {
    getUserTransactions() {
      this.$http
        .get("https://eshop.test/api/getUserTransaction")
        .then((response) => {
          this.user = response.data.data[0];
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  checkIfWithDrawRequested(){

    this.$http.get('https://eshop.test/api/checkIfWithDrawRequested')
    .then((response)=>{
      // console.log(response.data);
      this.messages=response.data.msg;
        if(response.data.data===1){
          this.canWithdraw=false;
        }
        else{
          this.canWithdraw=true;
        }
    })
    .catch((error)=>{
      console.log(error);
    })

  },
    withDrawRequest(){
      this.$bvModal.hide('bv-modal-withdraw')
      this.$http
      .post("https://eshop.test/api/withDrawRequest",this.withdraw)
      .then((response)=>{
        console.log(response);
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  },
};
</script>
<style scoped>
.content {
  background: white;
  padding: 5em;
}
</style>
