import axios from 'axios';
import React, { Component, Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Row, Col, Button } from 'reactstrap';
import checkSvg from  '../../app/assets/icons/check-circle-fill.svg';
import dealerSvg from  '../../app/assets/icons/dice-5-fill.svg';
import waitSvg from '../../app/assets/icons/hourglass-split.svg';

let users = [
             {handle: '@Alan', isDealer: 'true', isReady: true}, 
             {handle: '@Matt', isDealer: 'false', isReady: false}, 
             {handle: '@Obeyd', isDealer: 'false', isReady: true}
            ];

function WaitingRoomContainer(props) {
  const gameId = props.match.params;
  const history = useHistory();

  const start = () => {
    //discuss security - check permissions on backend

    console.log(gameId)

    axios
      .put(`http://localhost:8000/api/game/start`, {
        params: {
          gameId: gameId
        }
      })
      .then(res => {
        const gameId = res.data.game._id;

        history.push('/game/' + gameId)
      })
      .catch(error => {
        alert("Failed to start game \n\n" + error);
      })
  }

  return (
    <Fragment>
    <div className="waiting-room-container component-container">
      <Container className="themed-container" fluid={true}>
        <div className="content">
          <Row>
            <Col>
              <h3 className="text-light">Waiting Room</h3>
              </Col>
              <Col>
              <div className="start-game-button-container justify-content-end">
                <Button className="align-self-end" color="info" onClick={start}>
                  Start game
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <table className="table table">
          <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Handle</th>
            <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => 
              <tr>
                <th scope="row">{index+1}</th>
                <td>{`${user.handle} `}
                    {user.isDealer === 'true' && <img alt='dealer' title="user is dealer" className='icon' src={dealerSvg}></img>}
                </td>
                <td> {user.isReady ? <img alt='check' className='icon' title="user is ready to play" src={checkSvg}></img> : <img alt='wait' title="user waiting to be added"  className='icon'  src={waitSvg}></img>}</td>
              </tr>)}
          </tbody>
        </table>
      </Container>
    </div>
    </Fragment>
  );
}

export default WaitingRoomContainer;