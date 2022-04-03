import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import { ITUNES_TOP_ALBUMS_LIST } from '@/constants/urls'
import {
  DEFAULT,
  PRICE_LOW_TO_HIGH,
  PRICE_HIGH_TO_LOW,
  RELEASE_DATE_NEW_TO_OLD,
  RELEASE_DATE_OLD_TO_NEW,
  MY_FAVORITES
} from '@/constants/sortOptions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topAlbums: [],
    unalteredAlbums: [],
    favoriteAlbums: []
  },

  mutations: {
    setAlbums: (state, payload) => { state.topAlbums = payload },
    setUnalteredAlbums: (state, payload) => { state.unalteredAlbums = payload },
    setFavoriteAlbums: (state, payload) => { state.favoriteAlbums = payload }
  },

  actions: {
    init: async (store) => {
      await store.dispatch('fetchTopAlbums')
      store.dispatch('checkForFavorites')
    },

    fetchTopAlbums: async (store) => {
      await axios.get(ITUNES_TOP_ALBUMS_LIST)
        .then((response) => {
          store.commit('setUnalteredAlbums', response.data.feed.entry)
          store.commit('setAlbums', response.data.feed.entry)
        })
        .catch((error) => {
          // NOTE: this is where an error logger would be utilized to capture this error,
          // but for the purposes of this challenge, we will just console.log the error
          console.log(error)
        })
    },

    checkForFavorites: (store) => {
      let favorites = localStorage.getItem('favoriteAlbums')
      if (favorites) {
        favorites = favorites.split(',')
        store.commit('setFavoriteAlbums', favorites)
      }
    },

    addAlbumToFavorites: (store, albumId) => {
      const favorites = [...store.getters.favoriteAlbums]
      favorites.push(albumId)
      store.commit('setFavoriteAlbums', favorites)
      localStorage.setItem('favoriteAlbums', favorites)
    },

    removeAlbumFromFavorites: (store, albumId) => {
      const favorites = [...store.getters.favoriteAlbums]
      const index = favorites.indexOf(albumId)
      favorites.splice(index, 1)
      store.commit('setFavoriteAlbums', favorites)
      localStorage.setItem('favoriteAlbums', favorites)
    },

    updateSort: (store, option) => {
      switch (option) {
        case DEFAULT:
          store.dispatch('sortAlbumsByDefault')
          break
        case PRICE_LOW_TO_HIGH:
          store.dispatch('sortAlbumsByLowPrice')
          break
        case PRICE_HIGH_TO_LOW:
          store.dispatch('sortAlbumsByHighPrice')
          break
        case RELEASE_DATE_NEW_TO_OLD:
          store.dispatch('sortAlbumsBySoonestRelease')
          break
        case RELEASE_DATE_OLD_TO_NEW:
          store.dispatch('sortAlbumsByOldestRelease')
          break
        case MY_FAVORITES:
          store.dispatch('sortAlbumsByFavorite')
          break
      }
    },

    updateSearch: (store, searchTerm) => {
      if (searchTerm === null) {
        store.commit('setAlbums', store.getters.unalteredAlbums)
      } else {
        const foundAlbum = store.getters.unalteredAlbums.find(album => {
          return album['im:artist'].label === searchTerm || album['im:name'].label === searchTerm
        })
        store.commit('setAlbums', [foundAlbum])
      }
    },

    sortAlbumsByDefault: (store) => { store.commit('setAlbums', store.getters.unalteredAlbums) },

    sortAlbumsByLowPrice: (store) => {
      const albumsOrderedByLowPrice = [...store.state.unalteredAlbums].sort((album1, album2) => {
        return album1['im:price'].attributes.amount - album2['im:price'].attributes.amount
      })
      store.commit('setAlbums', albumsOrderedByLowPrice)
    },

    sortAlbumsByHighPrice: (store) => {
      const albumsOrderedByHighPrice = [...store.state.unalteredAlbums].sort((album1, album2) => {
        return album2['im:price'].attributes.amount - album1['im:price'].attributes.amount
      })
      store.commit('setAlbums', albumsOrderedByHighPrice)
    },

    sortAlbumsBySoonestRelease: (store) => {
      const albumsOrderedByNewDate = [...store.state.unalteredAlbums].sort((album1, album2) => {
        const date1 = new Date(album1['im:releaseDate'].label)
        const date2 = new Date(album2['im:releaseDate'].label)
        return date2 - date1
      })
      store.commit('setAlbums', albumsOrderedByNewDate)
    },

    sortAlbumsByOldestRelease: (store) => {
      const albumsOrderedByOldDate = [...store.state.unalteredAlbums].sort((album1, album2) => {
        const date1 = new Date(album1['im:releaseDate'].label)
        const date2 = new Date(album2['im:releaseDate'].label)
        return date1 - date2
      })
      store.commit('setAlbums', albumsOrderedByOldDate)
    },

    sortAlbumsByFavorite: (store) => {
      const onlyFavoriteAlbums = [...store.state.unalteredAlbums]
        .filter(album => {
          return store.getters.favoriteAlbums.includes(album.id.attributes['im:id'])
        })
        .sort((album1, album2) => {
          const favortesIndex1 = store.getters.favoriteAlbums.indexOf(album1.id.attributes['im:id'])
          const favortesIndex2 = store.getters.favoriteAlbums.indexOf(album2.id.attributes['im:id'])
          return favortesIndex1 - favortesIndex2
        })
      store.commit('setAlbums', onlyFavoriteAlbums)
    }
  },

  getters: {
    topAlbums: state => { return state.topAlbums },
    unalteredAlbums: state => { return state.unalteredAlbums },
    favoriteAlbums: state => { return state.favoriteAlbums }
  }
})
