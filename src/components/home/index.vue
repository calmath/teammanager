<template>
  <div>
    <loading v-if="loading"/>
    <div v-if="isAuthenticated">
      Authenticated
    </div>
    <div v-if="!isAuthenticated && authStatus !== 'loading'">
      <h1>Splash screen</h1>
      <p>Push the user off to register or login</p>
      <p>Need to add in auto login - remember me</p>
    </div>
  </div>
</template>

<style>
  .home {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  import {AppInsights} from 'applicationinsights-js'

  export default {
    name: 'home',
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'authStatus']),
      loading: function () {
        return this.authStatus === 'loading' && !this.isAuthenticated
      },
    },
    created () {
      AppInsights.trackPageView('Home Page')
      // localStorage.removeItem('user-profile')
    },
    methods: {
    }
  }
</script>
