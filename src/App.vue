<template>
  <div id="app">
    <navigation/>
    <div class="main-container">
      <center-container>
        <router-view/>
      </center-container>
    </div>
    <sqreen-footer/>
  </div>
</template>

<script>
import Navigation from 'components/navigation'
import { INIT_REQUEST } from 'actions/init'
// import { PROFILE_REQUEST } from 'actions/auth'
import SqreenFooter from './components/footer/index.vue'

export default {
  data () {
    return {
      intervalId: ''
    }
  },
  components: {
    SqreenFooter,
    Navigation },
  name: 'app',
  created: function () {
    if (!this.$store.getters.isTokenLoaded) {
      this.$store.dispatch(INIT_REQUEST).then(() => {
        if (this.$store.getters.isAuthenticated) {
          // var token = this.$store.getters.getSquidexToken
          // var id = this.$store.getters.profileId
          // this.$store.dispatch(PROFILE_REQUEST, { id, token })
        }
      })
    } else {
      if (this.$store.getters.isAuthenticated) {
        // var token = this.$store.getters.getSquidexToken
        // var id = this.$store.getters.profileId
        // this.$store.dispatch(PROFILE_REQUEST, { id, token })
      }
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    color: #2e426b;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
</style>

<style scoped>
  .main-container {
    min-height: calc(100vh - 70px);
  }
</style>
