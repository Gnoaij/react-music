import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .chart-list-title {
    padding: 0 15px 12px 15px;
    line-height: 16px;
    font-family: simsun;
    font-size: 14px;
    font-weight: bold;
    color: #000;
  }

  .chart-list {
    width: 100%;

    .chart-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 20px;
      width: 100%;
      height: 62px;
      cursor: pointer;

      &:hover,
      &.active {
        background: #e6e6e6;
      }

      img {
        margin: 0 10px 0 0;
        width: 40px;
        height: 40px;
      }

      .item-info {
        flex: 1;
        width: 0;
        height: 38px;

        .item-name {
          height: 16px;
          line-height: 16px;
          color: #000;
        }

        .item-update {
          margin-top: 6px;
          height: 16px;
          line-height: 16px;
          color: #999;
        }
      }
    }
  }
`
