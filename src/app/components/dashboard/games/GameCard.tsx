import React from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import Game from '../../../../game/models/Game';
import { useHistory } from "react-router-dom";

const GameCard = ({ game }: Props) => {
  const history = useHistory();

  function goToGame() {
    history.push(`/game/${game.id}`)
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
          <Button onClick={() => goToGame()}>
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