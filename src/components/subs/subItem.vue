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
          <input required v-model="displayDate" type="text"/>
        </div>
        <div class="box">
          <input required v-model="amount" type="text"/>
        </div>
        <div class="box">
          <input required v-model="active" type="text"/>
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
        this.id = this.sub.id
        this.effectivedate = this.sub.effectivedate
        this.displayDate = this.sub.displayDate
        this.amount = this.sub.amount
        this.active = this.sub.active
      },
      update: function () {
        const { id, displayDate, amount, active, token } = this
        // convert displayDate to effectivedate 'dd/mm/yyyy'
        var dateParts = displayDate.split('/')
        var effectivedate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + 'T00:00:00Z'
        subsApi.authToken = token
        if (id) {
          subsApi.update({ id, effectivedate, amount, active }).then(() => {
            this.editting = false
          })
        } else {
          subsApi.create({ effectivedate, amount, active }).then(() => {
            this.editting = false
          })
        }
      }
    }
  }
</script>
