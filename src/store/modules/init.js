
import { INIT_REQUEST, INIT_ERROR, INIT_SUCCESS } from '../actions/init'
import squidexApi from 'api/squidexApi'
import Vue from 'vue'
import {AppInsights} from 'applicationinsights-js'

const state = { status: '', teamManagerToken: JSON.parse(localStorage.getItem('teammanager-token') || '{}') }

const getters = {
  getTeamManageToken: state => state.teamManagerToken,
  // TODO Check it's not expired...
  isTokenLoaded: state => !!state.teamManagerToken.access_token,
}

const actions = {
  [INIT_REQUEST]: ({commit, dispatch}) => {
    commit(INIT_REQUEST)
    squidexApi.getAccessToken()
      .then(resp => {
        localStorage.setItem('teammanager-token', JSON.stringify(resp))
        commit(INIT_SUCCESS, JSON.stringify(resp))
      })
      .catch(resp => {
        AppInsights.trackException(resp)
        commit(INIT_ERROR)
      })
  },
}

const mutations = {
  [INIT_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [INIT_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'teamManagerToken', resp)
  },
  [INIT_ERROR]: (state) => {
    state.status = 'error'
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
