import React, { memo, forwardRef } from 'react'

import { StyledWrapper } from './style'

export default memo(forwardRef(function PlayerLyric(props, ref) {

  /**
   * props and state
   */
  const { currentLyric, currentRow } = props

  return (
    <StyledWrapper className="cpn-player-lyric" ref={ref}>
      {
        currentLyric && currentLyric.lyric && currentLyric.lyric.map((item, index) => {
          return (
            <p
              key={item.time + index}
              className={`lyric-item ${index === currentRow ? 'active' : ''}`}>
              {item.content}
              <br />
              {item.translation}
            </p>
          )
        })
      }
    </StyledWrapper>
  )
}))
