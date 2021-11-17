import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import GamesContainer from '../../app/components/dashboard/games/GamesContainer';

class WaitingRoom extends Component {

  render() {
    return (
      <Fragment>
      <div className="waiting-room-container">
        <Container className="component-container dashboard-header themed-container" fluid={true}>
          <div className="content">
            <Row>
              <Col>
                <h2 className="dashboard-header-text">Dashboard</h2>
              </Col>
              <Col>
                <div className="create-button-container justify-content-end">
                  <Button className="align-self-end" color="info" onClick={() => { }}>
                    Create new game
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* <GamesContainer user={user}/> */}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      </Fragment>
    );
  }
}

export default WaitingRoom;