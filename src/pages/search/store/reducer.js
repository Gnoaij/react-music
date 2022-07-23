import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  songList: [],
  songCount: 0,
  artistList: [],
  artistCount: 0,
  albumList: [],
  albumCount: 0,
  songsheetList: [],
  songsheetCount: 0,
  mvList: [],
  mvCount: 0,
  searchSuggest: null,
  isLoading: false
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_STATE:
      return state.merge(action.state)
    case actionTypes.CLEAR_STATE:
      return state.clear()
    case actionTypes.SET_SONG_LIST:
      return state.set('songList', action.songList)
    case actionTypes.SET_SONG_COUNT:
      return state.set('songCount', action.songCount)
    case actionTypes.SET_ARTIST_LIST:
      return state.set('artistList', action.artistList)
    case actionTypes.SET_ARTIST_COUNT:
      return state.set('artistCount', action.artistCount)
    case actionTypes.SET_ALBUM_LIST:
      return state.set('albumList', action.albumList)
    case actionTypes.SET_ALBUM_COUNT:
      return state.set('albumCount', action.albumCount)
    case actionTypes.SET_SONGSHEET_LIST:
      return state.set('songsheetList', action.songsheetList)
    case actionTypes.SET_SONGSHEET_COUNT:
      return state.set('songsheetCount', action.songsheetCount)
    case actionTypes.SET_MV_LIST:
      return state.set('mvList', action.mvList)
    case actionTypes.SET_MV_COUNT:
      return state.set('mvCount', action.mvCount)
    case actionTypes.SET_SEARCH_SUGGEST:
      return state.set('searchSuggest', action.searchSuggest)
    case actionTypes.SET_IS_LOADING:
      return state.set('isLoading', action.isLoading)
    default:
      return state
  }
}

export default reducer
