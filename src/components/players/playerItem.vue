<template>
  <div class="player-item">
    <div class="box">{{ player.firstname + ' ' + player.lastname }}</div>
    <div class="box" ref="subs">
      <button class="button" v-on:click="collectSubs">Collect Subs</button>
    </div>
    <div class="box" ref="parent">
      <button class="button" v-on:click="won">&#10003;</button>
      <button class="button" v-on:click="lost">&#10005;</button>
    </div>
  </div>
</template>

<style scoped>
  .player-item {
    padding: 1em;
    width: 100%;
    display: grid;
    grid-template-columns: 50% 25% 25%;
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
  export default {
    name: 'playerItem',
    props: {player: Object},
    methods: {
      collectSubs: function () {
        alert('Default subs collected for ' + this.player.firstname)
        this.$refs.subs.innerHTML = 'Paid'
      },
      won: function () {
        alert(this.player.firstname + ' won')
        this.$refs.parent.innerHTML = 'Won'
      },
      lost: function () {
        alert(this.player.firstname + ' lost')
        this.$refs.parent.innerHTML = 'Lost'
      }
    }
  }
</script>
