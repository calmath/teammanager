<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <div><span>{{error}}</span></div>
      <label>User name</label>
      <input required v-model="username" type="text" placeholder="Username"/>
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>
      <hr/>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style>
  .login {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
  }
</style>

<script>
  import {AUTH_REQUEST} from 'actions/auth'
  import { mapGetters, mapState } from 'vuex'
  import {AppInsights} from 'applicationinsights-js'

  export default {
    name: 'login',
    data () {
      return {
        username: 'mark.ames',
        password: 'pwd',
        error: 'None',
      }
    },
    created () {
      AppInsights.trackPageView('Login Page', '/auth')
    },
    computed: {
      ...mapGetters(['getTeamManagerToken', 'isTokenLoaded']),
      ...mapState({
        token: state => state.init.teamManagerToken,
      }),
    },
    methods: {
      login: function () {
        const { username, password, token } = this
        this.$store.dispatch(AUTH_REQUEST, { username, password, token }).then(() => {
          this.$router.push({path: '/'})
        })
        .catch(function (rej) {
          alert(rej)
          this.error = rej // TBD not being output fix
        })
      }
    },
  }
</script>
