import React, { memo, useState } from 'react'

import { StyledWrapper } from './style'

export default memo(function CatSub(props) {

  /**
   * props and state
   */
  const { catSubList, currentSub, onSubClick } = props

  const [isShow, setIsShow] = useState(false)

  /**
   * other logic
   */
  const handleSubClick = subItem => {
    if (subItem !== currentSub) {
      setIsShow(false)
      if (onSubClick && typeof onSubClick === 'function') {
        onSubClick(subItem)
      }
    }
  }

  return (
    <StyledWrapper className="cpn-cat-sub">
      <div className="panel-top">
        <h3 className="current-select">{currentSub}</h3>
        <div className="top-selector sprite_button" onClick={() => setIsShow(!isShow)}>
          <span>选择分类</span>
          <i className="sprite_icon2"></i>
        </div>
      </div>
      <div className="panel-content" style={{ display: isShow ? 'block' : 'none' }}>
        <div className="content-header">
          <i className="sprite_icon arrow"></i>
        </div>
        <div className="content-body">
          <h3 className="body-top">
            <span className="sprite_button2" onClick={() => handleSubClick('全部')}>全部风格</span>
          </h3>
          <ul className="body-list">
            {
              catSubList && catSubList.map((catItem, catIndex) => {
                return (
                  <li className="list-li" key={catItem.name}>
                    <div className="li-left">
                      <i className={`sprite_icon2 icon-${catIndex}`}></i>
                      <span>{catItem.name}</span>
                    </div>
                    <div className="li-right">
                      {
                        catItem.subs && catItem.subs.map(subItem => {
                          return (
                            <div className="right-item" key={subItem}>
                              <span className={`name ${subItem === currentSub ? 'active' : ''}`} onClick={() => handleSubClick(subItem)}>{subItem}</span>
                              <span className="divider">|</span>
                            </div>
                          )
                        })
                      }
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="content-footer">
        </div>
      </div>
    </StyledWrapper>
  )
})
