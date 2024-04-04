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
import AdminDashboard from './AdminDashboardPage/AdminDashboard';
import Box from '@mui/material/Box';


function App(): JSX.Element {
  return (
    <div>
      <NavBar />
      <Router>
        <Box sx={{ paddingX: 2, paddingY: 1 }}>
          <Routes>
            <Route
              path="/"
              element={<ViewAds />}
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
            <Route
              path="/dashboard"
              element={<AdminDashboard />}
            ></Route>
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;
