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
          gameId: '61948c149dd2b0b6a6d5c62f',
          playerId: '61948bea9dd2b0b6a6d5c62c'
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
    history.push('/lobby/' + game.id)
  }

  function leaveGame() {
    
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">
            Game ID: {game.status}
            <div className="players">
              Players: {game.players}
            </div>
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