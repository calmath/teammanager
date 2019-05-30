/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import squidexApi from 'api/squidexApi'
import {AppInsights} from 'applicationinsights-js'

const state = { profileId: localStorage.getItem('teammanager-profileId'), profile: localStorage.getItem('teammanager-profile') || {}, status: '' }

const getters = {
  isAuthenticated: state => !!state.profileId,
  authStatus: state => state.status,
  profileId: state => state.profileId,
}

const actions = {
  [AUTH_REQUEST]: ({commit}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      squidexApi.authenticateMember(user)
      .then(profile => {
        if (profile) {
          localStorage.setItem('teammanager-profile', profile)
          localStorage.setItem('teammanager-profileId', profile.id)
          AppInsights.setAuthenticatedUserContext(profile.id)
          commit(AUTH_SUCCESS, profile)
          resolve()
        } else {
          commit(AUTH_ERROR, 'User details incorrect')
          reject(new Error('User details incorrect'))
        }
      })
      .catch(err => {
        AppInsights.trackException(err)
        commit(AUTH_ERROR, err)
        localStorage.removeItem('teammanager-profile')
        localStorage.removeItem('teammanager-profileId')
        reject(err)
      })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('teammanager-profile')
      localStorage.removeItem('teammanager-profileId')
      AppInsights.clearAuthenticatedUserContext()
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, profile) => {
    state.status = 'success'
    state.profileId = profile.id
    state.profile = profile
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {}
    state.profileId = 0
    state.status = 'success'
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
