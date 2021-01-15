import { getPositionId, getBalance } from "./utils";
import BalanceModal from "./components/modal";
import SearchInput from "./components/searchInput";
import ActiveMarkets from "./components/activeMarkets";
import {
  Market,
  contract,
  parentCollectionId,
  collateralToken,
} from "./utils/constants";

jest.setTimeout(100000)
  beforeAll(async () => {
   [wallet, provider] = await startChain();
    let conditionalTokensFactory =  new ethers.ContractFactory(compiledConditionalTokens.abi, compiledConditionalTokens.bytecode, wallet);
    conditionalTokens = await conditionalTokensFactory.deploy();
  
    await conditionalTokens.deployed();
  

    
  let makerAdapterFactory =  new ethers.ContractFactory(compiledMakerAdapter.abi, compiledMakerAdapter.bytecode, wallet);
   // Notice we pass in the address of the conditional tokens contract as the parameter to the constructor
   makerAdapter = await makerAdapterFactory.deploy(conditionalTokens.address);
  
   await makerAdapter.deployed();

   let toyTokenFactory =  new ethers.ContractFactory(compiledToyToken.abi, compiledToyToken.bytecode, wallet);
   
   toyToken = await toyTokenFactory.deploy("t1", "t1");
  
   await toyToken.deployed();

  
   // instatiate contracts
   cTokens = new ethers.Contract(conditionalTokens.address, compiledConditionalTokens.abi, wallet);
   mkAdapter = new ethers.Contract(makerAdapter.address, compiledMakerAdapter.abi, wallet);
   token = new ethers.Contract(toyToken.address, compiledToyToken.abi, wallet);
   


   conditionId = await cTokens.getConditionId(mkAdapter.address, questionId, 2 );
   let blockNumber = await provider.getBlockNumber();
   let block = await provider.getBlock(blockNumber);
    
    await mkAdapter.prepareMarket(
      questionId,
      priceFeed,
      block.timestamp + 15,
      //target price
    "450000000000000000000",
    // variation
    '0'
   
   );
   low =  await cTokens.getCollectionId(parentCollectionId, conditionId, 1);
   high =  await cTokens.getCollectionId(parentCollectionId, conditionId, 2);
   t1Low = await cTokens.getPositionId(toyToken.address, low);
   t1High = await cTokens.getPositionId(toyToken.address, high);
   await token.mint(wallet.address, 1000);
   await token.approve(conditionalTokens.address, 1000);
   await cTokens.splitPosition(
     toyToken.address,
     parentCollectionId,
     conditionId,
     [1,2],
     1000
     );


   
});


describe("contract deployment",  () => {
  
  test('deploys a conditional token contract', () => {
    assert.ok(conditionalTokens.address);
     });
  test('deploys a maker adapter contract', () => {
    assert.ok(makerAdapter.address);
    });
  test('deploys a toy token contract', async () => {
    assert.ok(toyToken.address);
    const name = await token.functions.name();
    expect(name).toBe("t1")
    });

})

describe("Maker Dao adapter",  () => {
 
  test('reverts if resolution is attempted before start of valid window', async () => {
    await truffleAssert.reverts(mkAdapter.resolveMarket(
      questionId), "resolution window has not begun"
    )
     });

  test('reverts on invalid resolution time', async () => {
    await truffleAssert.reverts(
       mkAdapter.prepareMarket(
        questionId,
        priceFeed,
        "1604364260",
        //target price
      "450000000000000000000",
      // variation
      '50000000000000000000'),
      "Please submit a resolution time in the future"
      )
       });

  test('prepares market', async () => {
    
   const market = await mkAdapter.markets(questionId);
   expect(market.targetValue.toString()).toEqual("450000000000000000000");
   
     });

  

     test('reverts if market is already prepared', async () => {
  
      await truffleAssert.reverts( mkAdapter.prepareMarket(
        questionId,
        priceFeed,
        "1704364260",
        //target price
      "450000000000000000000",
      // variation
      '50000000000000000000'),
      "condition already prepared"
      )
       });   
       
 
 

   
     test('resolves binary market', async () => {
      
      const sleep = (ms) => {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      } 
        await sleep(10000)
        await  mkAdapter.resolveMarket(questionId);
    
     
        await cTokens.redeemPositions(
          toyToken.address,
          parentCollectionId,
          conditionId,
          [2]
         );
      
          const balance = await token.balanceOf(wallet.address);
         
          console.log(balance.toString());
          // balance of either 0 or 1000 since market binary or "all or nothing"
         expect(balance.toString() == '1000' || balance.toString() == '0').toBe(true);
       
       
       
       });

       test('resolves scalar market', async () => {
        conditionId2 = await cTokens.getConditionId(mkAdapter.address, questionId2, 2 );
        let blockNumber = await provider.getBlockNumber();
        let block = await provider.getBlock(blockNumber);
        await mkAdapter.prepareMarket(
          questionId2,
          priceFeed,
          block.timestamp + 7,
         
          //target price
        "450000000000000000000",
        // variation
        '100000000000000000000'
       
       );
        short =  await cTokens.getCollectionId(parentCollectionId, conditionId2, 1);
        long =  await cTokens.getCollectionId(parentCollectionId, conditionId2, 2);
        t1Short = await cTokens.getPositionId(toyToken.address, short);
        t1Long = await cTokens.getPositionId(toyToken.address, long);
        await token.mint(wallet.address, 1000);
        await token.approve(conditionalTokens.address, 1000);
        await cTokens.splitPosition(
          toyToken.address,
          parentCollectionId,
          conditionId2,
          [1,2],
          1000
          );
          
     
      
        const sleep = (ms) => {
          return new Promise((resolve) => {
            setTimeout(resolve, ms);
          });
        } 
       await sleep(10000)
       await  mkAdapter.resolveMarket(questionId2);
      
       
          await cTokens.redeemPositions(
            toyToken.address,
            parentCollectionId,
            conditionId2,
            [2]
           );
        
         
           const balance = await token.balanceOf(wallet.address);
           console.log(parseInt(balance));
           // balance will be somewhere in this range depending on how close to bounds value is
           expect(parseInt(balance) > 0 && parseInt(balance) < 2000).toBe(true);
         
         
         
         });
     
      

})
