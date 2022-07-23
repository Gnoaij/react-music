import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.artist-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    
    &>.cpn-artist-item {
      margin: 0 0 30px 24px;

      &:nth-child(6n+1) {
        margin-left: 0;
      }
    }
  }

  &>.footer {
    padding: 15px 0;
  }
`
