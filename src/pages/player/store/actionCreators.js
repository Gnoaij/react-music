import { actionTypes } from './constants'

import { parseLyric, mergeLyric } from '@/utils/parser'

import * as songApi from '@/services/songApi'
import * as albumApi from '@/services/albumApi'
import * as songsheetApi from '@/services/songsheetApi'
import axios from 'axios'

import AppMessage from '@/components/app-message'

/**
 * 操作state
 */
export const merge_state = state => {
  if (state.songList) {
    window.localStorage.setItem('songList', JSON.stringify(state.songList))
  }
  if (state.currentIndex) {
    window.localStorage.setItem('currentIndex', state.currentIndex)
  }
  return {
    type: actionTypes.MERGE_STATE,
    state: state
  }
}

export const clear_state = () => ({
  type: actionTypes.CLEAR_STATE
})

export const set_songList = songList => {
  window.localStorage.setItem('songList', JSON.stringify(songList))
  return {
    type: actionTypes.SET_SONG_LIST,
    songList: songList
  }
}

export const set_lyricList = lyricList => ({
  type: actionTypes.SET_LYRIC_LIST,
  lyricList: lyricList
})

export const set_currentIndex = currentIndex => {
  window.localStorage.setItem('currentIndex', currentIndex)
  return {
    type: actionTypes.SET_CURRENT_INDEX,
    currentIndex: currentIndex
  }
}

export const set_currentRow = currentRow => ({
  type: actionTypes.SET_CURRENT_ROW,
  currentRow: currentRow
})

export const set_audioStatus = audioStatus => ({
  type: actionTypes.SET_AUDIO_STATUS,
  audioStatus: audioStatus
})

export const set_messageConfig = messageConfig => ({
  type: actionTypes.SET_MESSAGE_CONFIG,
  messageConfig: messageConfig
})

/**
 * 异步请求
 */
// 更新歌词列表
export const update_lyricList = () => {
  return async (dispatch, getState) => {
    const songList = getState().getIn(['player', 'songList'])
    const lyricList = getState().getIn(['player', 'lyricList'])
    const currentIndex = getState().getIn(['player', 'currentIndex'])
    const currentSong = songList[currentIndex]
    const currentLyric = lyricList[currentIndex]
    if (currentSong && (!currentLyric || currentLyric.id !== currentSong.id)) {
      const res = await songApi.get_lyric(currentSong.id)
      let lyric = []
      if (!res) {
        lyric.push({ time: 0, content: '获取歌词失败' })
      } else if (res.nolyric) {
        lyric.push({ time: 0, content: '纯音乐，无歌词' })
      } else if (res.uncollected) {
        lyric.push({ time: 0, content: '暂时没有歌词' })
      } else {
        let ol = res.lrc && res.lrc.lyric
        let tl = res.tlyric && res.tlyric.lyric
        if (ol && tl) {
          lyric = mergeLyric(parseLyric(ol), parseLyric(tl))
        } else if (ol && !tl) {
          lyric = parseLyric(ol)
        } else if (!ol && tl) {
          lyric = parseLyric(tl)
        } else {
          lyric.push({ time: 0, content: '暂无歌词' })
        }
      }
      const newLyricList = [...lyricList]
      newLyricList[currentIndex] = {
        id: currentSong.id,
        lyric: lyric
      }
      dispatch(set_lyricList(newLyricList))
      dispatch(set_currentRow(-1))
    }
  }
}

// 切换歌曲
export const toggle_song = index => {
  return (dispatch, getState) => {
    const currentIndex = getState().getIn(['player', 'currentIndex'])
    if (currentIndex === index) {
      const songList = getState().getIn(['player', 'songList'])
      const currentSong = songList[currentIndex]
      if (currentSong) {
        const newSongList = [...songList]
        newSongList[currentIndex] = Object.assign({}, currentSong)
        dispatch(set_songList(newSongList))
      }
    } else {
      dispatch(set_currentIndex(index))
    }
    dispatch(update_lyricList())
  }
}

// 添加单条歌曲
export const add_simpleSong_with_songObject = (songObject, sourceLink, isPlay = false) => {
  return async (dispatch, getState) => {
    dispatch(set_messageConfig({ message: '加载中', duration: 3000 }))
    const checkResult = await checkSimpleSong(songObject.id)
    if (!checkResult) {
      AppMessage.show('该歌曲暂时无法播放')
      dispatch(set_messageConfig({ message: '加载失败', duration: 3000 }))
      return
    }
    const songList = getState().getIn(['player', 'songList'])
    const existIndex = songList.findIndex(item => item.id === songObject.id)
    if (existIndex !== -1) {
      if (isPlay) {
        dispatch(toggle_song(existIndex))
      }
    } else {
      const newSongList = [...songList]
      songObject.sourceLink = sourceLink
      newSongList.push(songObject)
      dispatch(set_songList(newSongList))
      if (isPlay) {
        dispatch(toggle_song(newSongList.length - 1))
      }
    }
    dispatch(set_messageConfig({ message: '已添加到播放列表', duration: 3000 }))
  }
}

