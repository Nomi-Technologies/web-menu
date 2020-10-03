import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import QRCodeModal from 'components/QRCodeModal';

const ToggleButton = styled(Button)`
  background-color: #F3A35C;
  color: white;
  font-weight: bold;
  margin: 10px auto 10px auto;
  display: block;
  width: 85%;
  height: auto;
  min-height: 44px;
  border-radius: 22px;
  border: none;

  &:hover {
      opacity: 0.8;
      background-color: #F3A35C;
  }
`;

export default function (props) {
    const [showQRCode, setShowQRCode] = useState(false)

    return (
        <>
            <props.StyledBody>
                <ToggleButton onClick={() => setShowQRCode(true)}>
                    Show QR Code
                </ToggleButton>
                <QRCodeModal show={showQRCode} onHide={() => setShowQRCode(false)} />
            </props.StyledBody>
        </>
    )
}