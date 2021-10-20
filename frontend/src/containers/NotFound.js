import styled from 'styled-components'

const NotFoundHeader = styled.h3`
  padding-top: 300px;
  text-align: center;
`


export default function NotFound () {
  return <NotFoundHeader>
    Sorry, page not found!
  </NotFoundHeader>
}