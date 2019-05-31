<template>
  <div>
    <div class="sub-item" v-if="!editting">
        <div class="box">
        {{ sub.displayDate }}
        </div>
        <div class="box">
        {{ sub.amount }}
        </div>
        <div class="box">
        {{ sub.active }}
        </div>
        <div class="box">
        <button class="button" v-on:click="edit">Edit</button>
        </div>
    </div>
    <div class="sub-item" v-if="editting">
      <form class="register" @submit.prevent="update">
        <div class="box">
          <input required v-model="sub.displayDate" type="text"/>
        </div>
        <div class="box">
          <input required v-model="sub.amount" type="text"/>
        </div>
        <div class="box">
          <input required v-model="sub.active" type="text"/>
        </div>
        <div class="box">
        <button class="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .sub-item {
    padding: 1em;
    width: 100%;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-gap: 1px;
    background-color: #fff;
    color: #444;
  }
</style>
<script>
  import subsApi from 'api/subsApi'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'subItem',
    props: {sub: Object},
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
        // convert displayDate to effectivedate 'dd/mm/yyyy'
        var dateParts = displayDate.split('/')
        this.sub.effectivedate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + 'T00:00:00Z'
        subsApi.authToken = token
        if (this.sub.id) {
          subsApi.update(this.sub).then(() => {
            this.editting = false
          })
        } else {
          subsApi.create(this.sub).then(() => {
            this.editting = false
          })
        }
      }
    }
  }
</script>
