import React from 'react';
import './DishTile.css';
import { Modal } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import SharedDishTile from '../../components/SharedDishTile';

export default function DishTile(props) {

  const [showModal, setShowModal] = React.useState(false);
  return (
    <div>
      <SharedDishTile className='dish-tile'
        dish={props.dish}
        titleEnding={
          <button className='info-btn' 
            onClick={() => setShowModal(true)}
          >
            i
          </button>
        }
      />
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
            {props.dish.Tags.map(t => <div key={t.name} className='modal-tag-item'>
              <ReactSVG
                wrapper='span'
                beforeInjection={svg => svg.classList.add('tag-icon')}
                src={`${process.env.REACT_APP_API_BASE_URL}/api/assets/tag_icons/${t.name}.svg`}
              />
              {t.name}
            </div>)}
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
}