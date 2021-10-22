import { useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { useAppContext } from '../lib/contextLib'
import { onError } from '../lib/errorLib'
import styled from 'styled-components'
import { API } from 'aws-amplify'
import { BsPencilSquare } from 'react-icons/bs'
import { LinkContainer } from 'react-router-bootstrap'

const HomeContainer = styled.div`
  h1 {
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
  }
`

const Lander = styled.div`
  text-align: center;
  padding: 80px 0;
`

const NotesContainer = styled.div`
`

export default function Home () {
  const [notes, setNotes] = useState([])
  const { isAuthenticated } = useAppContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function onLoad () {
      if (!isAuthenticated) {
        return;
      }
      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [isAuthenticated]);

  function renderNotesList (notes) {
    return <>
      <LinkContainer to="/notes/new">
        <ListGroup.Item action className="py-3 text-nowrap text-truncate">
          <BsPencilSquare size={17} />
          <span className="ml-2 font-weight-bold">Create a new note</span>
        </ListGroup.Item>
      </LinkContainer>
      {notes.map(({ noteId, content, createdAt }) => (
        <LinkContainer key={noteId} to={`/notes/${noteId}`}>
          <ListGroup.Item action>
            <span className="font-weight-bold">
              {content.trim().split("\n")[0]}
            </span>
            <br />
            <span className="text-muted">
              Created: {new Date(createdAt).toLocaleString()}
            </span>
          </ListGroup.Item>
        </LinkContainer>
      ))}
    </>
  }

  function renderLander () {
    return <Lander>
      <h1>Scratch</h1>
      <p className="text-muted">
        A simple note taking app
      </p>
    </Lander>
  }

  function renderNotes () {
    return <NotesContainer>
      <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
      <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
    </NotesContainer>
  }
  return (
    <HomeContainer>
      {isAuthenticated ? renderNotes() : renderLander()}
    </HomeContainer>
  )
}

function loadNotes () {
  return API.get("notes", "/notes");
}