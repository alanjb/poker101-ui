import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Row, Col, Button } from 'reactstrap';
import checkSvg from  '../../app/assets/icons/check-circle-fill.svg';
import dealerSvg from '../../app/assets/icons/dice-5-fill.svg';
import socketIOClient from 'socket.io-client';
const ENDPOINT = "http://localhost:8000";

function LobbyContainer(props) {
  const gameId = Object.values(props.match.params)[0];
  const history = useHistory();
  const [players, setPlayers] = useState([]);
  const [user] = useState({ email: "alan@gmail.com" });
  const [player, setPlayer] = useState(null);
  const [timer, setTimer] = useState(null);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [gameStarted, setStartGame] = useState(false);

  const padTime = time => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  };

  const format = time => {
    // Convert seconds into minutes and take the whole part
    const minutes = Math.floor(time / 60);
  
    // Get the seconds left after converting minutes
    const seconds = time % 60;
  
    //Return combined values as string in format mm:ss
    return `${minutes}:${padTime(seconds)}`;
  };

  useEffect(() => {
    async function init() {
      const lobbytimerRes = await axios.put(`http://localhost:8000/api/game/initlobbytimer`, {
        params: {
          gameId: gameId 
        }
      });

      setPlayers(lobbytimerRes.data.game.players);

      lobbytimerRes.data.game.players.forEach(player => {
        if (player.email === user.email) {
          setPlayer(player);
          return;
        }
      });
    }
    init();

    const socket = socketIOClient(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});

    socket.on("getLobbyTimer", data => {
      if(data.gameId == gameId)
      setTimer(data.timer);
      return () => socket.disconnect();
    });

    socket.on("LobbytTimerExpired", data => {
      if(data.gameId == gameId)
      setIsTimerExpired(data.LobbytTimerExpired);
      return () => socket.disconnect();
    });

  }, [gameId, user.email]); 

  useEffect(() => {
    console.log("expired")
    if(isTimerExpired)
      start();
  }, [isTimerExpired]);

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

        setStartGame(true);

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
            <Col><h3 className="text-light">Lobby</h3></Col>
            {!gameStarted ? 
            <Col><span className="text-light">Game starts in: <time dateTime={timer}>{format(timer)}</time></span></Col> : null}
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