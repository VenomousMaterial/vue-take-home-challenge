export const favoritesStore = {
  state: {
    favoriteAlbums: []
  },

  actions: {
    checkForFavorites: ({ commit }) => {
      let favorites = localStorage.getItem('favoriteAlbums')
      if (favorites) {
        favorites = favorites.split(',')
        commit('setFavoriteAlbums', favorites)
      }
    },

    addAlbumToFavorites: ({ getters, commit }, albumId) => {
      const favorites = [...getters.favoriteAlbums]
      favorites.push(albumId)
      commit('setFavoriteAlbums', favorites)
      localStorage.setItem('favoriteAlbums', favorites)
    },

    removeAlbumFromFavorites: ({ getters, commit }, albumId) => {
      const favorites = [...getters.favoriteAlbums]
      const index = favorites.indexOf(albumId)
      favorites.splice(index, 1)
      commit('setFavoriteAlbums', favorites)
      localStorage.setItem('favoriteAlbums', favorites)
    }
  },

  getters: {
    favoriteAlbums: state => { return state.favoriteAlbums }
  }
}
