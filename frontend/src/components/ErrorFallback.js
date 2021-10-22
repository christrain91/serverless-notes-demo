import React from 'react'
import styled from 'styled-components'

const ErrorContainer = styled.div`
  padding-top: 100px;
  text-align: center;
`

export default function ErrorFallback () {
  return <ErrorContainer>
    <h3>Sorry, there was a problem loading this page.</h3>
  </ErrorContainer>
}