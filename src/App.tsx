import React from 'react';
import './App.css';
import NavBar from './MainUI/NavBar';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './MainPage/Home';
import NewPost from './NewPostPage/NewPost';

const MainWindow = styled.div`
  display: flex;
`


function App(): JSX.Element {
  return (
    <MainWindow>
      <Router>
        <NavBar />
        <div>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            ></Route>
            <Route
              path="/newpost"
              element={<NewPost />}
            ></Route>
          </Routes>
        </div>
      </Router>

    </MainWindow>
  );
}

export default App;
