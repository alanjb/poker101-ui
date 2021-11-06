import { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";

const HomeContainer = () => (
  <Fragment>
    <div className="home-container">
      <Container className="home-header themed-container" fluid={true}>
        <Row>
          <Col>
            <h2 className="header-text text-center ">Welcome to Poker 101</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="sub-text text-center">
              <p>Sign in to start playing</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Fragment>
);

export default HomeContainer;