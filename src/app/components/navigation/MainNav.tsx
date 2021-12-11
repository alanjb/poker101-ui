import React from "react";
import { NavLink } from "react-router-dom";

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
        <NavLink 
          to="/login"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Log In
        </NavLink>
      )} 

      {/*       
      {(
        <Button color="danger log-button"
        onClick={() => console.log('logout')}
        >
          Log Out
        </Button>
      )}  */}
    </div>
  );
}

export default MainNav;
