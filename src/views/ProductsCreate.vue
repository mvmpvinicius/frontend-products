<template>
  <div class="products-create">
    <b-container>
      <b-alert 
        :show="dismissCountDown"
        dismissible
        variant="success"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged">{{ alertText }}</b-alert>
      <b-row>
        <b-col></b-col>
        <b-col>
          <b-form v-on:submit.prevent="onSubmit(form.name, form.description)">

            <b-form-group
              label="Name"
              label-for="name-input">
              <b-form-input
                id="name-input"
                v-model="form.name"
                required
              ></b-form-input>
            </b-form-group>
            
            <b-form-group
              label="Description"
              label-for="description-input">
              <b-form-input
                id="description-input"
                v-model="form.description"
                required
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'ProductsCreate',
  components: {},
  data() {
    return {
      alertText: '',
      dismissSecs: 3,
      dismissCountDown: 0,
      form: {
        name: '',
        description: ''
      }
    }
  },
  created: function () {},
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert(text) {
      this.alertText = text
      this.dismissCountDown = this.dismissSecs
    },
    onSubmit() {
      this.$store
        .dispatch('products/createProduct', {
          name: this.form.name,
          description: this.form.description
        })
        .then((res) => {
          this.form.name = ''
          this.form.description = ''
          this.showAlert(`Product ${res.product.name} created with Success`)
        })
    }
  }
}
</script>

<style scoped>
  .products-create {
    margin-top: 2em;
  }
</style>
