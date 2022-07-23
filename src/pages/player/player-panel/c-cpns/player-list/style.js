import styled from 'styled-components'

export const StyledWrapper = styled.ul`
  width: 100%;

  &>.list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding-left: 30px;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    cursor: pointer;
    
    .left {
      flex: 1;
      width: 0;
      
      .song {
        color: #ccc;
      }
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;

      .operation {
        display: none;

        i {
          display: block;
          margin-left: 10px;
          height: 16px;
        }

        .favor {
          width: 16px;
          background-position: -24px 0;

          &:hover {
            background-position: -24px -20px;
          }
        }

        .share {
          width: 14px;
          background-position: 0 0;

          &:hover {
            background-position: 0 -20px;
          }
        }

        .download {
          width: 14px;
          background-position: -57px -50px;

          &:hover {
            background-position: -80px -50px;
          }
        }

        .remove {
          width: 13px;
          background-position: -51px 0;

          &:hover {
            background-position: -51px -20px;
          }
        }
      }

      .artists {
        margin-left: 10px;
        width: 80px;
        color: #9b9b9b;
      }

      .duration {
        margin-left: 10px;
        width: 35px;
        color: #666;
      }

      .source {
        margin-left: 20px;
        margin-right: 10px;
        width: 14px;
        height: 16px;
        background-position: -80px 0px;
        cursor: pointer;

        &:hover {
          background-position: -80px -20px;
        }

        .link {
          display: block;
          width: 100%;
          height: 100%;
          text-indent: -9999px;
        }
      }
    }

    &:hover {
      background-color: #000;

      .operation {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .left .song,
      .right .artists,
      .right .duration,
      .right .link {
        color: #fff;
      }
    }

    &.active {
      background-color: #000;

      .left .song,
      .right .artists,
      .right .duration,
      .right .link {
        color: #fff;
      }

      ::before {
        content: "";
        position: absolute;
        left: 10px;
        width: 10px;
        height: 13px;
        background: url(${require('@/assets/img/playlist_sprite.png').default}) -182px .5px;
      }
    }
  }
`
