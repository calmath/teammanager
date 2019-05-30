<template>
  <div class="full-width">
    <div class="full-width">
      <button class="button" v-on:click="add">Add</button>
      <sub-item v-for="(sub, index) in subs.subs" :key="index" :sub="sub"/>
    </div>
  </div>
</template>

<style>
  .sub {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .full-width {
    width: 100%;
  }
</style>

<script>
  import SubItem from './subItem.vue'
  import subsApi from 'api/subsApi'
  import { mapGetters, mapState } from 'vuex'
  import {AppInsights} from 'applicationinsights-js'

  export default {
    name: 'subs',
    components: {
      SubItem
    },
    data () {
      return {
        subs: { total: 0, subs: [] }
      }
    },
    computed: {
      ...mapGetters(['getTeamManagerToken', 'isTokenLoaded']),
      ...mapState({
        token: state => state.init.teamManagerToken,
      })
    },
    created () {
      AppInsights.trackPageView('Subs Page', '/subs')
      const { token } = this
      subsApi.authToken = token
      subsApi.list(token)
        .then(resp => {
          this.subs = resp
        })
        .catch(resp => {
          AppInsights.trackException(resp)
        })
    },
    methods: {
      add: function () {
        this.subs.subs.push(subsApi.new())
      }
    }
  }
</script>