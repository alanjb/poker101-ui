import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";

const MainNav = () => {

  return (
    <div className="navigation-links">
      {( <NavLink
        to="/dashboard"
        exact
        className="nav-link"
        activeClassName="router-link-exact-active"
      >
        Dashboard
      </NavLink>
      )}

      {(<NavLink
        to="/profile"
        exact
        className="nav-link"
        activeClassName="router-link-exact-active"
      >
        Profile
      </NavLink>
      )}

      {(
        <Button 
          color="warning log-button"
          onClick={() => console.log('login')}
        >
          Log In
        </Button>
      )} 
      
      {(
        <Button color="danger log-button"
        onClick={() => console.log('logout')}
        >
          Log Out
        </Button>
      )} 
    </div>
  );
}

export default MainNav;
