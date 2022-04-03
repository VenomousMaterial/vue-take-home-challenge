import { actions } from '../src/store/index'

let myDispatch, myCommit

beforeEach(() => {
  // reset before each test
  myCommit = jest.fn()
  myDispatch = jest.fn()
})

describe('store actions', () => {
  describe('init', () => {
    it('Should initialize the app by calling two dispatches', async () => {
      await actions.init({ dispatch: myDispatch })

      expect(myDispatch).toHaveBeenCalledWith('fetchTopAlbums')
      expect(myDispatch).toHaveBeenCalledWith('checkForFavorites')
    })
  })

  describe('fetchTopAlbums', () => {
    it('Should return the top albums from the store state', async () => {
      await actions.fetchTopAlbums({ commit: myCommit })

      expect(myCommit).toHaveBeenCalledWith('setUnalteredAlbums', expect.any(Array))
      expect(myCommit).toHaveBeenCalledWith('setAlbums', expect.any(Array))
    })
  })

  describe('updateSearch', () => {
    const testSearchTitle = 'testTitle'
    const testSearchArtist = 'testArtist'
    const myGetters = {
      unalteredAlbums: [
        { 'im:name': { label: testSearchTitle }, 'im:artist': { label: 'incorrect artist' } },
        { 'im:name': { label: 'incorrect title' }, 'im:artist': { label: testSearchArtist } }
      ]
    }
    it('Should find a single album by artist', () => {
      actions.updateSearch({ commit: myCommit, getters: myGetters }, testSearchArtist)

      expect(myCommit).toHaveBeenCalledWith('setAlbums', [myGetters.unalteredAlbums[1]])
    })
    it('Should find a single album by title', () => {
      actions.updateSearch({ commit: myCommit, getters: myGetters }, testSearchTitle)

      expect(myCommit).toHaveBeenCalledWith('setAlbums', [myGetters.unalteredAlbums[0]])
    })
    it('Should set top albums as unalteredAlbums when searchTerm is null', () => {
      actions.updateSearch({ commit: myCommit, getters: myGetters }, null)

      expect(myCommit).toHaveBeenCalledWith('setAlbums', myGetters.unalteredAlbums)
    })
  })
})
