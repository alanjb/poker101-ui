/* eslint-disable jsx-a11y/alt-text */
import { Component, Fragment } from 'react';
import axios from 'axios';
import backOfCard from '../../app/assets/back.png';
import { Button } from 'reactstrap';

class DeviceManagerContainer extends Component {

  render() {
    return (
      <Fragment>
        <div className="game-board-container">
          <div className="chip-pot-container">
            <div className="pot-data">
              Total Pot <br/><br/>
              $10.00
            </div>
          </div>

          <div className="player-container opposing-player-container4 play"> 
            <div className="player-cards-container">
            <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
            </div>
            <br/>
            <div className="player-username-container">
              user4
            </div>
          </div>

          <div className="player-container opposing-player-container3 play"> 
            <div className="player-cards-container">
            <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
            </div>
            <br/>
            <div className="player-username-container">
              user3
            </div>
          </div>

          <div className="player-container opposing-player-container2 play"> 
            <div className="player-cards-container">
            <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
            </div>
            <br/>
            <div className="player-username-container">
              user2
            </div>
          </div>

          <div className="player-container opposing-player-container1 play"> 
            <div className="player-cards-container">
            <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
            </div>
            <br/>
            <div className="player-username-container">
              user1
            </div>
          </div>

          <div className="player-container opposing-player-container0 play"> 
            <div className="player-cards-container">
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
            </div>
            <br/>
            <div className="player-username-container">
              user0
            </div>
          </div>

          <div className="player-container user-player-container"> 
            <div className="player-cards-container">
            <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
              <img className="backOfCard" src={backOfCard}></img>
            </div>
            <br/>
            <div className="player-username-container">
              boyce.alan21
            </div>
            <br /><br/>
            <div className="player-game-controls-container">
              <Button variant="primary" onClick={this.discardSelectedCards}>
                Fold
              </Button>
              <Button variant="primary" onClick={this.discardSelectedCards}>
                Check
              </Button>
              <Button variant="primary" onClick={this.discardSelectedCards}>
                Bet
              </Button>
                <Button variant="danger" onClick={this.discardSelectedCards}>
                Discard 
              </Button>
            </div>
            <br/>
            <div>
              Your money: $50.00
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  discardSelectedCards = () => {
    console.log('Discard selected cards...')

    const selectedCardsToDiscard = [{ id: 123, face: 'Ace', suit: 'Spades'}];
  
    //get other settings - use a create new game modal 
    axios
      .delete(`http://localhost:8000/api/player/deck/discard`, {data: selectedCardsToDiscard})
      .then(res => {
        if(res.data){
          console.log('Selected cards deleted...')
        }
      })
      .catch(error => {
        alert("Error! Failed to create game: " + error);
      })
  }
}

export default DeviceManagerContainer;