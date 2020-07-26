<template>
  <div class="products-approve">
    <b-container>
      <b-alert 
        :show="dismissCountDown"
        dismissible
        variant="success"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged">{{ alertText }}</b-alert>
      <b-row>
        <b-col>
          <b-table striped hover :items="items" :fields="fields" :busy="isBusy">

            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            
            <template v-slot:cell(actions)="row">
              <b-button size="sm" @click="approve(row.item.id)" class="mr-2">
                Approve
              </b-button>
            </template>

          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'ProductsApprove',
  components: {},
  data() {
    return {
      isBusy: true,
      alertText: '',
      dismissSecs: 3,
      dismissCountDown: 0,
      fields: ['id', 'name', 'description', 'actions'],
      items: []
    }
  },
  created: function () {
    this.$store
      .dispatch('products/getProducts')
      .then((res) => {
        this.items = res.products.filter((item) => {
          return item.status == 0
        })
        this.isBusy = false
      })
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert(text) {
      this.alertText = text
      this.dismissCountDown = this.dismissSecs
    },
    approve(id) {
      this.$store
        .dispatch('products/approveProduct', {
          id: id
        })
        .then((res) => {
          // Remove item from list
          this.items.forEach((item, index, arr) => {
            if (item.id == res.product.id) {
              arr.splice(index, 1)
            }
          })
          
          this.showAlert(`Product ${res.product.name} approved with Success`)
        })
    }
  }
}
</script>

<style scoped>
  .products-approve {
    margin-top: 2em;
  }
</style>
