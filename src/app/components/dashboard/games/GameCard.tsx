import React, { useState } from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import Game from '../../../../game/models/Game';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const GameCard = ({ game }: Props) => {
  const [joined, setJoined] = useState(false);
  const history = useHistory();

  function addPlayer() {
    axios
      .put(`http://localhost:8000/api/game/add-player`, {
        params: {
          gameId: game._id,
          playerId: '619f0638d87a813884977683'
        }
      })
      .then(res => {
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

  console.log(game.players)

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">
            Game ID: {game._id}
            {game && game.players && (
            <div className="players">
                Players: {game.players.map(player => {
                  return <p>{player.email}</p>
                })}
            </div>
            )
            }

          </CardTitle>
          <div>
            {!joined && <Button onClick={() => addPlayer()}>
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