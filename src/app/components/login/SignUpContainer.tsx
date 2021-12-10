import axios from 'axios';
import { Formik, Form} from 'formik';
import React from 'react';
import { Fragment } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import User from '../../../user/models/User';
import FormikField from '../dashboard/FormikField';
import * as Yup from 'yup';

function SignUpContainer() { 

  const signUp = (values: any) => {
    const {email, username, password} = values;

    const newUser: Partial<User> = {
      email: email,
      username: username,
      password: password
    }
  
    axios
      .post(`http://localhost:8000/api/user/signup`,
        {
          user: newUser,
        }, 
        {
          withCredentials: true
        }
      )
      .then(res => {
        if (res.data.is_error) {
          alert(res.data.message)
        }
        else {
          const { user } = res.data;
          console.log(user)
          //handle user sign up successful - route to dashboard
        }
      })
      .catch(() => {
        alert("Failed to sign up user");
      })
  }

  const SignUpUserSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    username: Yup.string()
      .min(3, 'min length of username is 2')
      .max(20, 'max length of username is 20')
      .required('Required'),
    password: Yup.string()
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'test message')
      .required('Required')
  });

  return (
    <Fragment>
      <div className="login-container component-container">
        <Container className="home-header themed-container" fluid={true}>
        <Row>
          <Col>
            <Formik<any>
              initialValues={{
                email: '',
                username: '',
                password: '',
              }}
              validationSchema={SignUpUserSchema}
              onSubmit={values => { signUp(values) }}
            >
            {({ dirty, isValid }: any) => (
            <Form>
              <FormikField type="text" name="email" label="Email" placeholder="Enter Email" required/>
              <FormikField type="text" name="username" label="Username" placeholder="Enter Username" required/>
              <FormikField type="password" name="password" label="Password" placeholder="Enter password" required />
              <Button color="primary" variant="contained" disabled={!dirty || !isValid} type="submit">Sign Up</Button>
            </Form>
            )}
            </Formik>
          </Col>
        </Row>

      </Container>
    </div>
  </Fragment>
  )
}

export default SignUpContainer;