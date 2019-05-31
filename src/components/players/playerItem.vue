<template>
  <div>
    <div class="player-item" v-if="!editting">
      <div class="box">{{ player.firstname + ' ' + player.lastname }}</div>
      <div class="box">£{{ player.balance.toFixed(2) }}</div>
      <div class="box">
        <button class="button" v-on:click="edit">Edit</button>
      </div>
    </div>
    <div class="match-item" v-if="editting">
      <form class="register" @submit.prevent="update">
        <div class="box">
          <input required v-model="player.firstname" type="text"/>
        </div>
        <div class="box">
          <input required v-model="player.lastname" type="text"/>
        </div>
        <div class="box">
          <input required v-model="player.balance" type="text"/>
        </div>
        <div class="box">
        <button class="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .player-item {
    padding: 1em;
    width: 100%;
    display: grid;
    grid-template-columns: 25% 10% 10%;
    grid-gap: 1px;
    background-color: #fff;
    color: #444;
  }
  .box {
    /*background-color: #444;*/
    /*color: #fff;*/
    /*border-radius: 5px;*/
    /*padding: 20px;*/
    /*font-size: 150%;*/
  }
</style>
<script>
  import playersApi from 'api/playersApi'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'playerItem',
    props: {player: Object},
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
      },
      update: function () {
        const { token } = this
        playersApi.authToken = token
        if (this.player.id) {
          playersApi.update(this.player).then(() => {
            this.editting = false
          })
        } else {
          playersApi.create(this.player).then(() => {
            this.editting = false
          })
        }
      }
    }
  }
</script>
