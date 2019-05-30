<template>
  <div class="full-width">
    <div class="full-width">
      <button class="button" v-on:click="add">Add</button>
      <match-item v-for="(match, index) in matches.matches" :key="index" :match="match"/>
    </div>
  </div>
</template>

<style>
  .match {
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
  import matchesApi from 'api/matchesApi'
  import { mapGetters, mapState } from 'vuex'
  import {AppInsights} from 'applicationinsights-js'

  export default {
    name: 'matches',
    components: {
      MatchItem
    },
    data () {
      return {
        matches: { total: 0, matches: [] }
      }
    },
    computed: {
      ...mapGetters(['getTeamManagerToken', 'isTokenLoaded']),
      ...mapState({
        token: state => state.init.teamManagerToken,
      })
    },
    created () {
      AppInsights.trackPageView('Matches Page', '/matches')
      const { token } = this
      matchesApi.authToken = token
      matchesApi.list(token)
        .then(resp => {
          this.matches = resp
        })
        .catch(resp => {
          AppInsights.trackException(resp)
        })
    },
    methods: {
      add: function () {
        this.matches.matches.push(matchesApi.new())
      }
    }
  }
</script>