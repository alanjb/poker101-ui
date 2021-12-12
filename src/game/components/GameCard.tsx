import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { getEnv } from '../../app/config/utils';


const GameCard = ({ game }) => {
  const [joined, setJoined] = useState(false);
  const history = useNavigate();
  const [user] = useState({ email: "timmy@gmail.com" });
  const [players, setPlayers] = useState([]);
  const url = getEnv();

  useEffect(() => {
    setPlayers(game.players);

    game.players.forEach(player => {
      if (player.email === user.email) {
        setJoined(true);
      }
    })
  }, [game.players, user.email]); 

  //don't allow dup players
  function addPlayer() {
    axios
      .put(`${url}/api/game/add-player`, {
        params: {
          gameId: game._id,
          userId: '61b3e7d68df175f88a5c8694'
        }
      })
      .then(res => {
        if (res.data.is_error) {
          alert(res.data.message);
        }
        else {
          setJoined(true);
          setPlayers(res.data.game.players);
        }
      })
      .catch(() => {
        alert("Error: Could not add player to this game");
      })
  }

  function goToLobby() {
    history('/lobby/' + game._id);
  }

  function leaveGame() {
    
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>
            Game ID: {game._id}
            {game && game.players && (
            <div className="players">
                Players: {players.map((player,i) => {
                  return <span key={i}> {player.email}{i+1 < players.length && ','} </span>
                })}
              </div>
            )}
            {game && game.status === 'complete' &&
              <div>
                Winner: {game.winner.email}
                <br></br>
                <br></br>
                {game.gameLog.map(((update, i) =>
                <div key={i}>
                  <span>{update?.player.email} {update?.move} {update?.bet} </span>
                </div>
                ))}

              </div>
            }
          </CardTitle>
          <div>
            {(!joined && game.status === 'starting') && <Button onClick={() => addPlayer()}>
              Join Game
            </Button>
            }

            {joined &&
              <Button color="primary" onClick={() => goToLobby()}>
                Go to Lobby
              </Button>
            }

            {joined &&
              <Button className="game-card-button" color="warning" onClick={() => leaveGame()}>
                Leave Game
              </Button>
            }
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default GameCard;