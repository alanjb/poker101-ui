import React, { Fragment, useState, useEffect } from 'react';
import CreateGameModal from '../../../game/components/CreateGameModal';
import { Button, Col, Container, Row } from 'reactstrap';
import Game from '../../../game/models/Game';
import axios from 'axios';
import GamesContainer from './games/GamesContainer';

const DashboardContainer = () => {
  const [isCreateGameModalOpen, toggleCreateGameModal] = useState(false);

  function toggle() {
    toggleCreateGameModal(!isCreateGameModalOpen);
  };

  function gameCreated(game: Game) {
    toggle();
  }

  return (
    <Fragment>
      <div className="dashboard-container">
        <Container className="component-container dashboard-header themed-container" fluid={true}>
          <div className="content">
            <Row>
              <Col>
                <h2 className="dashboard-header-text">Dashboard</h2>
              </Col>
              <Col>
                <div className="create-button-container justify-content-end">
                  <Button className="align-self-end" color="info" onClick={toggle}>
                    Create new game
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <GamesContainer/>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <CreateGameModal isOpen={isCreateGameModalOpen} toggle={toggle} created={gameCreated} />
    </Fragment>
  );
}

export default DashboardContainer;