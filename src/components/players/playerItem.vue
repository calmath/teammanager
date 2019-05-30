<template>
  <div class="player-item">
    <div class="box">{{ player.firstname + ' ' + player.lastname }}</div>
    <div class="box">
      <button class="button">Collect Subs</button>
    </div>
    <div class="box">
      <button class="button">&#10003;</button>
      <button class="button">&#10005;</button>
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
  }
</script>
