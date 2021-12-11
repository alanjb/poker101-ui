import React from 'react';
import NavbarContainer from "./navigation/NavbarContainer";
import {
  Routes,
  Route,
} from "react-router-dom";
import HomeContainer from "./home/HomeContainer";
import ProfileContainer from '../../user/components/ProfileContainer';
import DashboardContainer from './dashboard/DashboardContainer';
import GameBoardContainer from '../../game/components/GameBoardContainer';
import LobbyContainer from '../../game/components/LobbyContainer';
import LoginContainer from './login/LoginContainer';
import SignUpContainer from './login/SignUpContainer';

const AppContainer = () => {    
  return (
    <div className="app-container">
      <NavbarContainer />
      <Routes>
        <Route path="/" element={<HomeContainer/>} />
        <Route path="dashboard" element={<DashboardContainer />} />
        <Route path="profile" element={<ProfileContainer />} />
        <Route path="login" element={<LoginContainer />} />
        <Route path="signup" element={ <SignUpContainer/> } />
        <Route path="game/:gameId" element={<GameBoardContainer />} />
        <Route path="lobby/:gameId" element={<LobbyContainer/>} />
      </Routes>
    </div>
  );
};

export default AppContainer;