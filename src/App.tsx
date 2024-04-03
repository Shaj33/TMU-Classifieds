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
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import ViewAds from './ViewAdsPage/ViewAds';
import Communication from './CommunicationPage/Communication';

const MainWindow = styled.div`
  display: flex;
`

const SideWindow = styled.div`
  width: 100%;
`


function App(): JSX.Element {
  return (
    <MainWindow>
      <Router>
        <NavBar />
        <SideWindow>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            ></Route>
            <Route
              path="/newpost"
              element={<NewPost />}
            ></Route>
            <Route
              path="/login"
              element={<Login />}
            ></Route>
            <Route
              path="/signup"
              element={<SignUp />}
            ></Route>
            <Route
              path='/viewAds'
              element={<ViewAds />}>
            </Route>
            <Route
              path="/communication"
              element={<Communication />}
            ></Route>
          </Routes>
        </SideWindow>
      </Router>
    </MainWindow>
  );
}

export default App;
