import axios from 'axios';
import React, { Component } from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Game from '../models/Game';

class BetModal extends Component<Props> {

  render() {
    const { isOpen, toggle } = this.props;
    const { create } = this;

    return (
      <Modal size="lg" {...{ isOpen, toggle }}>
        <ModalHeader>How much do you want to bet?</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label className="label-text" for="">Bet Amount</Label>
              <Input type="number" name="bet" id="bet-amount" /><br/>
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
    const { betted } = this.props;

    const newGame: Partial<Game> = {
      requiredPointsPerPlayer: 5000,
      anteAmount: 250,
    }
  
    axios
      .post(`http://localhost:8000/api/game/create`, { game: newGame })
      .then(res => {
        if(res.data){
          const { game } = res.data;

        }
      })
      .catch(error => {
        alert("Failed to create game \n\n" + error);
      })
  }
}

type Props = {
  isOpen: boolean;
  toggle: () => void;
  betted: (game: Game) => void;
};

export default BetModal;