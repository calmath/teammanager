<template>
  <div class="full-width">
    <div class="full-width">
      <button class="button" v-on:click="add">Add</button>
      <player-item v-for="(player, index) in players.players" :key="index" :player="player"/>
    </div>
  </div>
</template>

<style>
  .player {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .full-width {
    width: 100%;
  }
</style>

<script>
  import PlayerItem from './playerItem.vue'
  import playersApi from 'api/playersApi'
  import { mapGetters, mapState } from 'vuex'
  import {AppInsights} from 'applicationinsights-js'

  export default {
    name: 'players',
    components: {
      PlayerItem
    },
    data () {
      return {
        players: { total: 0, players: [] }
      }
    },
    computed: {
      ...mapGetters(['getTeamManagerToken', 'isTokenLoaded']),
      ...mapState({
        token: state => state.init.teamManagerToken,
      })
    },
    created () {
      AppInsights.trackPageView('Players Page', '/players')
      const { token } = this
      playersApi.authToken = token
      playersApi.list(token)
        .then(resp => {
          this.players = resp
        })
        .catch(resp => {
          AppInsights.trackException(resp)
        })
    },
    methods: {
      add: function () {
        this.players.players.push(playersApi.new())
      }
    }
  }
</script>