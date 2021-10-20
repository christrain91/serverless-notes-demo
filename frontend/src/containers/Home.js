import styled from 'styled-components'

const HomeContainer = styled.div`
  padding: 80px 0;
  text-align: center;

  h1 {
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
  }
`

const Lander = styled.div`
`

export default function Home () {
  return (
    <HomeContainer>
      <Lander>
        <h1>Scratch</h1>
        <p className="text-muted">
          A simple note taking app
        </p>
      </Lander>
    </HomeContainer>
  )
}