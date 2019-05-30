<template>
  <div>
    <div class="match-item" v-if="!editting">
        <div class="box">
        {{ match.date }}
        </div>
        <div class="box">
        {{ match.player }}
        </div>
        <div class="box">
        {{ match.result }}
        </div>
        <div class="box">
        {{ match.isprimary }}
        </div>
        <div class="box">
        {{ match.subs }}
        </div>
        <div class="box">
        <button class="button" v-on:click="edit">Edit</button>
        </div>
    </div>
    <div class="match-item" v-if="editting">
      <form class="register" @submit.prevent="update">
        <div class="box">
          <input required v-model="displayDate" type="text"/>
        </div>
        <div class="box">
          <input required v-model="player" type="text"/>
        </div>
        <div class="box">
          <input required v-model="result" type="text"/>
        </div>
        <div class="box">
          <input required v-model="isprimary" type="text"/>
        </div>
        <div class="box">
          <input required v-model="subs" type="text"/>
        </div>
        <div class="box">
        <button class="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .match-item {
    padding: 1em;
    width: 100%;
    display: grid;
    grid-template-columns: 25% 25% 10% 10% 10% 20%;
    grid-gap: 1px;
    background-color: #fff;
    color: #444;
  }
</style>
<script>
  import matchesApi from 'api/matchesApi'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'matchItem',
    props: {match: Object},
    data () {
      return {
        editting: false
      }
    },
    computed: {
      ...mapGetters(['getTeamManagerToken', 'isTokenLoaded']),
      ...mapState({
        token: state => state.init.teamManagerToken,
      })
    },
    methods: {
      edit: function () {
        this.editting = true
        this.id = this.match.id
        this.date = this.match.date
        this.displayDate = this.match.displayDate
        this.player = this.match.player
        this.result = this.match.result
        this.isprimary = this.match.isprimary
        this.subs = this.match.subs
      },
      update: function () {
        const { id, displayDate, player, result, isprimary, subs, token } = this
        var dateParts = displayDate.split('/')
        var date = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + 'T00:00:00Z'
        matchesApi.authToken = token
        if (id) {
          matchesApi.update({ id, date, player, result, isprimary, subs }).then(() => {
            this.editting = false
          })
        } else {
          matchesApi.create({ date, player, result, isprimary, subs }).then(() => {
            this.editting = false
          })
        }
      }
    }
  }
</script>
