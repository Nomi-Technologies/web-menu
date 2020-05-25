import React from 'react';
import './DishTile.css';
import { Jumbotron, Modal } from 'react-bootstrap';

export default function DishTile(props) {

  const [showModal, setShowModal] = React.useState(false);

  return (
    <Jumbotron className='dish-tile'>
      <div className='dish-title'>
        <div className='dish-name'>{props.dish.name}</div>
        <button className='info-btn' 
          onClick={() => setShowModal(true)}
        >
          i
        </button>
      </div>
      <div className='separator'></div>
      <div className='description'>{props.dish.description}</div>
      <Modal
        className='react-bootstrap-modal'
        show={showModal}
        aria-labelledby="contained-modal-vcenter"
        onHide={() => setShowModal(false)}
        centered
      >
        <div className='tag-list-modal'>
          <Modal.Header>
            Contains
          </Modal.Header>
          <Modal.Body>
              {props.dish.tags.map(t => <div>{t.name}</div>)}
          </Modal.Body>
        </div>
      </Modal>
    </Jumbotron>
  );
}