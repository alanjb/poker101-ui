import React, { Component, Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import Game from '../models/Game';
import BetModal from './BetModal';

const GameBoardContainer = (props: Props) => {
  const [isBetModalOpen, setBetModal] = useState(false);
  const [user] = useState({ email: "test@gmail.com" });
  const [player, setPlayer] = useState(null);
  const [game, setGame] = useState(null);
  const gameId = Object.values(props.match.params)[0];

  useEffect(() => {
    init();
  }, []); 

  async function init() {
    const res = await axios.get(`http://localhost:8000/api/game/game`, {
      params: {
        gameId: gameId, 
      }
    });

    console.log(res.data.game)

    setGame(res.data.game);

    const player = res.data.game.players.find(player => 
      player.email === user.email
    );

    setPlayer(player);
  }

  const toggleBetModal = () => {

  }

  const check = () => {
    axios
      .put(`http://localhost:8000/api/game/check`, {
        params: {
          gameId: gameId,
        }
      })
      .then(game => {
        console.log(game)
      })
      .catch(error => {
        alert("Error: Failed to check: " + error);
      })
  }

  return (
    <Fragment>
      <div className="game-board-container">
        <div className="chip-pot-container">
          <div className="pot-data">
            <b>Round {game && game.roundCount}</b>
              <br/><br/>
            Total Pot: 
            ${game && game.pot}
          </div>
        </div>

        {player && 
          <div className="player-container user-player-container"> 
            <div className="player-cards-container">
              {/* Get players cards and render based on card deck asset set */}
            </div>
            <br/>
          
          <div className="player-username-container">
            {player.email}
          </div>
          <br/>
          
          <div className="player-game-controls-container">
            <Button className="game-button" color="secondary" onClick={check} disabled={!player.isTurn}>
              Check
            </Button>
            {/* <Button className="game-button" color="primary" onClick={this.toggleBetModal}>
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
            </Button> */}
          </div>
          <br/>
          <div>
            Your money: ${player.points}
          </div>
        </div>
        }
      </div>
    </Fragment>
  );


}

type Props = {
  game: Game,
  match: any
};

export default GameBoardContainer;