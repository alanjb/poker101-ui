import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import Game from '../../../../game/models/Game';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const GameCard = ({ game }) => {
  const [joined, setJoined] = useState(false);
  const history = useHistory();
  const [user] = useState({ email: "jim@gmail.com" });

  useEffect(() => {
    game.players.forEach(player => {
      if (player.email === user.email) {
        setJoined(true);
      }
    })
  }, []); 

  //don't allow dup players
  function addPlayer() {
    axios
      .put(`http://localhost:8000/api/game/add-player`, {
        params: {
          gameId: game._id,
          userId: '61a565bc5073df63ea2530f1'
        }
      })
      .then(() => {
        setJoined(true);
      })
      .catch(error => {
        alert("Error! Could not add player to this game \n\n" + error);
      })
  }

  function goToLobby() {
    history.push('/lobby/' + game._id)
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
                Players: {game.players.map(player => {
                  return <span>   {player.email}   </span>
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

type Props = {
  game: Game
};

export default GameCard;