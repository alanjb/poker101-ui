import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const GameCard = ({ game }) => {
  const [joined, setJoined] = useState(false);
  const history = useNavigate();
  const [user] = useState({ email: "jim@gmail.com" });
  const [players, setPlayers] = useState([]);

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
      .put(`http://localhost:8000/api/game/add-player`, {
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