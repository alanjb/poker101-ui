import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import Game from '../models/Game';
import RaiseModal from './RaiseModal';
import backOfCard from '../../app/assets/back.png';

const GameBoardContainer = (props: Props) => {
  const [isRaiseModalOpen, setRaiseModal] = useState(false);
  const [user] = useState({ email: "timmy@gmail.com" });
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

  const toggleRaiseModal = () => {
    setRaiseModal(!isRaiseModalOpen);
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

  const raised = (game: Game) => {
    alert(player.email + ' has raised');
    setGame(game);
  }

  const discard = () => {
    
  }

  const fold = () => {

  }

  return (
    <Fragment>
      <div className="game-board-container">
        {game && game.players &&
          <div className="opposing-players-container">
            {game && game.players.map((player, i) => {
              if (!player.isDealer) {
                return <div className={`player-container opposing-player-container${i}`}>
                  <div className="player-cards-container">
                    <img alt="backOfCard" className="backOfCard" src={backOfCard}></img>
                    <img alt="backOfCard" className="backOfCard" src={backOfCard}></img>
                    <img alt="backOfCard" className="backOfCard" src={backOfCard}></img>
                    <img alt="backOfCard" className="backOfCard" src={backOfCard}></img>
                    <img alt="backOfCard" className="backOfCard" src={backOfCard}></img>
                  </div>
                  {player.email}, ${player.points}
                </div>
              }
              else {
                return null;
              }
            })}
          </div>
        }
        
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

            </div>

            <br/> 
          
            <div className="player-game-controls-container">
              <Button className="game-button" color="secondary" onClick={check} disabled={!player.isTurn}>
                Check
              </Button>

              <Button className="game-button" color="primary" onClick={call} disabled={!player.isTurn}>
                Call
              </Button>
    
              <Button className="game-button" color="info" onClick={toggleRaiseModal} disabled={!player.isTurn}>
                Raise
              </Button>
            
              <Button className="game-button" color="warning" onClick={discard} disabled={!player.isTurn}>
                Discard 
              </Button>
            
              <Button className="game-button" color="danger" onClick={fold} disabled={!player.isTurn}>
                Fold
              </Button>
            </div>
            <br/>
            <div>
              <div className="player-username-container">
                {player.email}, ${player.points} 
              </div>
            </div>
          </div>
        }
      </div>
      <RaiseModal isOpen={isRaiseModalOpen} toggle={toggleRaiseModal} raised={raised} game={game}/>
    </Fragment>
  );
}

type Props = {
  game: Game,
  match: any
};

export default GameBoardContainer;