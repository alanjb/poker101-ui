import axios from 'axios';
import React from 'react';
import { Modal, ModalBody, ModalHeader} from 'reactstrap';
import { Formik, Form} from 'formik';
import FormikField from "../../app/components/dashboard/FormikField/index";
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import Game from '../models/Game';

function BetModal(props: Props) {
  const { isOpen, toggle, game } = props;

    const bet = (values: any) => {
      const { betted } = props;
      const {bet} = values;
    
      axios
        .post(`http://localhost:8000/api/game/bet`,
          {
            gameId: game._id,
            bet: bet
          })
        .then(res => {
          const { game } = res.data;

          betted(game);
        })
        .catch(error => {
          alert("Failed to create game \n\n" + error);
        })
    }

    const CreateGameSchema = Yup.object().shape({
      bet: Yup.number()
        .min(0, 'Too Small!')
        .required('Required'),
    });

    return (
      <Modal size="lg" {...{ isOpen, toggle }}>
        <ModalHeader>Enter the amount to bet</ModalHeader>
        <ModalBody>
        <Formik<any>
          initialValues={{
            bet: '',
          }}
        validationSchema={CreateGameSchema}
        onSubmit={values => {
          bet(values)
        }}
       >
        {({ dirty, isValid }: any) => (
        <Form>
          <FormikField type="text" name="bet" label="Bet amount" placeholder="$" required/>
          <Button color="primary" variant="contained" disabled={!dirty || !isValid} type="submit">Bet</Button>
          <Button color="secondary" variant="contained" onClick={toggle}>Cancel</Button>
        </Form>
        )}
        </Formik>
        </ModalBody>
      </Modal>
    );
}

type Props = {
  isOpen: boolean;
  toggle: () => void;
  betted: (game: Game) => void;
  game: Game;
};

export default BetModal;