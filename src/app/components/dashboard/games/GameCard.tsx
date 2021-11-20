import React from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import Game from '../../../../game/models/Game';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const GameCard = ({ game }: Props) => {
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
      history.push(`/game/lobby/${game.id}`);
    })
  .catch(error => {
    alert("Error! Could not add player to this game \n\n" + error);
  })

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
          <Button onClick={() => addPlayer()}>
            Join Game
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default GameCard;

type Props = {
  game: Game
};