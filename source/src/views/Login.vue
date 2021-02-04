<template>
  <b-col>
    <div class="login mt-5">
      <h4>Login</h4>
      <b-form @submit.stop.prevent>
        <!-- <label for="feedback-user" class="mt-4">Email ID</label> -->
        <b-input
          v-model="user.email"
          id="feedback-email"
          type="email"
          placeholder="Enter email"
          class="mt-4"
        ></b-input>

        <div class="error-block">
          <span style="color: red" v-if="errors.email">
            <ul v-for="error in errors.email" :key="error">
              <li>{{ error }}</li>
            </ul>
          </span>
        </div>

        <!-- <label for="feedback-password" class="mt-4">Passowrd</label> -->
        <b-input
          v-model="user.password"
          id="feedback-password"
          type="password"
          placeholder="Enter password"
          class="mt-4"
        ></b-input>
        <div class="error-block">
          <span style="color: red" v-if="errors.password">
            <ul v-for="error in errors.password" :key="error">
              <li>{{ error }}</li>
            </ul>
          </span>
        </div>
        <br />
        <label for="error" class="mt-4" style="color: red" v-if="error">
          {{
          error
          }}
        </label>
        <b-button variant="success" class="mt-2 mb-2" @click="login" v-if="showLoginBtn" style="width:100%">
          <b-spinner b-spinner small v-if="isLoading"></b-spinner> Login
        </b-button>
          <br/>
        <router-link to="/register">Not registered at? Click here</router-link>
      </b-form>
    </div>
  </b-col>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      error: "",
      errors: [],
      isLoading: false
    };
  },
  computed: {
    showLoginBtn() {
      // if (this.user.email != "" && this.user.password != "") {
      //   return true;
      // }
      // return false;
      return true;
    }
  },
  methods: {
    login() {
      this.isLoading = true;
      this.$store
        .dispatch("auth/login", this.user)
        .then((response) => {
          this.isLoading = false;
          this.$router.push("/customer/profile");
          this.$http.defaults.headers.common = {'Authorization': `Bearer ${response.data.access_token}`}
           this.$toast.success("Welcome", {
                timeout: 2000
            });
        })
        .catch(error => {
          this.errors = [];
          this.error = "";
          this.isLoading = false;

          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          } else if (error.response.status === 401) {
            this.error = error.response.data.message;
          }
          this.$toast.error(error.response.data.message, {
                timeout: 2000
            });
        });

    }
  }
};
</script>
<style scoped>
.login {
  background: #fcfcfc;
  padding: 37px;
  box-shadow: 0px 5px 10px -2px #aeb5b9ad;
  margin: 0 auto;
  width: 25em;
  border: 1px solid #7cb342;
  border-radius:10px;
}
.login h4 {
  text-align: center;
}
.error-block ul {
  list-style:none;
  padding:0px;
  margin:5px;
}
</style>
