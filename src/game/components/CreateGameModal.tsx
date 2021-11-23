import axios from 'axios';
import React from 'react';
import { Modal, ModalBody, ModalHeader} from 'reactstrap';
import { Formik, Form} from 'formik';
import FormikField from "../../app/components/dashboard/FormikField";
import Button from '@material-ui/core/Button';

import * as Yup from 'yup';
import Game from '../models/Game';

function CreateGameModal(props : Props) {
    const { isOpen, toggle } = props;

    const create = (values : any) => {
      const { created } = props;
      const {ante, chips} = values;
  
      const newGame: Partial<Game> = {
        requiredPointsPerPlayer: chips,
        anteAmount: ante,
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

    const CreateGameSchema = Yup.object().shape({
      chips: Yup.number()
        .min(0, 'Too Small!')
        .required('Required'),
   
      ante: Yup.number()
        .min(0, 'Too Small!')
        .max(1000000, 'Too Big!')
        .required('Required'),
    });

    return (
        <Modal size="lg" {...{ isOpen, toggle }}>
        <ModalHeader>Create New Game</ModalHeader>
        <ModalBody>
        <Formik<any>
          initialValues={{
            chips: '',
            ante: '',
          }}
        validationSchema={CreateGameSchema}
        onSubmit={values => {
          console.log(values); //remove in prod
          create(values)
        }}
       >
        {({ dirty, isValid } : any) => (
        <Form>
          <FormikField type="text" name="chips" label="Required chips per player" placeholder="$" required/>
          <FormikField type="text" name="ante" label="Ante" placeholder="$" required />
          <Button color="primary" variant="contained" disabled={!dirty || !isValid} type="submit">Create</Button>
          <Button color="secondary" variant="contained" onClick={toggle}>Cancel</Button>
        </Form>
        )}
        </Formik>
        </ModalBody>
      </Modal>
    );
  }

export default CreateGameModal;

type Props = {
  isOpen: boolean;
  toggle: () => void;
  created: (game: Game) => void;
};