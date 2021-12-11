import React, { Fragment, useEffect, useState } from 'react';
import CreateGameModal from '../../../game/components/CreateGameModal';
import { Button, Col, Container, Row } from 'reactstrap';
import Game from '../../../game/models/Game';
import GamesContainer from '../../../game/components/GamesContainer';
import axios from 'axios';
import { getEnv } from '../../../app/config/utils';

const DashboardContainer = () => {
  const [isCreateGameModalOpen, toggleCreateGameModal] = useState(false);
  const [gamesArray, setGames] = useState([]);
  const url = getEnv();

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  function init() {
    axios
      .get(`${url}/api/game/games`)
      .then(res => {
        const { games } = res.data;

        setGames(games);
      })
      .catch(error => {
        alert("Failed to get games \n\n" + error);
      })
  }

  function toggle() {
    toggleCreateGameModal(!isCreateGameModalOpen);
  }

  function gameCreated(game: Game) {
    gamesArray.push(game);
    setGames(gamesArray);
    toggle();
  }

  return (
    <Fragment>
      <div className="dashboard-container component-container">
        <Container className="dashboard-header themed-container" fluid={true}>
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
                <GamesContainer games={gamesArray}/>
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