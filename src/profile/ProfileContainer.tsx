import React, { Component } from "react";

import { useAuth0 } from "@auth0/auth0-react";

class Profile extends Component {
  render() {
    return (
      <div className="profile-container">
        <ProfileComponent/>
      </div>
    );
  }
}

const ProfileComponent = () => {
  const { user } = useAuth0();

  return (
    <div className="row align-items-center profile-header">
      <div className="col-md text-center text-md-left">
        <p className="lead text-muted">USER EMAIL: {user?.email}</p>
        <img src={user?.picture}/>
      </div>
    </div>
  )
};

export default Profile;