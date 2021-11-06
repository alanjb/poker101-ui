import { Component, Fragment } from 'react';
import history from '../routing/history';
import CreateGameModal from '../../game/components/CreateGameModal';
import { Button, Col, Container, Row } from 'reactstrap';
import Game from '../../game/models/Game';

class DeviceManagerContainer extends Component {
  state: State = {
    isCreateGameModalOpen: false,
  };

  render() {
    const { isCreateGameModalOpen } = this.state;
    const { toggleCreateGameModal, gameCreated } = this;

    return (
      <Fragment>
        <div className="dashboard-container">
          <Container className="component-container dashboard-header themed-container" fluid={true}>
            <Row>
              <Col>
                <h2 className="dashboard-header-text">Dashboard</h2>
              </Col>
              <Col>
                <div className="create-button-container justify-content-end">
                  <Button className="align-self-end" color="info" onClick={toggleCreateGameModal}>
                    Create new game
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <CreateGameModal isOpen={isCreateGameModalOpen} toggle={toggleCreateGameModal} created={gameCreated} />
      </Fragment>
    );
  }

  toggleCreateGameModal = () => {
    this.setState({ isCreateGameModalOpen: !this.state.isCreateGameModalOpen });
  };

  gameCreated = (game: Game) => {
    const { toggleCreateGameModal } = this;

    toggleCreateGameModal();

    history.push(`/game/${1}`);
  }
}

type State = {
  isCreateGameModalOpen: boolean;
}

export default DeviceManagerContainer;