<template>
  <div class="full-width">
    <loading v-if="loading"/>
    <div v-if="isAuthenticated" class="full-width">
      <match-item v-for="(match, index) in currentMatches.matches" :key="index" :match="match"/>
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
  .full-width {
    width: 100%;
  }
</style>

<script>
  import MatchItem from './matchItem.vue'
  import playersApi from 'api/playersApi'
  import matchesApi from 'api/matchesApi'
  // import subsApi from 'api/subsApi'
  import { mapGetters, mapState } from 'vuex'
  import {AppInsights} from 'applicationinsights-js'

  export default {
    name: 'home',
    components: {
      MatchItem
    },
    data () {
      return {
        players: { total: 0, players: [] },
        matches: { total: 0, matches: [] },
        currentMatches: { total: 0, matches: [] }
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'authStatus', 'getTeamManagerToken', 'isTokenLoaded']),
      ...mapState({
        token: state => state.init.teamManagerToken,
      }),
      loading: function () {
        return this.authStatus === 'loading' && !this.isAuthenticated
      },
    },
    created () {
      AppInsights.trackPageView('Home Page')
      // localStorage.removeItem('user-profile')
      const { token } = this
      playersApi.authToken = token
      playersApi.list(token)
        .then(resp => {
          this.players = resp
          matchesApi.authToken = token
          matchesApi.getTodays(token)
            .then(resp => {
              this.matches = resp

              this.players.players.forEach(
                player => {
                  var foundMatch = this.matches.matches.find(match => match.player[0] === player.id)
                  if (foundMatch) {
                    foundMatch.playerName = player.fullName
                    foundMatch.playerBalance = player.balance
                    this.currentMatches.matches.push(foundMatch)
                  } else {
                    var newMatch = matchesApi.new()
                    newMatch.player = [player.id]
                    newMatch.playerName = player.fullName
                    newMatch.playerBalance = player.balance
                    newMatch.subs = 0
                    this.currentMatches.matches.push(newMatch)
                  }
                }
              )
              this.currentMatches.total = this.currentMatches.matches.length
            })
            .catch(resp => {
              AppInsights.trackException(resp)
            })
        })
        .catch(resp => {
          AppInsights.trackException(resp)
        })
    },
    methods: {
    }
  }
</script>
