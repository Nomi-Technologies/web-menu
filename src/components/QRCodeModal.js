import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { ReactComponent as Exit } from 'components/exit-button.svg';

import QRCode from 'qrcode.react';

const ModalContainer = styled.div`
  color: black;
  border-radius: 6px;
  background-color: white;
  width: 400px;
  max-height: 500px;
  margin: 0 auto;
  overflow: scroll;
  position: relative;
  padding-bottom: 30px;

  @media (max-width: 400px) {
    width: 100%;
  }
`;

const ExitButtonWrapper = styled.div`
  flex: 0 0 auto;
  height: 75px;
  width: 75px;
  cursor: pointer;
`;

const ExitButton = styled(Exit)`
  height: 100%;
  margin: 0 auto;
  display: block;
`;

const ModalBody = styled(Modal.Body)`
  padding: 0 20px;
`;

const RestaruantLinkQRCode = styled(QRCode)`
  display: block;
  margin: 0 auto;
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
                <ModalBody>
                    <ExitButtonWrapper
                        onClick={props.onHide}
                    >
                        <ExitButton/>
                    </ExitButtonWrapper>
                    <RestaruantLinkQRCode 
                        value={window.location.href}
                        renderAs={'svg'}
                    />
                </ModalBody>
            </ModalContainer>
        </Modal>
    )
}