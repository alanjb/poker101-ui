import React, { Component } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';

class GameCard extends Component<Props> {
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">
              Game ID: {this.props.title}
            </CardTitle>
            <Button>
              Join Game
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default GameCard;

type Props = {
  title: String;
  subTitle: String;
  text: String;
};