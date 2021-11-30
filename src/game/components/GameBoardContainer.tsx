import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import Game from '../models/Game';
import BetModal from './BetModal';
import RaiseModal from './RaiseModal';

const GameBoardContainer = (props: Props) => {
  const [isBetModalOpen, setBetModal] = useState(false);
  const [isRaiseModalOpen, setRaiseModal] = useState(false);
  const [user] = useState({ email: "bill@gmail.com" });
  const [player, setPlayer] = useState(null);
  const [game, setGame] = useState(null);
  const gameId = Object.values(props.match.params)[0];

  useEffect(() => {
    async function init() {
      const res = await axios.get(`http://localhost:8000/api/game/game`, {
        params: {
          gameId: gameId, 
        }
      });
    
      setGame(res.data.game);
  
      const player = res.data.game.players.find(player => 
        player.email === user.email
      );
  
      setPlayer(player);
    }
    init();
  }, [gameId, user.email]); 

  const toggleBetModal = () => {
    setBetModal(!isBetModalOpen);
  }

  const toggleRaiseModal = () => {
    setRaiseModal(!isRaiseModalOpen);
  }

  const betted = () => {
    console.log('betted')
  }

  const check = () => {
    axios
      .put(`http://localhost:8000/api/game/check`, {
        params: {
          gameId: gameId,
        }
      })
      .then(game => {
        alert(player.email + ' has checked');
        setGame(game);
      })
      .catch(error => {
        alert("Error: Failed to check: " + error);
      })
  }

  const call = () => {
    axios
      .put(`http://localhost:8000/api/game/call`, {
        params: {
          gameId: gameId,
        }
      })
      .then(game => {
        alert(player.email + ' has called');
        console.log(game)
      })
      .catch(error => {
        alert("Error: Failed to call: " + error);
      })
  }

  const raised = () => {
    console.log('raised')
  }

  const discard = () => {
    
  }

  const fold = () => {

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

        {game && player && 
          <div className="player-container user-player-container"> 
            <div className="player-cards-container">
              {/* Get players cards and render based on card deck asset set */}
            </div>
            <br/> <br/>
          
            <div className="player-game-controls-container">
              <Button className="game-button" color="secondary" onClick={check} disabled={!player.isTurn && (game.bet === 0) }>
                Check
              </Button>

              <Button className="game-button" color="primary" onClick={toggleBetModal} disabled={!player.isTurn  && (game.bet === 0)}>
                Bet
              </Button>

              <Button className="game-button" color="dark" onClick={call} disabled={!player.isTurn && !(game.bet === 0)}>
                Call
              </Button>
    
              <Button className="game-button" color="info" onClick={toggleRaiseModal} disabled={!player.isTurn && !(game.bet === 0)}>
                Raise
              </Button>
            
              <Button className="game-button" color="warning" onClick={discard} disabled={!player.isTurn && !(game.bet === 0)}>
                Discard 
              </Button>
            
              <Button className="game-button" color="danger" onClick={fold} disabled={!player.isTurn}>
                Fold
              </Button>
            </div>
            <br/>
            <div>
              <div className="player-username-container">
                {player.email} <br/>  <br/> 
                ${player.points}
              </div>
            </div>
          </div>
        }
      </div>
      <BetModal isOpen={isBetModalOpen} toggle={toggleBetModal} betted={betted} />
      <RaiseModal isOpen={isBetModalOpen} toggle={toggleBetModal} raised={raised} />
    </Fragment>
  );
}

type Props = {
  game: Game,
  match: any
};

export default GameBoardContainer;