import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import Game from '../models/Game';
import BetModal from './BetModal';

class GameContainer extends Component<State> {
  state: State = {
    game: null,
    isBetModalOpen: false
  }

  componentDidMount() {
    this.init();
  }

  init() {
    axios
      .get(`http://localhost:8000/api/game/game`, {
        params: {
          gameId: '619d8b58424cb2d8763e017f', //get from url
        }
      })
      .then(res => {
        if (res.data) {
          this.setState({
            game: res.data.game
          })
        }
      })
      .catch(error => {
        alert("Failed to get game \n\n" + error);
      })
  }

  toggleBetModal = () => {
    this.setState({
      isBetModalOpen: !this.state.isBetModalOpen
    });
  }

  render() {
    const { game, isBetModalOpen } = this.state;

    return (
      <Fragment>
        <div className="game-board-container">
          Round {game && game.roundCount}
          <div className="chip-pot-container">
            <div className="pot-data">
              <b>Round {game && game.roundCount}</b>
                <br/><br/>
              Total Pot: 
              ${game && game.pot}
            </div>
          </div>
          
          <div className="player-container opposing-player-container0 play"> 
            <div className="player-cards-container">
              {/* Render back of card for all the opposing players */}
            </div>
            <br/>
            <div className="player-username-container">
              
            </div>
          </div>

          <div className="player-container user-player-container"> 
            <div className="player-cards-container">
              {/* Get players cards and render based on card deck asset set */}
            </div>
            <br/>
            <div className="player-username-container">

            </div>
            <br /><br />
            { /* wrap in isTurn conditional */}
            <div className="player-game-controls-container">
              <Button className="game-button" color="secondary" onClick={this.check}>
                Check
              </Button>
              <Button className="game-button" color="primary" onClick={this.toggleBetModal}>
                Bet
              </Button>
              <Button className="game-button" color="dark" onClick={this.call}>
                Call
              </Button>
              <Button className="game-button" color="info" onClick={this.raise}>
                Raise
              </Button>
              <Button className="game-button" color="warning" onClick={this.discard}>
                Discard 
              </Button>
              <Button className="game-button" color="danger" onClick={this.fold}>
                Fold
              </Button>
            </div>
            <br/>
            <div>
              Your money: $
            </div>
          </div>
        </div>
        <BetModal isOpen={isBetModalOpen} toggle={this.toggleBetModal} betted={this.onBet} />
      </Fragment>
    );
  }

  onBet = () => {
    console.log('betted!')
  }

  bet = () => {
    console.log('bet...')
  }

  check = () => {
    axios
      .put(`http://localhost:8000/api/game/check`, {
        params: {
          gameId: '61986712d1788dc2bd6e494e',
        }
      })
      .then(game => {
        console.log(game)
      })
      .catch(error => {
        alert("Error: Failed to check: " + error);
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
  isBetModalOpen: boolean;
}

export default GameContainer;