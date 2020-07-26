<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col>
          <HelloWorld msg="Welcome to Products App"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
  .home {
    margin-top: 2em;
    text-align: center;
  }
</style>