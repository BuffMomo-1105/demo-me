<template>
  <div class="login-container">
    <h1 class="font-semibold text-2xl">Hop into your account</h1>
    <v-form ref="form" v-model="valid" lazy-validation class="mt-8">
      <v-text-field
        v-model="form.email"
        :rules="rules.email"
        label="E-mail"
        required
        class="mb-4"
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        :rules="rules.password"
        :type="showPassword ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        counter
      ></v-text-field>
      <div class="flex justify-between items-center	mt-8">
          <v-btn class="ma-2" outlined @click="submitForm"> Login </v-btn>
            <router-link to="/register">Register</router-link>
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
import { Meteor } from 'meteor/meteor';

export default {
  
  data: () => ({
    valid: true,
    showPassword: false,
    form: {
      email: "",
      password: "",
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
    },
  }),

  methods: {
    submitForm() {
      Meteor.loginWithPassword(this.form.email, this.form.password, (err) => {
        if (err) {
          console.log(err);
        } else {
          this.$router.push('/')
        }
      });
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
