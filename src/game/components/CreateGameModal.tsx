import axios from 'axios';
import React, { Component } from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Game from '../models/Game';

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
              <Label className="label-text" for="">Ante</Label>
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

    const newGame: Partial<Game> = {
      requiredPointsPerPlayer: 5000,
      anteAmount: 250,
    }
  
    axios
      .post(`http://localhost:8000/api/game/create`, { game: newGame })
      .then(res => {
        if(res.data){
          const { game } = res.data;

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