import { actions } from '../src/store/index'

let myCommit
const setItem = jest.spyOn(Storage.prototype, 'setItem')
const getItem = jest.spyOn(Storage.prototype, 'getItem')

beforeEach(() => {
  // reset before each test
  myCommit = jest.fn()
})

describe('store actions', () => {
  const testAlbumId = 1234
  describe('checkForFavorites', () => {
    it('Should check localstorage for saved favorites array', () => {
      actions.checkForFavorites({ commit: myCommit })

      expect(getItem).toHaveBeenCalledWith('favoriteAlbums')
    })
  })

  describe('addAlbumToFavorites', () => {
    const myGetters = {
      favoriteAlbums: [1111]
    }
    const expectedResult = [...myGetters.favoriteAlbums, testAlbumId]
    it('Should add an album id to the favorites array and save to localstorage', () => {
      actions.addAlbumToFavorites({ commit: myCommit, getters: myGetters }, testAlbumId)

      expect(myCommit).toHaveBeenCalledWith('setFavoriteAlbums', expectedResult)

      expect(setItem).toHaveBeenCalledWith('favoriteAlbums', expectedResult)
    })
  })

  describe('removeAlbumFromFavorites', () => {
    const myGetters = {
      favoriteAlbums: [1111, testAlbumId]
    }
    const expectedResult = [myGetters.favoriteAlbums[0]]

    it('Should remove the correct albumID from the favorites array, and save that to the store and localstorage', () => {
      actions.removeAlbumFromFavorites({ commit: myCommit, getters: myGetters }, testAlbumId)

      expect(myCommit).toHaveBeenCalledWith('setFavoriteAlbums', expectedResult)

      expect(setItem).toHaveBeenCalledWith('favoriteAlbums', expectedResult)
    })
  })
})
