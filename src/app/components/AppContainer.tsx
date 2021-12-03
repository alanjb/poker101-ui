import React from 'react';
import NavbarContainer from "./navigation/NavbarContainer";
import {
  Switch,
  Route,
} from "react-router-dom";
import HomeContainer from "./home/HomeContainer";
import ProfileContainer from '../../user/components/ProfileContainer';
import DashboardContainer from './dashboard/DashboardContainer';
import GameContainer from '../../game/components/GameBoardContainer';
import WaitingRoomContainer from '../../game/components/LobbyContainer';

const AppContainer = () => {

  return (
    <div className="app-container">
      <NavbarContainer />
      <Switch>
        <Route path="/" exact component={HomeContainer} />
        <Route path="/dashboard" component={DashboardContainer} />
        <Route path="/profile" component={ProfileContainer} />
        <Route path="/game/:gameId" component={GameContainer} />
        <Route path="/lobby/:gameId" component={WaitingRoomContainer} />
      </Switch>
    </div>
  );
};

export default AppContainer;