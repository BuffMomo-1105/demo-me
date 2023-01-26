<template>
  <div class="login-container">
    <h1 class="font-semibold text-2xl">Create your account</h1>
    <v-form ref="form" v-model="valid" lazy-validation class="mt-8">
      <v-text-field
        v-model="form.email"
        :rules="rules.email"
        label="E-mail"
        required
        class="mb-4"
      ></v-text-field>
      <v-text-field
        v-model="form.name"
        :rules="rules.name"
        label="Name"
        required
        class="mb-4"
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        :rules="rules.password"
        type="password"
        name="input-10-1"
        label="Password"
        counter
      ></v-text-field>
      <div class="flex justify-between items-center mt-8">
        <v-btn class="ma-2" outlined @click="createUser"> Register </v-btn>
        <router-link to="/login">Login</router-link>
      </div>
      <!-- <v-btn
        :disabled="!valid"
        class="mr-4"
        @click="validate"
      >
        Validate
      </v-btn>
  
      <v-btn
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>
  
      <v-btn
        @click="resetValidation"
      >
        Reset Validation
      </v-btn> -->
    </v-form>
  </div>
</template>

<script>
import { Accounts } from "meteor/accounts-base";

export default {
  data: () => ({
    valid: true,
    showPassword: false,
    form: {
      email: "",
      password: "",
      name: "",
    },
    rules: {
      email: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Min 8 characters",
      ],
      name: [(v) => !!v || "Name is required"],
    },
  }),

  methods: {
    createUser() {
      this.$refs.form.validate();
      Accounts.createUser(
        {
          ...this.form,
        },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("User created!");
          }
        }
      );
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style>
.login-container {
  width: 55%;
  min-width: 500px;
  margin: 0 auto;
  padding: 50px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 4em;
}
.error--text {
  color: red !important;
}
</style>
