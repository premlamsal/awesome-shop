<template>
  <b-container class="mt-5">
    <div class="content">
      <div class="row">
        <div class="col-md-4">
          <div class="card card-user">
            <div class="image"></div>
            <div class="card-body">
              <div class="author">
                <img
                  class="avatar border-gray"
                  src="@/assets/niti-shah-e1554710253928-1024x881.jpg"
                />
                <h5 class="title" style="">
                  {{ user.firstname }} {{ user.lastname }}
                </h5>
                <h6 class="text-muted">{{ user.email }}</h6>
                <p class="description text-muted"></p>
              </div>
            </div>
            <div class="card-footer text-muted">
              <h5 class="balance">Rs. {{ user.balance }}</h5>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card card-user">
            <div class="card-header">
              <h5 class="card-title">Edit Profile</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-7 pr-1">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      v-model="user.email"
                    />
                  </div>
                </div>
                <div class="col-md-5 pl-1">
                  <div class="form-group">
                    <label for="exampleInputPhone">Phone</label>
                    <input
                      type="phone"
                      class="form-control"
                      placeholder="Phone"
                      v-model="user.details.phone"
                    />
                    <span v-if="errors['details.phone']" :class="['errorText']">{{
                      errors["details.phone"][0]
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 pr-1">
                  <div class="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Company"
                      v-model="user.firstname"
                    />
                    <span v-if="errors['firstname']" :class="['errorText']">{{
                      errors["firstname"][0]
                    }}</span>
                  </div>
                </div>
                <div class="col-md-6 pl-1">
                  <div class="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Last Name"
                      v-model="user.lastname"
                    />
                    <span v-if="errors['lastname']" :class="['errorText']">{{
                      errors["lastname"][0]
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Home Address"
                      v-model="user.details.address"
                    />
                    <span
                      v-if="errors['details.address']"
                      :class="['errorText']"
                      >{{ errors["details.address"][0] }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 pr-1">
                  <div class="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="City"
                      v-model="user.details.city"
                    />
                    <span
                      v-if="errors['details.city']"
                      :class="['errorText']"
                      >{{ errors["details.city"][0] }}</span
                    >
                  </div>
                </div>
                <div class="col-md-6 pl-1">
                  <div class="form-group">
                    <label>Postal Code</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="ZIP Code"
                      v-model="user.details.postal"
                    />
                    <span
                      v-if="errors['details.postal']"
                      :class="['errorText']"
                      >{{ errors["details.postal"][0] }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 pr-1">
                  <div class="form-group">
                    <label>Esewa ID</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Esewa ID"
                      v-model="user.details.esewa_id"
                    />
                    <span
                      v-if="errors['details.esewa_id']"
                      :class="['errorText']"
                      >{{ errors["details.esewa_id"][0] }}</span
                    >
                  </div>
                </div>
                <div class="col-md-6 pl-1">
                  <div class="form-group">
                    <label>Khalti ID</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Khalti ID"
                      v-model="user.details.khalti_id"
                    />
                    <span
                      v-if="errors['details.khalti_id']"
                      :class="['errorText']"
                      >{{ errors["details.khalti_id"][0] }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>About Me</label>
                    <textarea
                      class="form-control textarea"
                      v-model="user.details.about"
                    ></textarea>
                    <span
                      v-if="errors['details.about']"
                      :class="['errorText']"
                      >{{ errors["details.about"][0] }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="update ml-auto mr-auto">
                  <button @click="updateUser" class="btn btn-primary btn-round">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CustomerProfile",
  components: {
    ...mapGetters({
      user_token: "auth/getToken",
    }),
  },
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        phone: "",
        details: {
          phone:"",
          address: "",
          city: "",
          esewa_id: "",
          khalti_id: "",
          about: "",
        },
      },
      errors: [],
    };
  },
  created() {
    this.getUser();
  },
  computed: {},
  methods: {
    getUser() {
      this.$http
        .get("https://eshop.test/api/getUser")
        .then((response) => {
          const user_data = response.data.data[0];
          this.user.firstname = user_data.firstname;
          this.user.lastname = user_data.lastname;
          this.user.balance = user_data.balance;
          this.user.email = user_data.email;
          if (user_data.details != null) {
            this.user.details=user_data.details;
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    updateUser() {
      this.errors=Array();
      this.$http
        .post("https://eshop.test/api/updateUser", this.user)
        .then((response) => {
          this.user = response.data.data[0];
        })
        .catch((error) => {
          if (error.response.status === 422) {
            const validationErrors = error.response.data.errors;
            this.errors = validationErrors;
            console.log(this.errors);
          }
        });
    },
  },
};
</script>
<style scoped>
.card-user .image img {
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}
.card {
  border-radius: 12px;
  box-shadow: 0 6px 10px -4px rgb(0 0 0 / 15%);
  background-color: #ffffff;
  color: #252422;
  margin-bottom: 20px;
  position: relative;
  border: 0 none;
  transition: transform 300ms cubic-bezier(0.34, 2, 0.6, 1),
    box-shadow 200ms ease;
}
.card-user .avatar {
  width: 124px;
  height: 124px;
  border: 1px solid #ffffff;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 15px;
}
.card-user .author {
  text-align: center;
  text-transform: none;
  margin-top: -77px;
}
.card-user .card-body {
}
.card-user .image {
  height: 100px;
}
img {
  max-width: 100%;
  border-radius: 3px;
}
.card-footer h5.balance {
  text-align: center;
  display: block;
}
.card footer {
}
.errorText {
  color: red;
}
</style>
