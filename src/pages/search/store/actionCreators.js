import { actionTypes } from './constants'

import * as searchApi from '@/services/searchApi'

/**
 * 操作state
 */
export const merge_state = state => ({
  type: actionTypes.MERGE_STATE,
  state: state
})

export const clear_state = () => ({
  type: actionTypes.CLEAR_STATE
})

export const set_songList = songList => ({
  type: actionTypes.SET_SONG_LIST,
  songList: songList
})

export const set_songCount = songCount => ({
  type: actionTypes.SET_SONG_COUNT,
  songCount: songCount
})

export const set_artistList = artistList => ({
  type: actionTypes.SET_ARTIST_LIST,
  artistList: artistList
})

export const set_artistCount = artistCount => ({
  type: actionTypes.SET_ARTIST_COUNT,
  artistCount: artistCount
})

export const set_albumList = albumList => ({
  type: actionTypes.SET_ALBUM_LIST,
  albumList: albumList
})

export const set_albumCount = albumCount => ({
  type: actionTypes.SET_ALBUM_COUNT,
  albumCount: albumCount
})

export const set_songsheetList = songsheetList => ({
  type: actionTypes.SET_SONGSHEET_LIST,
  songsheetList: songsheetList
})

export const set_songsheetCount = songsheetCount => ({
  type: actionTypes.SET_SONGSHEET_COUNT,
  songsheetCount: songsheetCount
})

export const set_mvList = mvList => ({
  type: actionTypes.SET_MV_LIST,
  mvList: mvList
})

export const set_mvCount = mvCount => ({
  type: actionTypes.SET_MV_COUNT,
  mvCount: mvCount
})

export const set_searchSuggest = searchSuggest => ({
  type: actionTypes.SET_SEARCH_SUGGEST,
  searchSuggest: searchSuggest
})

export const set_isLoading = isLoading => ({
  type: actionTypes.SET_IS_LOADING,
  isLoading: isLoading
})

/**
 * 异步请求
 */

// 歌曲列表
export const get_songList = (keywords, offset = 0, limit = 20) => {
  return async dispatch => {
    dispatch(set_isLoading(true))
    const res = await searchApi.get_search(keywords, 1, offset, limit)
    if (res && res.result) {
      if (res.result.songs) {
        dispatch(set_songList(res.result.songs))
      }
      if (res.result.songCount) {
        dispatch(set_songCount(res.result.songCount))
      }
    }
    dispatch(set_isLoading(false))
  }
}

// 歌手列表
export const get_artistList = (keywords, offset = 0, limit = 24) => {
  return async dispatch => {
    dispatch(set_isLoading(true))
    const res = await searchApi.get_search(keywords, 100, offset, limit)
    if (res && res.result) {
      if (res.result.artists) {
        dispatch(set_artistList(res.result.artists))
      }
      if (res.result.artistCount) {
        dispatch(set_artistCount(res.result.artistCount))
      }
    }
    dispatch(set_isLoading(false))
  }
}

// 专辑列表
export const get_albumList = (keywords, offset = 0, limit = 20) => {
  return async dispatch => {
    dispatch(set_isLoading(true))
    const res = await searchApi.get_search(keywords, 10, offset, limit)
    if (res && res.result) {
      if (res.result.albums) {
        dispatch(set_albumList(res.result.albums))
      }
      if (res.result.albumCount) {
        dispatch(set_albumCount(res.result.albumCount))
      }
    }
    dispatch(set_isLoading(false))
  }
}

// 歌单列表
export const get_songsheetList = (keywords, offset = 0, limit = 20) => {
  return async dispatch => {
    dispatch(set_isLoading(true))
    const res = await searchApi.get_search(keywords, 1000, offset, limit)
    if (res && res.result) {
      if (res.result.playlists) {
        dispatch(set_songsheetList(res.result.playlists))
      }
      if (res.result.playlistCount) {
        dispatch(set_songsheetCount(res.result.playlistCount))
      }
    }
    dispatch(set_isLoading(false))
  }
}

// MV列表
export const get_mvList = (keywords, offset = 0, limit = 20) => {
  return async dispatch => {
    dispatch(set_isLoading(true))
    const res = await searchApi.get_search(keywords, 1004, offset, limit)
    if (res && res.result) {
      if (res.result.mvs) {
        dispatch(set_mvList(res.result.mvs))
      }
      if (res.result.mvCount) {
        dispatch(set_mvCount(res.result.mvCount))
      }
    }
    dispatch(set_isLoading(false))
  }
}

// 搜索建议
export const get_searchSuggest = keywords => {
  return async dispatch => {
    const res = await searchApi.get_search_suggest(keywords)
    if (res && res.result) {
      dispatch(set_searchSuggest(res.result))
    }
  }
}
