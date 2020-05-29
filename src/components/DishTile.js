import React from 'react';
import './DishTile.css';
import { Jumbotron, Modal } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';

const { apiBaseUrl } = require('../config');

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
          <Modal.Header bsPrefix='tag-list-modal-title'>
            Contains:
          </Modal.Header>
          <Modal.Body bsPrefix='tag-list-modal-body'>
            {props.dish.tags.map(t => <div key={t.name} className='modal-tag-item'>
              <ReactSVG
                wrapper='span'
                beforeInjection={svg => svg.classList.add('tag-icon')}
                src={`${apiBaseUrl[process.env.NODE_ENV]}/api/assets/tag_icons/${t.name}.svg`}
              />
              {t.name}
            </div>)}
          </Modal.Body>
        </div>
      </Modal>
    </Jumbotron>
  );
}