<template>
  <div class="products-view">
    <b-container>
      <b-row>
        <b-col>
          <b-table 
            striped hover 
            :items="items" 
            :fields="fields" 
            :busy="isBusy">
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'ProductsView',
  components: {},
  data() {
    return {
      isBusy: true,
      fields: ['id', 'name', 'description'],
      items: []
    }
  },
  created: function () {
    this.$store
      .dispatch('products/getProducts')
      .then((res) => {
        this.items = res.products.filter((item) => {
          return item.status == 1
        })
        this.isBusy = false
      })
  },
  methods: {}
}
</script>

<style scoped>
  .products-view {
    margin-top: 2em;
    /* width: 98%; */
  }
</style>
