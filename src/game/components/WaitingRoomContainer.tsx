import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import checkSvg from  '../../app/assets/icons/check-circle-fill.svg';
import dealerSvg from  '../../app/assets/icons/dice-5-fill.svg';
import waitSvg from  '../../app/assets/icons/hourglass-split.svg';

let users = [
             {handle: '@Alan', isDealer: 'true', isReady: true}, 
             {handle: '@Matt', isDealer: 'false', isReady: false}, 
             {handle: '@Obeyd', isDealer: 'false', isReady: true}
            ];

class WaitingRoomContainer extends Component {

  start() {
    axios
      .put(`http://localhost:8000/api/game/start`, {
        params: {
          gameId: '61986712d1788dc2bd6e494e', //get from url
        }
      })
      .then(res => {
        if(res.data){
          console.log(res.data); 
        }
      })
      .catch(error => {
        alert("Failed to get games \n\n" + error);
      })
  }

  render() {
    const { start } = this;

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
}

export default WaitingRoomContainer;