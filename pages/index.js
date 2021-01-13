import React, {  useState }from 'react';
import {  Col, Row, Container, Form, Button, Card, ListGroup, Spinner, Alert, Modal} from 'react-bootstrap';
import Web3 from 'web3'; 
const MATIC_NODE = "wss://rpc-mainnet.maticvigil.com/ws";
const web3 = new Web3(MATIC_NODE);
const { abi } = require('../build/contracts/ConditionalTokens.json');
const CONTRACT_ADDRESS = "0x4D97DCd97eC945f40cF65F87097ACe5EA0476045";
const contract =  new web3.eth.Contract(abi, CONTRACT_ADDRESS);
const parentCollectionId = "0x0000000000000000000000000000000000000000000000000000000000000000";
const collateralToken = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

const  Home = ({data}) => {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState('')
  const [outcome, setOutcome] = useState();
  const [question, setQuestion] = useState();
  const [positionId, setPositionId] = useState();
  const [balance, setBalance] = useState();
 const [errorMessage, setErrorMessage] = useState();
 const [loading, setLoading] = useState(false);

 
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);



const onClick = async (market, outcome)=> {
  let outcomeArray = new Array(market.outcomes.length).fill(0);
  let outcomeIndex = market.outcomes.indexOf(outcome);
   outcomeArray.splice(outcomeIndex, 1, 1);
  let binary = outcomeArray.reverse().join('');
  let indexSet = parseInt(binary, 2);
  console.log(indexSet);
  let collectionId = await contract.methods.getCollectionId(parentCollectionId, market.conditionId, indexSet).call();
  let positionId = await contract.methods.getPositionId(collateralToken, collectionId).call();
  setPositionId(positionId);
  setQuestion(market.question);
  setOutcome(outcome);
 
  handleShow();
 
}
const onSubmit = async (event) => {
 event.preventDefault();
 console.log(positionId)
 let _balance = await contract.methods.balanceOf(address, positionId).call();
 setBalance(_balance)
}

const renderMarkets = () => {
  console.log(data)
return data && data.map((market, index) =>
 <Col md={4} style={{paddingTop:"10px"}} key={index} >
  <Card border="dark"   >
    
     <Card.Header>{market.question}</Card.Header>
      <Card.Body>
       <ListGroup variant="flush">
     
        {market.outcomes.map((outcome, index) => <a key={index} style={{ cursor: 'pointer' }} onClick={() => onClick(market, outcome)}> <Card.Header>{outcome}</Card.Header></a>)}
        
      </ListGroup>
    </Card.Body>
  </Card>
</Col>

)
}
const renderModal = () => {
  return (
  <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Customer Balance</Modal.Title>
  </Modal.Header>
  <Form onSubmit={onSubmit} error={errorMessage}>
  <Modal.Body> <h6> {question} </h6>
                <h6>Enter a customer's address to get their balance for  position: {outcome} </h6>
                <Form.Group >
                  <Form.Label>Address</Form.Label>
                    <Form.Control  placeholder="Enter address" 
                                   value={address}
                                   onChange={event => setAddress(event.target.value)}/>
                </Form.Group>
            <p>Customer Balance: {balance}</p>
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




  return (
    
      <Container>
        {renderModal()}
         <Row  style={{paddingTop: "50px", textAlign: "center"}}>
            <Col>
              <h1>User Balances</h1>
            </Col>
         </Row>
       
         <Row  style={{ textAlign: "center"}}>
            <Col md={4}></Col>
            <Col md={4}>
             
                <h6>Select a market outcome to find user balances </h6>
            
            </Col>
            <Col md={4}></Col>
        </Row>
        <Row  style={{paddingTop: "30px", textAlign: "center"}}>
           <Col>
            
             {errorMessage &&   <Alert variant="danger" onClose={() => setErrorMessage(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {errorMessage}
        </p>
      </Alert> }
           </Col>
        </Row>
   
        <Row  style={{paddingTop: "30px", paddingBottom: '30px', textAlign: "center"}}>
           <Col>
            <h2 style={{textAlign:"center"}}>Active Markets</h2>
           </Col>
       </Row>
        <Row  style={{paddingTop: "30px", paddingBottom: '30px', textAlign: "center",  minWidth:"100%"}}>
          {loading ? <p></p> : renderMarkets()}
        </Row>
     </Container>
  

  )
}
export async function getStaticProps(context) {
  const res = await fetch(`https://strapi-matic.poly.market/markets?active=true&_sort=volume:desc`)
  const data = await res.json()
  console.log(data);
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data}, // will be passed to the page component as props
  }
}

export default Home