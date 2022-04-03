import { actions } from '../src/store/index'

import {
  DEFAULT,
  PRICE_LOW_TO_HIGH,
  PRICE_HIGH_TO_LOW,
  RELEASE_DATE_NEW_TO_OLD,
  RELEASE_DATE_OLD_TO_NEW,
  MY_FAVORITES
} from '@/constants/sortOptions'

let myDispatch

beforeEach(() => {
  // reset before each test
  myDispatch = jest.fn()
})

describe('store actions', () => {
  describe('updateSort', () => {
    describe('should call the correct sort method based on the input', () => {
      it('DEFAULT input should call sortAlbumsByDefault', () => {
        actions.updateSort({ dispatch: myDispatch }, DEFAULT)
        expect(myDispatch).toHaveBeenCalledWith('sortAlbumsByDefault')
      })
      it('PRICE_LOW_TO_HIGH input should call sortAlbumsByDefault', () => {
        actions.updateSort({ dispatch: myDispatch }, PRICE_LOW_TO_HIGH)
        expect(myDispatch).toHaveBeenCalledWith('sortAlbumsByLowPrice')
      })
      it('PRICE_HIGH_TO_LOW input should call sortAlbumsByDefault', () => {
        actions.updateSort({ dispatch: myDispatch }, PRICE_HIGH_TO_LOW)
        expect(myDispatch).toHaveBeenCalledWith('sortAlbumsByHighPrice')
      })
      it('RELEASE_DATE_NEW_TO_OLD input should call sortAlbumsByDefault', () => {
        actions.updateSort({ dispatch: myDispatch }, RELEASE_DATE_NEW_TO_OLD)
        expect(myDispatch).toHaveBeenCalledWith('sortAlbumsBySoonestRelease')
      })
      it('RELEASE_DATE_OLD_TO_NEW input should call sortAlbumsByDefault', () => {
        actions.updateSort({ dispatch: myDispatch }, RELEASE_DATE_OLD_TO_NEW)
        expect(myDispatch).toHaveBeenCalledWith('sortAlbumsByOldestRelease')
      })
      it('MY_FAVORITES input should call sortAlbumsByDefault', () => {
        actions.updateSort({ dispatch: myDispatch }, MY_FAVORITES)
        expect(myDispatch).toHaveBeenCalledWith('sortAlbumsByFavorite')
      })
    })
  })

  // Future improvements would incldue tests for the rest of these methods

  describe('sortAlbumsByDefault', () => {})

  describe('sortAlbumsByLowPrice', () => {})

  describe('sortAlbumsByHighPrice', () => {})

  describe('sortAlbumsBySoonestRelease', () => {})

  describe('sortAlbumsByOldestRelease', () => {})

  describe('sortAlbumsByFavorite', () => {})
})
