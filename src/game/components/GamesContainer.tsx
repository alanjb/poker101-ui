import React, { Component } from 'react';
import Game from '../models/Game';
import GameCard from './GameCard';

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

        <div className="games-status-container in-progress-games-container">
          <h5 className="container-subtitle">In Progress</h5>
          {this.props.games.map((game, i) => {
            return game.status === 'in progress' && <GameCard key={i} game={game}/>
          })}
        </div>

        <div className="games-status-container complete-games-container">
          <h5 className="container-subtitle">Complete</h5>
          {this.props.games.map((game, i) => {
            return game.status === 'complete' && <GameCard key={i} game={game}/>
          })}
        </div>

        <div className="games-status-container aborted-games-container">
          <h5 className="container-subtitle">Aborted</h5>
          {this.props.games.map((game, i) => {
            return game.status === 'aborted' && <GameCard key={i} game={game}/>
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

