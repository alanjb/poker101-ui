import axios from 'axios';
import { Component } from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Game from '../models/Game';
import Player from '../models/Player';

class CreateGameModal extends Component<Props> {
  render() {
    const { isOpen, toggle } = this.props;
    const { create } = this;

    return (
      <Modal size="lg" {...{ isOpen, toggle }}>
        <ModalHeader>Create New Game</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label className="label-text" for="">Required chips per player</Label>
              <Input type="email" name="email" id="exampleEmail" /><br/>
            </FormGroup>
            <FormGroup>
              <Label className="label-text" for="">Anti price</Label>
              <Input type="text" name="" id="" /><br/>
            </FormGroup>
            <FormGroup>
              <Label className="label-text" for="">Invite players (up to 5)</Label>
              <Input type="text" name="" id="" /><br/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={create}>Create</Button>
          <Button color="warning" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }

  create = () => {
    const { created } = this.props;
    const playersArray: Partial<Player>[] = [];

    const p1: Partial<Player> = {
      id: 'gf93j023jg',
      points: 3823
    }

    const p2: Partial<Player> = {
      id: '390gj3h8g2',
      points: 8390
    }

    playersArray.push(p1);
    playersArray.push(p2);

    //use Partial here, only need requiredPointsPerPlayer, antiAmount, players
    const newGame: Partial<Game> = {
      requiredPointsPerPlayer: 5000,
      antiAmount: 250,
      players: playersArray
    }
  
    axios
      .post(`http://localhost:8000/api/game/create`, { game: newGame })
      .then(res => {
        if(res.data){
          const { game } = res.data;

          console.log(game)

          created(game);
        }
      })
      .catch(error => {
        alert("Failed to create game \n\n" + error);
      })
  }
}

export default CreateGameModal;

type Props = {
  isOpen: boolean;
  toggle: () => void;
  created: (game: Game) => void;
};