// 添加单条歌曲
export const add_simpleSong_with_songId = (songId, sourceLink, isPlay = false) => {
  return async dispatch => {
    dispatch(set_messageConfig({ message: '加载中', duration: 3000 }))
    const res = await songApi.get_song_detail(songId)
    if (res && res.songs && res.songs[0]) {
      dispatch(add_simpleSong_with_songObject(res.songs[0], sourceLink, isPlay))
    } else {
      dispatch(set_messageConfig({ message: '加载失败', duration: 3000 }))
    }
  }
}

// 添加多条歌曲
export const add_multipleSong_with_songList = (songList, sourceLink, isPlay = false) => {
  return async dispatch => {
    dispatch(set_messageConfig({ message: '加载中', duration: 3000 }))
    dispatch(clear_List())
    const ids = []
    for (let item of songList) {
      ids.push(item.id)
    }
    const checkResult = await checkMultipleSong(ids)
    const newSongList = []
    checkResult.forEach((item, index) => {
      if (item && item.success) {
        newSongList.push(songList[index])
      }
    })
    if (newSongList.length > 0) {
      newSongList.forEach(item => item.sourceLink = sourceLink)
      dispatch(set_songList(newSongList))
      if (isPlay) {
        dispatch(toggle_song(0))
      }
      dispatch(set_messageConfig({ message: '已添加到播放列表', duration: 3000 }))
    } else {
      dispatch(set_messageConfig({ message: '加载失败', duration: 3000 }))
    }
  }
}

// 添加多条歌曲
export const add_multipleSong_with_trackIds = (trackIds, sourceLink, isPlay = false) => {
  return async dispatch => {
    dispatch(set_messageConfig({ message: '加载中', duration: 3000 }))
    dispatch(clear_List())
    const ids = []
    for (let item of trackIds) {
      ids.push(item.id)
    }
    const checkResult = await checkMultipleSong(ids)
    const idsString = ids.filter((item, index) => {
      if (checkResult[index] && checkResult[index].success) {
        return true
      } else {
        return false
      }
    }).join(',')
    const res = await songApi.get_song_detail(idsString)
    if (res && res.songs && res.songs.length > 0) {
      res.songs.forEach(item => item.sourceLink = sourceLink)
      dispatch(set_songList(res.songs))
      if (isPlay) {
        dispatch(toggle_song(0))
      }
      dispatch(set_messageConfig({ message: '已添加到播放列表', duration: 3000 }))
    } else {
      dispatch(set_messageConfig({ message: '加载失败', duration: 3000 }))
    }
  }
}

// 添加多条歌曲
export const add_multipleSong_with_albumId = (albumId, sourceLink, isPlay = true) => {
  return async dispatch => {
    dispatch(set_messageConfig({ message: '加载中', duration: 3000 }))
    const res = await albumApi.get_album_detail(albumId)
    if (res && res.songs) {
      dispatch(add_multipleSong_with_songList(res.songs, sourceLink, isPlay))
    } else {
      dispatch(set_messageConfig({ message: '加载失败', duration: 3000 }))
    }
  }
}

// 添加多条歌曲
export const add_multipleSong_with_songsheetId = (songsheetId, sourceLink, isPlay = true) => {
  return async dispatch => {
    dispatch(set_messageConfig({ message: '加载中', duration: 3000 }))
    const res = await songsheetApi.get_playlist_detail(songsheetId)
    if (res && res.playlist && res.playlist.trackIds) {
      dispatch(add_multipleSong_with_trackIds(res.playlist.trackIds, sourceLink, isPlay))
    } else {
      dispatch(set_messageConfig({ message: '加载失败', duration: 3000 }))
    }
  }
}

// 删除歌曲
export const remove_song = targetIndex => {
  return (dispatch, getState) => {
    const songList = getState().getIn(['player', 'songList'])
    const lyricList = getState().getIn(['player', 'lyricList'])
    const currentIndex = getState().getIn(['player', 'currentIndex'])
    const newSongList = [...songList]
    const newLyricList = [...lyricList]
    let newIndex = currentIndex
    newSongList.splice(targetIndex, 1)
    newLyricList.splice(targetIndex, 1)
    if (targetIndex < currentIndex) {
      newIndex = currentIndex - 1
    } else if (targetIndex === currentIndex && !newSongList[targetIndex]) {
      newIndex = targetIndex - 1
    }
    dispatch(merge_state({
      songList: newSongList,
      lyricList: newLyricList,
      currentIndex: newIndex
    }))
    dispatch(update_lyricList())
  }
}

// 清空播放列表
export const clear_List = () => {
  return dispatch => {
    dispatch(merge_state({
      songList: [],
      lyricList: [],
      currentIndex: -1,
      currentRow: -1
    }))
  }
}

/**
 * 其他
 */
// 检查单条歌曲可用性
const checkSimpleSong = async id => {
  try {
    const res = await songApi.get_check_music(id)
    if (res && res.success) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

// 检查多条歌曲可用性
const checkMultipleSong = async ids => {
  const req = []
  for (let id of ids) {
    let p = songApi.get_check_music(id, true).catch(() => undefined)
    req.push(p)
  }
  const res = await axios.all(req)
  return res
}
