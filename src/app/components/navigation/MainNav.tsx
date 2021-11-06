import {NavLink} from "react-router-dom";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "reactstrap";

const MainNav = () => {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0(); 

  return (
    <div className="navigation-links">
      {!isLoading && user && ( <NavLink
        to="/dashboard"
        exact
        className="nav-link"
        activeClassName="router-link-exact-active"
      >
        Dashboard
      </NavLink>
      )}

      {!isLoading && user && (<NavLink
        to="/profile"
        exact
        className="nav-link"
        activeClassName="router-link-exact-active"
      >
        Profile
      </NavLink>
      )}

      {!isLoading && !user && (
        <Button 
          color="warning log-button"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </Button>
      )} 
      
      {!isLoading && user && (
        <Button color="danger log-button"
        onClick={() => logout()}
        >
          Log Out
        </Button>
      )} 
    </div>
  );
}

export default MainNav;
