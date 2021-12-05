import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import Game from '../models/Game';
import RaiseModal from './RaiseModal';
import backOfCard from '../../app/assets/back.png';
import socketIOClient from 'socket.io-client';
import { resolve } from 'path';
import Player from '../models/Player';
const ENDPOINT = "http://localhost:8000";

const GameBoardContainer = (props: Props) => {
  const [isRaiseModalOpen, setRaiseModal] = useState(false);
  const [user] = useState({ email: "jim@gmail.com" });
  const [player, setPlayer] = useState(null);
  const [game, setGame] = useState(null);
  const gameId = Object.values(props.match.params)[0];
  const [gameLogger, setGameLogger] = useState([]);

  useEffect(() => {
    async function init() {
      const res = await axios.get(`http://localhost:8000/api/game/game`, {
        params: {
          gameId: gameId, 
        }
      });
    
      setGame(res.data.game);
      setGameLogger(res.data.game.roundCount === 1 ? res.data.game.roundOneMoves : res.data.game.roundTwoMoves);
  
      const player = res.data.game.players.find(player => 
        player.email === user.email
      );
  
      setPlayer(player);
    }
    init();

    const socket = socketIOClient(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

    socket.on("getUpdatedGame", updatedGame => {
      setGame(game => {
        return {
          ...game,
          players: updatedGame.players,
          roundOneMoves: updatedGame.roundOneMoves
        }
      })

      setGameLogger(updatedGame.roundCount === 1 ? updatedGame.roundOneMoves : updatedGame.roundTwoMoves);

      const player = updatedGame.players.find(player => 
        player.email === user.email
      );
      setPlayer(player);
      resolve();
      return () => socket.disconnect();
    });

  }, [gameId, user]); 

  const toggleRaiseModal = () => {
    setRaiseModal(!isRaiseModalOpen);
  }

  const check = async () => {
    try {
      const check = await axios.put(`http://localhost:8000/api/game/check`, { params: { gameId: gameId } });

      console.log(check)

      if (!check) {
        alert('Error: Could not check');
        return;
      }

      alert(player.email + ' has checked');

    }
    catch (error) {
      alert('Error: There was an issue processing the check request')
    };
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
  }

  const discard = () => {
    
  }

  const fold = () => {

  }

  return (
    <Fragment>
      { console.log(gameLogger)}
      <div className="game-board-container">
        {game && game.players &&
          <div className="opposing-players-container">
            {game && game.players.map((player: Player, i: number) => {
              if (!player.isDealer) {
                return <div key={i} className={`player-container opposing-player-container${i}`}>
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
            <div className="player-game-controls-container">
                <div className="player-cards-container">
                  cards here
                </div>
                <br/> 
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
              
              <br />
              <br/>

              <div className="player-username-container">
                  {player.email}, ${player.points} 
              </div>
            </div>
          
            <div className="game-logger">
              <div>
                <strong>Game Log</strong>
              </div>
            {gameLogger.map(((update, i) =>
              <div key={i}>
                <span> {update?.move} {update?.bet} </span>
              </div>
              ))}
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