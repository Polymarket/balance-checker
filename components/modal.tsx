import * as React from 'react'
import {  Form, Button,  Alert, Modal} from 'react-bootstrap';

import {ModalProps} from '../types';



const BalanceModal: React.FC<ModalProps> = ({
    handleClose, 
    handleSubmit, 
    setAddress, 
    setErrorMessage,
    question,
    outcome,
    errorMessage,
     address,
     balance,
    show}  ): JSX.Element => {
    return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Customer Balance</Modal.Title>
     </Modal.Header>
       <Form onSubmit={handleSubmit}>
         <Modal.Body> 
                  <h6> {question} </h6>
                  <h6>Enter a customer's address to get their balance for  position: {outcome} </h6>
                    <Form.Group >
                       <Form.Label>Address</Form.Label>
                          <Form.Control  placeholder="Enter address" 
                                     value={address}
                                     onChange={e => setAddress(e.currentTarget.value)}/>
                    </Form.Group>
                       {balance && <p>Customer Balance: {balance}</p>}
                      {errorMessage && 
                         <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
                           <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                             {errorMessage}
                            </p>
                        </Alert> }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
           </Button>
           <Button variant="primary" type="submit">
             Submit
          </Button>
         </Modal.Footer>
      </Form>
  </Modal>
    )
  }
  export default BalanceModal