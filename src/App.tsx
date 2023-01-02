import React from 'react';
import styled, { ThemeProvider } from "styled-components"
import Converter from './Converter';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  width: 100vw;
  background: ${props => props.theme.secondary}; 

`

const HeaderTitle = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  color: rgb(255,255,255); 
`
const Main = styled.main`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 1rem;
`

const MainContainer = styled.div`
  max-width:20rem;
  width: 100%;
  min-height: 20rem;
  /* background-color: ${props => props.theme.accentBackgroundAlt}; */
  
`

function App() {
  return (
    <div className="App">
      <ThemeProvider
        theme={{
          primary: "#04080fff",
          secondary: "#507dbcff",
          accentBackground: "#a1c6eaff",
          accentBackgroundAlt: "#bbd1eaff",
          background: "#dae3e5ff",
        }}
      >
        <Navbar bg="dark" variant="dark">
        <Container className='justify-content-center'>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={process.env.PUBLIC_URL +"/logo192.png"}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            EUR/HRK pretvarač
          </Navbar.Brand>
        </Container>
      </Navbar>
        <Main>
          <MainContainer>
            <Converter/>
          </MainContainer>
        </Main>
      </ThemeProvider>
    </div>
  );
}

export default App;
