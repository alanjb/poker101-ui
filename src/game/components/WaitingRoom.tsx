import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import checkSvg from  '../../app/assets/icons/check-circle-fill.svg';
import dealerSvg from  '../../app/assets/icons/dice-5-fill.svg';
import waitSvg from  '../../app/assets/icons/hourglass-split.svg';

let users = [
             {handle: '@Alan', isDealer: 'true', isReady: true}, 
             {handle: '@Matt', isDealer: 'false', isReady: false}, 
             {handle: '@Obeyd', isDealer: 'false', isReady: true}
            ];

class WaitingRoom extends Component { 
  render() {
    return (
      <Fragment>
      <div className="waiting-room-container">
        <Container className="component-container themed-container" fluid={true}>
          <div className="content">
            <Row>
              <Col>
                <h3 className="text-light">Waiting Room</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* <GamesContainer user={user}/> */}
              </Col>
            </Row>
          </div>
          <table className="table table-light">
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
                      {user.isDealer === 'true' && <img alt='dealer' src={dealerSvg}></img>}
                  </td>
                  <td> {user.isReady ? <img alt='check' src={checkSvg}></img> : <img alt='wait' src={waitSvg}></img>}</td>
                </tr>)}
            </tbody>
          </table>
        </Container>
      </div>
      </Fragment>
    );
  }
}

export default WaitingRoom;