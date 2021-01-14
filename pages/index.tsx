import React, {  useState }from 'react';
import {  Col, Row, Container, Card, ListGroup} from 'react-bootstrap';
import Web3 from 'web3'; 
import {Props, Market} from '../types';
import BalanceModal from '../components/modal'
import SearchInput from "../components/searchInput";
const MATIC_NODE: string = "wss://rpc-mainnet.maticvigil.com/ws";
const web3 = new Web3(MATIC_NODE);
const {abi}=  require( '../build/contracts/ConditionalTokens.json');
const CONTRACT_ADDRESS: string = "0x4D97DCd97eC945f40cF65F87097ACe5EA0476045";
const contract =  new web3.eth.Contract(abi, CONTRACT_ADDRESS);
const parentCollectionId: string = "0x0000000000000000000000000000000000000000000000000000000000000000";
const collateralToken = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";


const  BalanceChecker  : React.FC<Props> = ({data}): JSX.Element =>  {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState('')
  const [outcome, setOutcome] = useState('');
  const [question, setQuestion] = useState('');
  const [positionId, setPositionId] = useState('');
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState<string>('')
 

 
 
 function handleClose() {setShow(false);setBalance(undefined);}
 function handleShow() { setShow(true)};

async function getPositionId   ({ market, outcome }: { market: Market; outcome: string; }): Promise<void> {
  try { 
    let outcomeArray: any = new Array(market.outcomes.length).fill(0);
    let outcomeIndex: number = market.outcomes.indexOf(outcome);
     outcomeArray.splice(outcomeIndex, 1, 1);
    let binary: string = outcomeArray.reverse().join('');
    let indexSet: number = parseInt(binary, 2);
    console.log(indexSet);
    let collectionId: string = await contract.methods.getCollectionId(parentCollectionId, market.conditionId, indexSet).call();
    let _positionId: string = await contract.methods.getPositionId(collateralToken, collectionId).call();
    return setPositionId(_positionId);
   
  } catch (error) {
     setErrorMessage(error.message);
     return error.message
  }

}
async function getBalance(): Promise<void>  {
  try {

     let _balance: string = await contract.methods.balanceOf(address, positionId).call();
     console.log( _balance)
     return setBalance((+_balance/1000000).toFixed(6));
   } catch(error){
     return setErrorMessage(error.message)
   }

}

function handleClick({ market, outcome }: { market: Market; outcome: string; }): void {

  getPositionId({market, outcome})
  setQuestion(market.question);
  setOutcome(outcome);
 
  return handleShow();
}
async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void>  {

  e.preventDefault();
  console.log(positionId)
  return getBalance();


 } 
 function genericSearch<data>(
  object: data,
  properties: Array<keyof data>,
  query: string
): boolean {

  if (query === "") {
      return true;
  } 

  return properties.some((property) => {
      const value = object[property];
      if (typeof value === "string" || typeof value === "number") {
          return value.toString().toLowerCase().includes(query.toLowerCase());
      }
      return false;
  });
}
 const resultMarkets = data
 .filter((market) =>
   genericSearch<Market>(market, ["question", "description"], query)
 );
 
 


const renderMarkets = (): any => {
  console.log(data)
  return resultMarkets.map((market: Market, index: number): JSX.Element =>
 {
    return <Col md={4} style={{ paddingTop: "10px" }} key={index}>
      <Card border="dark" style={{height:"100%"}}>

        <Card.Text style={{height:"30%"}}>{market.question}</Card.Text>
        <Card.Body>
          <ListGroup variant="flush">

            {market.outcomes.map((outcome: string, index: number) =>
            <a key={index} style={{ cursor: 'pointer' }} onClick={() =>
            handleClick({ market, outcome })}> <Card.Header>{outcome}</Card.Header></a>)}

          </ListGroup>
        </Card.Body>
      </Card>
    </Col>;
  }

)
}




  return (
    
      <Container>
        <BalanceModal handleClose={handleClose} handleSubmit={handleSubmit} setAddress={setAddress} setErrorMessage={setErrorMessage} 
                       question={question} outcome={outcome} errorMessage={errorMessage} address={address} balance={balance} show={show}/>
         <Row  style={{paddingTop: "50px", textAlign: "center"}}>
            <Col>
              <h1>Customer Balances</h1>
            </Col>
         </Row>
       
         <Row  style={{ textAlign: "center"}}>
            <Col md={4}></Col>
            <Col md={4}>
             
                <h6>Select a market outcome to find user balances </h6>
            
            </Col>
            <Col md={4}></Col>
        </Row>
    
   
        <Row  style={{paddingTop: "30px", paddingBottom: '30px', textAlign: "center"}}>
           <Col>
            <h2 style={{textAlign:"center"}}>Active Markets</h2>
           </Col>
       </Row>
       <Row  style={{paddingTop: "30px", paddingBottom: '30px', textAlign: "center"}}>
       <Col md={4}></Col>
           <Col md={4}>
            <SearchInput onChangeSearchQuery={(query) => setQuery(query)}/>
           </Col>
           <Col md={4}></Col>
       </Row>
        <Row  style={{paddingTop: "30px", paddingBottom: '30px', textAlign: "center",  minWidth:"100%"}}>
          {renderMarkets()}
        </Row>
     </Container>
  

  )
}
export async function getStaticProps(): Promise<{ notFound: boolean; props?: undefined; } | { props: { data: Market[]; }; notFound?: undefined; }> {
  let res = await fetch(`https://strapi-matic.poly.market/markets?active=true&_sort=volume:desc`)
  let data:Market[] = await res.json()
  console.log(data);
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {data}, // will be passed to the page component as props
  }
}

export default BalanceChecker