<template>
  <b-container>
    <b-row>
      <b-col></b-col>

      <b-col>
        <div class="register mt-5">
          <h4>Register</h4>
          <b-form @submit.stop.prevent>
            <!-- <label for="feedback-user" class="mt-4">Name</label> -->
            <b-input
              v-model="user.firstname"
              type="text"
              placeholder="Enter First Name"
              class="mt-4"
            ></b-input>

            <div class="error-block">
              <span style="color: red" v-if="errors.firstname">
                <ul v-for="error in errors.firstname" :key="error">
                  <li>{{ error }}</li>
                </ul>
              </span>
            </div>

            <b-input
              v-model="user.lastname"
              type="text"
              placeholder="Enter Last Name"
              class="mt-4"
            ></b-input>

            <div class="error-block">
              <span style="color: red" v-if="errors.lastname">
                <ul v-for="error in errors.lastname" :key="error">
                  <li>{{ error }}</li>
                </ul>
              </span>
            </div>
            <!-- <label for="feedback-user" class="mt-4">Email ID</label> -->
            <b-input
              v-model="user.email"
              id="feedback-email"
              type="email"
              placeholder="Enter Email"
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
              placeholder="Enter Password"
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
              {{ error }}
            </label>
            <b-button
              variant="success"
              class="mt-2 mb-2"
              @click="register"
              v-if="showRegisterBtn"
              style="width:100%"
            >
              <b-spinner b-spinner small v-if="isLoading"></b-spinner>Register
            </b-button>
            <br />
            <router-link to="/login"
              >Already registered? Click here</router-link
            >
          </b-form>
        </div>
      </b-col>

      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
      error: "",
      errors: [],
      isLoading: false,
    };
  },
  computed: {
    showRegisterBtn() {
      if (
        this.user.email != "" &&
        this.user.password != "" &&
        this.user.firstname != "" &&
        this.user.lastname != ""
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    register() {
      this.isLoading = true;
      this.$store
        .dispatch("auth/register", this.user)
        .then((response) => {
          this.isLoading = false;
          this.$router.push("/customer/profile");
          this.$http.defaults.headers.common = {
            Authorization: `Bearer ${response.data.access_token}`,
          };
          this.$toast.success("Welcome! Thanks for registering", {
            timeout: 2000,
          });
        })
        .catch((error) => {
          this.errors = [];
          this.error = "";
          this.isLoading = false;

          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          } else if (error.response.status === 401) {
            this.error = error.response.data.message;
          }
        });
    },
  },
};
</script>
<style scoped>
.register {
  background: #fcfcfc;
  padding: 37px;
  box-shadow: 0px 5px 10px -2px #aeb5b9ad;
  margin: 0 auto;
  width: 25em;
  border: 1px solid #7cb342;
  border-radius: 10px;
}
.register h4 {
  text-align: center;
}
.error-block ul {
  list-style: none;
  padding: 0px;
  margin: 5px;
}
</style>
