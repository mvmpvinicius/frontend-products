<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Products App</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link to="/">
            <b-button class="nav-buttons">Home</b-button>
          </router-link>
          <router-link v-if="isAuthenticated && user.role == 0" to="/products/create">
            <b-button class="nav-buttons">Create Products</b-button>
          </router-link>
          <router-link v-if="isAuthenticated && user.role == 1" to="/products/approve">
            <b-button class="nav-buttons">Approve Products</b-button>
          </router-link>
          <router-link v-if="isAuthenticated" to="/products">
            <b-button class="nav-buttons">Available Products</b-button>
          </router-link>
          <router-link v-if="!isAuthenticated" to="/login">
            <b-button class="nav-buttons">Login</b-button>
          </router-link>
        </b-navbar-nav>

        <b-navbar-nav v-if="isAuthenticated" class="ml-auto">
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>{{ user.name }}</em>
            </template>
            <b-dropdown-item @click="logout" href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters('auth', {
      isAuthenticated: 'isAuthenticated',
      user: 'currentUser'
    })
  },
  methods: {
    logout() {
      let vm = this;
      this.$store
        .dispatch('auth/logout')
        .then(() => {
          if (vm.$route.name !== 'Home')
            vm.$router.push({name: 'Home'})
        });
    }
  }
}
</script>

<style>
  .nav-buttons {
    color: #fff;
    background-color: #ffffff00 !important;
    border-color: #ffffff00 !important;
  }

  .nav-buttons:focus, .nav-buttons.focus {
    color: #fff;
    background-color: #118395 !important;
    border-color: #118395 !important;
    box-shadow: 0 0 0 0.2rem #118395 !important;
  }
</style>
