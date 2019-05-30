import styled from 'styled-components'

export const Record = styled.div`
  display: flex;
  padding: 25px;
  padding-left: 45px;
  padding-right: 45px;
  background-color: white;
  color: black;
  justify-content: space-between;
  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.18);
    z-index: 2;
  }
  border-bottom: 1px solid #eff3f9;
`

export const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0;
`

export const Title = styled.div`
  flex: 1;
`

export const Calories = styled.div`
  flex: 1;
  color: #8b93a6;
`

export const DateText = styled.div`
  flex: 1;
`

export const Time = styled.div`
  flex: 0.7;
`

export const Icon = styled.div`
  margin-left: 5px;
  cursor: pointer;
`
