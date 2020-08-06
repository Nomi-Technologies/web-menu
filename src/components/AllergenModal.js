import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';

const ModalContainer = styled.div`
  color: white;
  border-radius: 10px;
  background-color: #393939;
  width: 260px;
  max-height: 316px;
  margin: 0 auto;
  overflow: scroll;
  position: relative;
`;

const ModalHeader = styled(Modal.Header)`
  padding: 0 20px;
  height: 52px;
  line-height: 52px;
  background: #606060;
  border-radius: 10px 10px 0px 0px;
  font-weight: bold;
  position: sticky;
  top: 0;
  border-bottom: 0px;
`;

const ModalBody = styled(Modal.Body)`
  padding: 16px;
  padding-bottom: 0;
`;

const ModalTagItem = styled.div`
  line-height: 32px;
  font-weight: 500;
  height: 32px;
  margin-bottom: 16px;
`;

const ModalTagIcon = styled.span`
  & svg {
    display: inline-block;
    margin-right: 20px;
    height: 32px;
    width: 32px;
  }
`;

export default function(props) {

  return (
    <Modal
      className='react-bootstrap-modal'
      show={props.show}
      aria-labelledby="contained-modal-vcenter"
      onHide={props.onHide}
      centered
    >
      <ModalContainer>
        <ModalHeader>
          Contains:
        </ModalHeader>
        <ModalBody>
          {props.dish.Tags.map(t => <ModalTagItem key={t.name}>
            <ModalTagIcon>
              <ReactSVG
                wrapper='span'
                src={`${process.env.REACT_APP_API_BASE_URL}/api/assets/tag_icons/${t.name}.svg`}
              />
            </ModalTagIcon>
            {t.name}
          </ModalTagItem>)}
        </ModalBody>
      </ModalContainer>
    </Modal>
  );
}