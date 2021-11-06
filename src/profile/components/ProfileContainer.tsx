import { Component } from "react";

import { useAuth0 } from "@auth0/auth0-react";
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
  const { user } = useAuth0();

  return (
    <Container className="component-container dashboard-header themed-container" fluid={true}>
      <Row>
        <Col>
          <br />
          <span className="sub-text"> {user?.name}</span>
          <br /><br />
          <span className="sub-text"> {user?.email}</span>
          <br/><br/>
          <img alt="profile" src={user?.picture}/>
        </Col>
      </Row>
    </Container>
  )
};

export default Profile;