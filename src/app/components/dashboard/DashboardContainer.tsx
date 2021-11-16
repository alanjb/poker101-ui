import React, { Fragment, useState, useEffect } from 'react';
import CreateGameModal from '../../../game/components/CreateGameModal';
import { Button, Col, Container, Row } from 'reactstrap';
import Game from '../../../game/models/Game';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import GamesContainer from './games/GamesContainer';

const DashboardContainer = () => {
  const [isCreateGameModalOpen, toggleCreateGameModal] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    //check global state if user is signed in, once checked the first time, make a boolean that says its was already checked in this session
  });

  function toggle() {
    toggleCreateGameModal(!isCreateGameModalOpen);
  };

  function gameCreated(game: Game) {
    toggle();
  }

  async function checkUserOnSignIn() {
    try {
      const accessToken = await getAccessTokenSilently();

      //uri changes based on environment
      axios
        .get(`http://localhost:8000/api/user/user`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              email: user?.email
            }
          }
        )
        .then(res => {
          if(!res.data){
            //if false then create user. Backend will handle creating id and setting points for user
            axios
              .post(`http://localhost:8000/api/user/user`, { email: user?.email })
              .then(res => {
                alert("Success! User signed up \n\n" + res.data);
              })
              .catch(error => {
                alert("Failed to sign up user \n\n" + error);
              })
          } 
        })
        .catch(error => {
          alert("Failed to find user \n\n" + error);
        })
    } catch (error) {
      alert("Check user failed \n\n" + error);
    }
  };

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
                <GamesContainer user={user}/>
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