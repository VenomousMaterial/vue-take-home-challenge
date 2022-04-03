import {
  DEFAULT,
  PRICE_LOW_TO_HIGH,
  PRICE_HIGH_TO_LOW,
  RELEASE_DATE_NEW_TO_OLD,
  RELEASE_DATE_OLD_TO_NEW,
  MY_FAVORITES
} from '@/constants/sortOptions'

export const sortStore = {
  actions: {
    updateSort: ({ dispatch }, option) => {
      switch (option) {
        case DEFAULT:
          dispatch('sortAlbumsByDefault')
          break
        case PRICE_LOW_TO_HIGH:
          dispatch('sortAlbumsByLowPrice')
          break
        case PRICE_HIGH_TO_LOW:
          dispatch('sortAlbumsByHighPrice')
          break
        case RELEASE_DATE_NEW_TO_OLD:
          dispatch('sortAlbumsBySoonestRelease')
          break
        case RELEASE_DATE_OLD_TO_NEW:
          dispatch('sortAlbumsByOldestRelease')
          break
        case MY_FAVORITES:
          dispatch('sortAlbumsByFavorite')
          break
      }
    },

    sortAlbumsByDefault: ({ commit, getters }) => { commit('setAlbums', getters.unalteredAlbums) },

    sortAlbumsByLowPrice: ({ getters, commit }) => {
      const albumsOrderedByLowPrice = [...getters.unalteredAlbums].sort((album1, album2) => {
        return album1['im:price'].attributes.amount - album2['im:price'].attributes.amount
      })
      commit('setAlbums', albumsOrderedByLowPrice)
    },

    sortAlbumsByHighPrice: ({ getters, commit }) => {
      const albumsOrderedByHighPrice = [...getters.unalteredAlbums].sort((album1, album2) => {
        return album2['im:price'].attributes.amount - album1['im:price'].attributes.amount
      })
      commit('setAlbums', albumsOrderedByHighPrice)
    },

    sortAlbumsBySoonestRelease: ({ getters, commit }) => {
      const albumsOrderedByNewDate = [...getters.unalteredAlbums].sort((album1, album2) => {
        const date1 = new Date(album1['im:releaseDate'].label)
        const date2 = new Date(album2['im:releaseDate'].label)
        return date2 - date1
      })
      commit('setAlbums', albumsOrderedByNewDate)
    },

    sortAlbumsByOldestRelease: ({ getters, commit }) => {
      const albumsOrderedByOldDate = [...getters.unalteredAlbums].sort((album1, album2) => {
        const date1 = new Date(album1['im:releaseDate'].label)
        const date2 = new Date(album2['im:releaseDate'].label)
        return date1 - date2
      })
      commit('setAlbums', albumsOrderedByOldDate)
    },

    sortAlbumsByFavorite: ({ getters, commit }) => {
      const onlyFavoriteAlbums = [...getters.unalteredAlbums]
        .filter(album => {
          return getters.favoriteAlbums.includes(album.id.attributes['im:id'])
        })
        .sort((album1, album2) => {
          const favortesIndex1 = getters.favoriteAlbums.indexOf(album1.id.attributes['im:id'])
          const favortesIndex2 = getters.favoriteAlbums.indexOf(album2.id.attributes['im:id'])
          return favortesIndex1 - favortesIndex2
        })
      commit('setAlbums', onlyFavoriteAlbums)
    }
  }
}
