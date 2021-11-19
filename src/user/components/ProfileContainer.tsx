import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class Profile extends Component {
  render() {
    return (
      <div className="component-container profile-container">
        <ProfileComponent/>
      </div>
    );
  }
}

const ProfileComponent = () => {

  return (
    <Container className="component-container dashboard-header themed-container" fluid={true}>
      <Row>
        <Col>
          <br />
          {/* <span className="sub-text"> {user?.name}</span>
          <br /><br />
          <span className="sub-text"> {user?.email}</span>
          <br/><br/>
          <img alt="profile" src={user?.picture}/> */}
        </Col>
      </Row>
    </Container>
  )
};

export default Profile;