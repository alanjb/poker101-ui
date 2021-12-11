import axios from 'axios';
import { Formik, Form} from 'formik';
import React from 'react';
import { Fragment } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import User from '../../../user/models/User';
import FormikField from '../dashboard/FormikField';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { getEnv } from '../../../app/config/utils';

function SignUpContainer() { 
  const url = getEnv();
  const history = useNavigate();

  const signUp = (values: any) => {
    const {email, username, password} = values;

    const newUser: Partial<User> = {
      email: email,
      username: username,
      password: password
    }
  
    axios
      .post(`${url}/api/user/signup`,
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
          alert('Success! You have created an account. Please login.');
          history('/login');
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
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Password must contain between 6-16 alphanumeric characters and at least one special character (!@#$%^&*)')
      .required('Required')
  });

  return (
    <Fragment>
      <div className="login-container component-container">
        <Container className="home-header themed-container" fluid={true}>
        <Row>
            <Col>
                <div className='login-container'>
                  <h2 className="login-header-text">Sign Up</h2>
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
                      <br/>
                      <Button color="primary" variant="contained" disabled={!dirty || !isValid} type="submit">Sign Up</Button>
                      <NavLink to='/login' className="create-account-button" color="secondary">Have an account? Please login here</NavLink>
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

export default SignUpContainer;