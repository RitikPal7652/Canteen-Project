// src/components/TestModal.jsx
import React, { useState } from 'react';
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export default function TestModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>Click to Open Modal</h2>

      <MDBModal show={showModal} setShow={setShowModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Hello!</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setShowModal(false)} />
            </MDBModalHeader>
            <MDBModalBody>This is the modal body.</MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => setShowModal(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
