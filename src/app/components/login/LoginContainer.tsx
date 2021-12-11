import axios from 'axios';
import { Formik, Form} from 'formik';
import React from 'react';
import { Fragment } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import User from '../../../user/models/User';
import FormikField from '../dashboard/FormikField';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';

function LoginContainer() { 
  const login = (values: any) => {
    const {username, password} = values;

    const newUser: Partial<User> = {
      username: username,
      password: password
    }
  
    axios
      .post(`http://localhost:8000/api/user/login`,
        {
          username: username,
          password: password
        },
        {
          withCredentials: true,
        }
      )
      .then(res => {
        if (res.data.is_error) {
          alert(res.data.message)
        }
        else {
          const { user } = res.data;

          console.log(user);
          //handle user sign up successful - route to dashboard
        }
      })
      .catch(() => {
        alert("Failed to sign up user");
      })
  }

  const LoginUserSchema = Yup.object().shape({
    username: Yup
      .string()
      .required('Required'),
    password: Yup
      .string()
      .required('Required')
  });

  return (
    <Fragment>
      <div className="login-container component-container">
        <Container className="home-header themed-container" fluid={true}>
        <Row>
          <Col>
              <div className='login-container'>
              <h2 className="login-header-text">Login</h2>
              <Formik<any>
                  initialValues={{
                    username: '',
                    password: '',
                  }}
                  validationSchema={LoginUserSchema}
                  onSubmit={values => { login(values) }}
                >
                {({ dirty, isValid }: any) => (
                  <Form>
                    <FormikField type="text" name="username" label="Username" placeholder="Enter Username" required/>
                    <FormikField type="password" name="password" label="Password" placeholder="Enter password" required />
                    <br/>  
                      <Button color="primary" variant="contained" disabled={!dirty || !isValid} type="submit">Sign in</Button>
                      <NavLink to='/signup' className="create-account-button" color="secondary">Create an account</NavLink>
                  </Form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>

      </Container>
    </div>
  </Fragment>
  )
}

export default LoginContainer;