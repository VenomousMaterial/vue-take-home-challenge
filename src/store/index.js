import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

// const ITUNES_TOP_ALBUMS_LIST = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json'
// import { ITUNES_TOP_ALBUMS_LIST } from '@/constants/urls'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    getTopAlbums: async () => {
      console.log('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
      await axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          // NOTE: this is where an error logger would be utilized to capture this error,
          // but for the purposes of this challenge, we will just console.log the error
          console.log(error)
        })
    }
  },
  modules: {
  }
})
