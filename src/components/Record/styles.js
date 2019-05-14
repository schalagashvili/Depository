import styled from 'styled-components'

export const Record = styled.div`
  display: flex;
  padding: 15px;
  margin-top: 10px;
  background-color: white;
  color: black;
  justify-content: space-between;
  border-radius: 4px;
  &:hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.18);
  }
`

export const IconsWrapper = styled.div`
  display: flex;
  width: 40px;
  justify-content: space-between;
  flex: 0.2;
`

export const Title = styled.div`
  flex: 1;
`

export const Calories = styled.div`
  flex: 1;
  color: #8B93A6;
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
