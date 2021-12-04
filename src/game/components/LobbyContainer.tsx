import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Row, Col, Button } from 'reactstrap';
import checkSvg from  '../../app/assets/icons/check-circle-fill.svg';
import dealerSvg from  '../../app/assets/icons/dice-5-fill.svg';

function LobbyContainer(props) {
  const gameId = Object.values(props.match.params)[0];
  const history = useHistory();
  const [players, setPlayers] = useState([]);
  const [user] = useState({ email: "alan@gmail.com" });
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    async function init() {
      const res = await axios.get(`http://localhost:8000/api/game/game`, {
        params: {
          gameId: gameId, 
        }
      });

      setPlayers(res.data.game.players);

      res.data.game.players.forEach(player => {
        if (player.email === user.email) {
          setPlayer(player);
          return;
        }
      });
    }
    init();
  }, [gameId, user.email]); 

  const start = () => {
    //discuss security - check permissions on backend
    axios
      .put(`http://localhost:8000/api/game/start`, {
        params: {
          gameId: gameId
        }
      })
      .then(res => {
        const gameId = res.data.game._id;

        history.push('/game/' + gameId)
      })
      .catch(error => {
        alert("Failed to start game \n\n" + error);
      })
  }

  return (
    <Fragment>
    <div className="waiting-room-container component-container">
      <Container className="themed-container" fluid={true}>
        <div className="content">
          <Row>
            <Col>
              <h3 className="text-light">Lobby</h3>
              </Col>
              <Col>
                <div className="start-game-button-container justify-content-end">
                  {player && player.isDealer && 
                    <Button className="align-self-end" color="info" onClick={start}>
                      Start game
                    </Button>
                  }
              </div>
            </Col>
          </Row>
        </div>
        <table className="table table">
          <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Handle</th>
            <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {players && players.map((user, index) =>
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{`${user.email} `}
                    {user.isDealer === true && <img alt='dealer' title="user is dealer" className='icon' src={dealerSvg}></img>}
                </td>
                <td> {<img alt='check' className='icon' title="user is ready to play" src={checkSvg}></img>}</td>
              </tr>)}
          </tbody>
        </table>
      </Container>
    </div>
    </Fragment>
  );
}

export default LobbyContainer;