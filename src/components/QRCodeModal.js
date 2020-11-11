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
  overflow: auto;
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

const ModalHeader = styled(Modal.Header)`
  padding: 0 0 0 20px;
  height: 75px;
  border-radius: 6px 6px 0px 0px;
  border-bottom: 1px solid #DCE2E9;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
`;

const ModalTitle = styled.div`
  flex: 1 1 auto;
  height: 100%;
  font-weight: bold;
  font-size: 28px;
  line-height: 75px;
`;

const SectionBody = styled.div`
  color: #8A9DB7;
  padding-top: 18px;
  font-weight: 500;
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
                <ModalHeader>
                    <ModalTitle>Menu QR Code</ModalTitle>
                    <ExitButtonWrapper
                        onClick={props.onHide}
                    >
                        <ExitButton/>
                    </ExitButtonWrapper>
                </ModalHeader>
                <ModalBody>
                    <SectionBody>
                        <RestaruantLinkQRCode 
                            value={window.location.href}
                            renderAs={'svg'}
                        />
                    </SectionBody>             
                </ModalBody>
            </ModalContainer>
        </Modal>
    )
}