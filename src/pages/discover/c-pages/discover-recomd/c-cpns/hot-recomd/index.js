import React, { memo } from 'react'

import { HotRecomd_Links } from '@/services/local-data'

import HeaderLong from '@/components/header-long'
import SongsheetCover from '@/components/songsheet-cover'

import { StyledWrapper } from './style'

export default memo(function HotRecomd(props) {

  /**
   * props and state
   */
  const { recomdList } = props

  return (
    <StyledWrapper className="cpn-hot-recomd">
      <HeaderLong title="热门推荐" links={HotRecomd_Links} more={{ text: '更多', link: '/discover/songsheet' }} />
      <ul className="content">
        {
          recomdList && recomdList.map(item => {
            return (
              <li key={item.id}>
                <SongsheetCover songsheetInfo={item} />
              </li>
            )
          })
        }
      </ul>
    </StyledWrapper>
  )
})
