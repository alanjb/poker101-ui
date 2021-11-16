import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./loading/Loading";
import NavbarContainer from "./navigation/NavbarContainer";
import {
  Switch,
  Route,
} from "react-router-dom";
import HomeContainer from "./home/HomeContainer";
import ProfileContainer from '../../user/components/ProfileContainer';
import ProtectedRoute from '../security/protected-route';
import DashboardContainer from './dashboard/DashboardContainer';
import GameContainer from '../../game/components/GameBoardContainer';

const AppContainer = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div className="app-container">
      <NavbarContainer />
      <Switch>
        <Route path="/" exact component={HomeContainer} />
        <ProtectedRoute path="/dashboard" component={DashboardContainer} />
        <ProtectedRoute path="/profile" component={ProfileContainer} />
        <ProtectedRoute path="/game/:gameId" component={GameContainer} />
      </Switch>
    </div>
  );
};

export default AppContainer;