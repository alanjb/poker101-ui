import React, { Component } from 'react';
import Game from '../../../../game/models/Game';
import GameCard from '../games/GameCard';

class GamesContainer extends Component<Props> {
  render() {
    return (
      <div className="games-container">
        <div className="games-status-container starting-games-container">
          <h5 className="container-subtitle">Starting</h5>
          {this.props.games.map((game, i) => {
            return game.status === 'starting' && <GameCard key={i} game={game}/>
          })}
        </div>
      </div>
    );
  }
}

type Props = {
  games: Game[];
};

export default GamesContainer;

