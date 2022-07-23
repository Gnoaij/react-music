import React, { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize, formatDate, formatCount } from '@/utils/formatter'

import * as playerActions from '@/pages/player/store/actionCreators'

import OperationBar from '@/components/operation-bar'
import LoadingSpin from '@/components/loading-spin'

import SongsheetIntro from '../songsheet-intro'

import { StyledWrapper } from './style'

export default memo(function SongsheetDetail(props) {

  /**
   * props and state
   */
  const { songsheetDetail, songList, sourceLink, isLoading } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = useCallback(() => {
    if (songList && songList.length > 0) {
      dispatch(playerActions.add_multipleSong_with_songList(songList, sourceLink, true))
    }
  }, [dispatch, songList, sourceLink])

  const handleAddClick = useCallback(() => {
    if (songList && songList.length > 0) {
      dispatch(playerActions.add_multipleSong_with_songList(songList, sourceLink, false))
    }
  }, [dispatch, songList, sourceLink])

  return isLoading
    ? (
      <LoadingSpin text="加载中" />
    )
    : (songsheetDetail
      ? (
        <StyledWrapper className="cpn-songsheet-detail">
          <div className="cover">
            <img src={formatUrlWithSize(songsheetDetail.coverImgUrl, 200)} alt="" />
            <span className="image_cover mask"></span>
          </div>
          <div className="info">
            <div className="header">
              <i className="sprite_icon2"></i>
              <h2 className="title">{songsheetDetail.name}</h2>
            </div>
            <div className="creator">
              <NavLink to={`/user/home?id=${songsheetDetail.creator.userId}`}>
                <img className="avatar" src={formatUrlWithSize(songsheetDetail.creator.avatarUrl, 35)} alt="" />
              </NavLink>
              <NavLink className="nickname" to={`/user/home?id=${songsheetDetail.creator.userId}`}>{songsheetDetail.creator.nickname}</NavLink>
              {
                songsheetDetail.creator.avatarDetail && (
                  <img className="icon" src={songsheetDetail.creator.avatarDetail.identityIconUrl} alt="" />
                )
              }
              <span className="time">{formatDate(songsheetDetail.createTime, 'yyyy-MM-dd')}&nbsp;创建</span>
            </div>
            <OperationBar
              favorText={formatCount(songsheetDetail.subscribedCount, true)}
              shareText={songsheetDetail.shareCount}
              commentText={songsheetDetail.commentCount}
              onPlayClick={handlePlayClick}
              onAddClick={handleAddClick} />
            <SongsheetIntro tags={songsheetDetail.tags} description={songsheetDetail.description} />
          </div>
        </StyledWrapper>
      )
      : null
    )
})
