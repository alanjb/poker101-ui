import axios from 'axios';
import React, { Component } from 'react';
import Game from '../../../../game/models/Game';
import GameCard from '../Games/GameCard';


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
      alert("Failed to create game \n\n" + error);
    })
  }

  render() {
    return (
      <div className="games-container">
        <h5 className="container-subtitle">Starting</h5>
        {this.state.games.map(game => {
          return <GameCard title={game.id} subTitle={game.status} text={game.status}/>
        })}
      </div>
    );
  }
}

export default GamesContainer;

type State = {
  games: Game[];
}

type Props = {

};