import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";

const MainNav = () => {

  return (
    <div className="navigation-links">
      {(<NavLink
        to="/dashboard"
        children = "Dashboard"
        // exact
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      />
      )}

      {(<NavLink
        to="/profile"
        children = "Profile"
        // exact
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        // exact
        // className={(props) => props.isActive ? "router-link-exact-active" : "nav-link"}
      />
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
