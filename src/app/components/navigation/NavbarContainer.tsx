import React from "react";

import MainNav from "./MainNav";

const NavBarContainer = () => {
  return (
    <div className="navigation-container">
      <div className="logo">
        Poker 101
      </div>
      <MainNav />
    </div>
  );
};

export default NavBarContainer;
