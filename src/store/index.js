import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { sortStore } from './modules/sort'
import { favoritesStore } from './modules/favorites'

import { ITUNES_TOP_ALBUMS_LIST } from '@/constants/urls'

Vue.use(Vuex)

export const state = {
  ...favoritesStore.state,
  topAlbums: [],
  unalteredAlbums: []
}

export const mutations = {
  setAlbums: (state, payload) => { state.topAlbums = payload },
  setUnalteredAlbums: (state, payload) => { state.unalteredAlbums = payload },
  setFavoriteAlbums: (state, payload) => { state.favoriteAlbums = payload }
}

export const actions = {
  ...sortStore.actions,
  ...favoritesStore.actions,
  init: async ({ dispatch }) => {
    await dispatch('fetchTopAlbums')
    dispatch('checkForFavorites')
  },

  fetchTopAlbums: async ({ commit }) => {
    await axios.get(ITUNES_TOP_ALBUMS_LIST)
      .then((response) => {
        commit('setUnalteredAlbums', response.data.feed.entry)
        commit('setAlbums', response.data.feed.entry)
      })
      .catch((error) => {
        // NOTE: this is where an error logger would be utilized to capture this error,
        // but for the purposes of this challenge, we will just console.log the error
        console.log(error)
      })
  },

  updateSearch: ({ commit, getters }, searchTerm) => {
    if (searchTerm === null) {
      commit('setAlbums', getters.unalteredAlbums)
    } else {
      const foundAlbum = getters.unalteredAlbums.find(album => {
        return album['im:artist'].label === searchTerm || album['im:name'].label === searchTerm
      })
      commit('setAlbums', [foundAlbum])
    }
  }
}

export const getters = {
  ...favoritesStore.getters,
  topAlbums: state => { return state.topAlbums },
  unalteredAlbums: state => { return state.unalteredAlbums }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
