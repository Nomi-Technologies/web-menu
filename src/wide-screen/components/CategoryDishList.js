import React from 'react';
import DishTile from './DishTile';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

const CategorySection = styled.div`
  padding-top: 30px;
`;

const Title = styled.div`
  height: 22px;
  font-weight: bold;
  font-size: 24px;
  color: #000000;
`;

const Description = styled.div`
  font-size: 18px;
  padding-top: 26px;
`;

const DishGrid = styled.div`
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
      <CategorySection ref={this.props.reactRef}>
        <Title>{this.props.category.name}</Title>
        {
          this.props.category.description ? 
          (<Description>{this.props.category.description}</Description>) : <></>
        }
        <DishGrid>
          <Column>
            {this.props.dishes.slice(0,Math.ceil(this.props.dishes.length / 2)).map(dish =>
              <DishTile key={dish.id} dish={dish}/>
            )}
          </Column>
          <ColumnSeparator/>
          <Column>
            {this.props.dishes.slice(Math.ceil(this.props.dishes.length / 2)).map(dish =>
              <DishTile key={dish.id} dish={dish}/>
            )}
          </Column>
        </DishGrid>
      </CategorySection>
    );
  }
}
