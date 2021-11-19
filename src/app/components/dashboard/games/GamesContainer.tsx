import React, { Component } from 'react';
import Game from '../../../../game/models/Game';
import GameCard from '../games/GameCard';
import axios from 'axios';

class GamesContainer extends Component<Props, State> {
  state: State =  {
    games: []
  }

  componentDidMount() {
    this.init();
  }

  init() {
    return axios
      .get(`http://localhost:8000/api/game/games`)
      .then(res => {
        if(res.data){
          const { games } = res.data;

          this.setState({
            games: games
          });
        }
      })
    .catch(error => {
      alert("Failed to get games \n\n" + error);
    })
  }

  render() {
    return (
      <div className="games-container">
        <div className="games-status-container starting-games-container">
          <h5 className="container-subtitle">Starting</h5>
          {this.state.games.map((game, i) => {
            if (game.status === 'starting') {
              return <GameCard key={i} game={game}/>
            }
          })}
        </div>

        <div className="games-status-container inProgress-games-container">
          <h5 className="container-subtitle">In Progress</h5>
            {this.state.games.map((game,i) => {
              if (game.status === 'in progress') {
                return <GameCard key={i} game={game}/>
              }
            })}
        </div>

        <div className="games-status-container starting-games-container">
          <h5 className="container-subtitle">Complete</h5>
            {this.state.games.map((game,i) => {
              if (game.status === 'complete') {
                return <GameCard key={i} game={game}/>
              }
            })}
        </div>

        <div className="games-status-container inProgress-games-container">
          <h5 className="container-subtitle">Aborted</h5>
            {this.state.games.map((game,i) => {
              if (game.status === 'aborted') {
                return <GameCard key={i} game={game}/>
              }
            })}
        </div>

        <div className="games-status-container inProgress-games-container">
          <h5 className="container-subtitle">Wins/Loses</h5>
        </div>
      </div>
    );
  }
}

export default GamesContainer;

type State = {
  games: Game[];
}

type Props = {
  user: unknown;
};