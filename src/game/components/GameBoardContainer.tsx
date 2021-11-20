import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import Game from '../models/Game';

class GameContainer extends Component<State> {
  state: State = {
    game: null
  }

  componentDidMount() {
    this.init();
  }

  init() {
    // const id = this.props.match.params.id;
    // const prevId = prevProps.match.params.id;

    //get this game through
    // axios
    // .get(`http://localhost:8000/api/player/deck/discard`, { })
    // .then(game => {
    //   this.setState({
    //     game: game
    //   })
    // })
    // .catch(error => {
    //   alert("Error! Failed to discard cards: " + error);
    // })
  }

  render() {
    const { game } = this.state;

    console.log(game);

    return (
      <Fragment>
        <div className="game-board-container">
          <div className="chip-pot-container">
            <div className="pot-data">
              Total Pot <br/><br/>
              $200
            </div>
          </div>

          <div className="player-container opposing-player-container0 play"> 
            <div className="player-cards-container">
              {/* Render back of card for all the opposing players */}
            </div>
            <br/>
            <div className="player-username-container">
              user0
            </div>
          </div>

          <div className="player-container user-player-container"> 
            <div className="player-cards-container">
              {/* Get players cards and render based on card deck asset set */}
            </div>
            <br/>
            <div className="player-username-container">
              boyce.alan21
            </div>
            <br /><br/>
            <div className="player-game-controls-container">
              <Button variant="primary" onClick={this.bet}>
                Bet
              </Button>
              <Button variant="primary" onClick={this.check}>
                Check
              </Button>
              <Button variant="primary" onClick={this.call}>
                Call
              </Button>
              <Button variant="primary" onClick={this.raise}>
                Raise
              </Button>
              <Button variant="primary" onClick={this.fold}>
                Fold
              </Button>
              <Button variant="danger" onClick={this.discard}>
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

  bet = () => {
    console.log('bet...')
  }

  check = () => {
    axios
      .put(`http://localhost:8000/api/game/check`, {
        params: {
          gameId: '61948c149dd2b0b6a6d5c62f',
          playerId: 456
        }
      })
      .then(game => {
        
      })
      .catch(error => {
        alert("Error! Failed to discard cards: " + error);
      })
  }

  call = () => {
    console.log('call...')
  }

  raise = () => {
    console.log('raise...')
  }

  fold = () => {
    console.log('fold...')
  }

  discard = () => {
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
        alert("Error! Failed to discard cards: " + error);
      })
  }
}

type State = {
  game: Game;
}

export default GameContainer;