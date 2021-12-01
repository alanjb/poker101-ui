import axios from 'axios';
import React from 'react';
import { Modal, ModalBody, ModalHeader} from 'reactstrap';
import { Formik, Form} from 'formik';
import FormikField from "../../app/components/dashboard/FormikField/index";
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import Game from '../models/Game';

function RaiseModal(props: Props) {
  const { isOpen, toggle, game } = props;

    const raise = (values: any) => {
      const { raised } = props;
      const {raise} = values;
    
      axios
        .post(`http://localhost:8000/api/game/raise`,
          {
            gameId: game._id,
            raise: raise
          })
        .then(res => {
          const { game } = res.data;

          raised(game);
        })
        .catch(error => {
          alert("Failed to create game \n\n" + error);
        })
    }

    const CreateGameSchema = Yup.object().shape({
      raise: Yup.number()
        .min(0, 'Too Small!')
        .required('Required'),
    });

    return (
      <Modal size="lg" {...{ isOpen, toggle }}>
        <ModalHeader>Enter the amount to raise</ModalHeader>
        <ModalBody>
        <Formik<any>
          initialValues={{
            raise: '',
          }}
        validationSchema={CreateGameSchema}
        onSubmit={values => {
          raise(values)
        }}
       >
        {({ dirty, isValid }: any) => (
        <Form>
          <FormikField type="text" name="raise" label="Raise amount" placeholder="$" required/>
          <Button color="primary" variant="contained" disabled={!dirty || !isValid} type="submit">Raise</Button>
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
  raised: (game: Game) => void;
  game: Game;
};

export default RaiseModal;