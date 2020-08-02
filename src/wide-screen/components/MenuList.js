import React from 'react';
import DishTile from './DishTile';
import styled from 'styled-components';
import { Container, Col } from 'react-bootstrap';

const Title = styled.div`
  height: 22px;
  margin-top: 30px;
  font-weight: bold;
  font-size: 18px;
  color: #000000;
`;

const DishGrid = styled(Container)`
  position: relative;
  z-index: 1;
  padding: 24px 0 0 0;
  display: flex;
  `;

const Column = styled(Col)`
  padding: 0;
`;

const ColumnSeparator = styled(Column)`
  max-width: 15px;
`;

export default class extends React.Component {

  render() {
    return (
      <div ref={this.props.reactRef}>
        <Title>{this.props.category}</Title>
        <DishGrid>
          <Column>
            {this.props.dishes.slice(0,Math.ceil(this.props.dishes.length / 2)).map(dish =>
              <DishTile key={dish.name} dish={dish}/>
            )}
          </Column>
          <ColumnSeparator/>
          <Column>
            {this.props.dishes.slice(Math.ceil(this.props.dishes.length / 2)).map(dish =>
              <DishTile key={dish.name} dish={dish}/>
            )}
          </Column>
        </DishGrid>
      </div>
    );
  }
}
