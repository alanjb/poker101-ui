import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import RaiseModal from './RaiseModal';
import backOfCard from '../../app/assets/back.png';
import socketIOClient from 'socket.io-client';
import Player from '../models/Player';
import { useParams } from 'react-router-dom';
import { getEnv } from '../../app/config/utils';

const GameBoardContainer = () => {
  const [isRaiseModalOpen, setRaiseModal] = useState(false);
  const { gameId } = useParams();
  const [user] = useState({ email: "alan@gmail.com" });
  const [player, setPlayer] = useState(null);
  const [game, setGame] = useState(null);
  const [gameLogger, setGameLogger] = useState([]);
  const url = getEnv();

  useEffect(() => {
    async function init() {
      try {
        const res = await axios.get(`${url}/api/game/game`, {
          params: {
            gameId: gameId, 
          }
        });

        setGame(res.data.game);

        //create a queue here so it shows correct order of events 
        setGameLogger(res.data.game.gameLog);
    
        const player = res.data.game.players.find(player => 
          player.email === user.email
        );
    
        setPlayer(player);

        const socket = socketIOClient(url, { transports: ['websocket', 'polling', 'flashsocket'] });

        socket.on("getUpdatedGame", updatedGame => {
          setGame(game => {
            return {
              ...game,
              players: updatedGame.players,
              roundOneMoves: updatedGame.roundOneMoves,
              roundTwoMoves: updatedGame.roundTwoMoves,
              pot: updatedGame.pot,
              roundCount: updatedGame.roundCount
            }
          })
    
          setGameLogger(updatedGame.gameLog);

          const player = updatedGame.players.find(player => 
            player.email === user.email
          );
          setPlayer(player);
          return () => socket.disconnect();
        });
      }
      catch (error) {
        alert('Error: Could not get game')
      }
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, user]); 

  const toggleRaiseModal = () => {
    setRaiseModal(!isRaiseModalOpen);
  }

  const check = () => {
    axios
      .put(`${url}/api/game/check`, {
        params: {
          gameId: gameId,
        }
      })
      .then(res => {
        if (res.data.is_error) {
          alert(res.data.message);
        }
        else {
          alert(player.email + ' has checked');
        }  
      })
      .catch(() => {
        alert("Error: Failed to check");
      })
  }

  const call = () => {
    axios
      .put(`${url}/api/game/call`, {
        params: {
          gameId: gameId,
        }
      })
      .then(() => {
        alert(player.email + ' has called');
      })
      .catch(() => {
        alert("Error: Failed to call" );
      })
  }

  const raised = () => {
    alert(player.email + ' has raised');
    toggleRaiseModal();
  }

  const fold = () => {
    axios
      .put(`${url}/api/game/fold`, {
        params: {
          gameId: gameId,
        }
      })
      .then(res => {
        if (res.data.is_error) {
          alert(res.data.message);
        }
        else {
          alert(player.email + ' has folded');
        }  
      })
      .catch(() => {
        alert("Error: Failed to fold");
      })
  }

  return (
    <Fragment>
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
                  {player.hand.map(card => <span>{card.symbol} {card.suit}<br/></span>)}
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
                  <span>{update?.player.email} {update?.move} {update?.bet} </span>
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

export default GameBoardContainer;