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

const AppContainer = () => {

  // if (isLoading) {
  //   return <Loading/>;
  // }

  return (
    <div className="app-container">
      <NavbarContainer />
      <Switch>
        <Route path="/" exact component={HomeContainer} />
        <Route path="/dashboard" component={DashboardContainer} />
        <Route path="/profile" component={ProfileContainer} />
        <Route path="/game/:gameId" component={GameContainer} />
      </Switch>
    </div>
  );
};

export default AppContainer;