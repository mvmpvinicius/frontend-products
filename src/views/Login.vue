<template>
  <div class="login">
    <b-row>
      <b-col></b-col>
      <b-col>
        <b-form v-on:submit.prevent="onSubmit(form.email, form.password)">

          <b-form-group
            label="E-Mail"
            label-for="email-input">
            <b-form-input
              id="email-input"
              v-model="form.email"
              type="email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Password"
            label-for="password-input">
            <b-form-input
              id="password-input"
              v-model="form.password"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch('auth/login', {
          email: this.form.email,
          password: this.form.password
        })
        .then(() => {
          this.$router.push({name: 'Home'})
        })
    }
  }
}
</script>

<style scoped>
  .login {
    margin-top: 2em;
  }
</style>
