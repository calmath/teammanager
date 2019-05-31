<template>
  <div>
    <div class="match-item">
      <div class="box">
        {{ match.playerName }}
      </div>
      <div class="box" ref="parent" v-if="match.result === null">
        <button class="button" v-on:click="won">&#10003;</button>
        <button class="button" v-on:click="lost">&#10005;</button>
      </div>
      <div class="box" ref="parent" v-else>
        <span v-if="match.result">Won</span>
        <span v-else>Lost</span>
      </div>
      <div class="box" ref="subs" v-if="match.subs === 0">
        <button class="button" v-on:click="collectSubs">+</button>
      </div>
      <div class="box" ref="subs" v-else>Paid</div>
      <div>
        £{{ match.playerBalance.toFixed(2) }}
        <button class="button" v-on:click="adjustPlayerBalance(false)">-</button>
        <button class="button" v-on:click="adjustPlayerBalance">+</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .match-item {
    padding: 1em;
    width: 100%;
    display: grid;
    grid-template-columns: 20% 5% 5% 10%;
    grid-gap: 1px;
    background-color: #fff;
    color: #444;
  }
</style>
<script>
  import playersApi from 'api/playersApi'
  import matchesApi from 'api/matchesApi'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'matchItem',
    props: {match: Object},
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters(['getTeamManagerToken', 'isTokenLoaded']),
      ...mapState({
        token: state => state.init.teamManagerToken,
      })
    },
    methods: {
      collectSubs: function () {
        this.$refs.subs.innerHTML = 'Paid'
        this.match.subs = 2.5
        this.update(this.match)
      },
      won: function () {
        this.$refs.parent.innerHTML = 'Won'
        this.match.result = true
        this.match.isprimary = true
        this.update(this.match)
      },
      lost: function () {
        this.$refs.parent.innerHTML = 'Lost'
        this.match.result = false
        this.match.isprimary = true
        this.update(this.match)
      },
      adjustPlayerBalance: function (credit = true) {
        const { token } = this
        var amount = 2.5
        if (!credit) amount = -2.5
        // disable buttons
        playersApi.authToken = token
        playersApi.updateBalance(this.match.player, amount).then(() => {
          this.match.playerBalance += amount
          // enable buttons
        })
      },
      update: function (match) {
        const { token } = this
        var dateParts = match.displayDate.split('/')
        match.date = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + 'T00:00:00Z'
        matchesApi.authToken = token
        // disable actions
        if (match.id) {
          matchesApi.update(match).then(() => {
            // enable actions
          })
        } else {
          matchesApi.create(match).then((resp) => {
            this.match.id = resp.id
            // enable actions
          })
        }
      }
    }
  }
</script>
