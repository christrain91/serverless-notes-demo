import { useState, useEffect, useCallback } from 'react'
import GlobalStyle from './globalStyles'
import styled from 'styled-components'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Routes from './routes'
import { LinkContainer } from "react-router-bootstrap"
import { AppContext } from './lib/contextLib'
import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'
import { onError } from './lib/errorLib'

const AppContainer = styled.div`
`


function App () {
  const [isAuthenticated, userHasAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const history = useHistory()

  const handleLogout = async () => {
    await Auth.signOut()
    userHasAuthenticated(false)
    history.push('/login')
  }

  const onLoad = useCallback(async () => {
    try {
      await Auth.currentSession()
      userHasAuthenticated(true)
    } catch (e) {
      if (e !== 'No current user') {
        onError(e)
      }
    }

    setIsAuthenticating(false)
  }, [])

  useEffect(() => {
    onLoad()
  }, [onLoad])

  if (isAuthenticating) return null

  return (
    <>
      <GlobalStyle />
      <AppContainer className="container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              Scratch
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (<>
                <LinkContainer to="/settings">
                  <Nav.Link>Settings</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>) :
                (<>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>)}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </AppContainer>
    </>
  );
}

export default App;
