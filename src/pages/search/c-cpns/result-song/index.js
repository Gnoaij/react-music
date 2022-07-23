import React, { memo, useState, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { keywordsMatcher } from '@/utils/parser'

import * as actions from '../../store/actionCreators'

import PaginationBar from '@/components/pagination-bar'
import LoadingSpin from '@/components/loading-spin'

import SongItem from './song-item'

import { StyledWrapper } from './style'

export default memo(function ResultSong(props) {

  /**
   * props and state
   */
  const { songList, songCount, sourceLink, keywords, isLoading } = props

  const [currentPage, setCurrentPage] = useState(1)

  /**
   * redux hooks
   */
  const {
    player_songList,
    player_currentIndex
  } = useSelector(state => ({
    player_songList: state.getIn(['player', 'songList']),
    player_currentIndex: state.getIn(['player', 'currentIndex'])
  }), shallowEqual)

  const dispatch = useDispatch()

  const currentSongId = player_songList && player_songList[player_currentIndex] && player_songList[player_currentIndex].id

  /**
   * other logic
   */
  const handlePageChange = useCallback(page => {
    if (keywords) {
      dispatch(actions.get_songList(keywords, (page - 1) * 20, 20))
      setCurrentPage(page)
    }
  }, [dispatch, keywords])

  const kwMatcher = keywordsMatcher(keywords)

  return (
    <StyledWrapper className="cpn-result-song">
      {
        isLoading
          ? (
            <LoadingSpin text="加载中..." />
          )
          : (
            <ul className="song-list">
              {
                songList && songList.map(item => {
                  return (
                    <SongItem
                      key={item.id}
                      active={item.id === currentSongId}
                      songInfo={item}
                      sourceLink={sourceLink}
                      kwMatcher={kwMatcher} />
                  )
                })
              }
            </ul>
          )
      }
      <div className="footer">
        <PaginationBar currentPage={currentPage} total={songCount} pageSize={20} onPageChange={handlePageChange} />
      </div>
    </StyledWrapper>
  )
})
