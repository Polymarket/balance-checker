import {
    Market,
    contract
} from "./constants";

/** 
 * @property {function} getIndexSet
 * This function is called by clicking on an outcome. It gets the position Id for that outcome
 * @param {Market} market - the market object
 * @param {string} outcome - name of the outcome
 * @param {func} setPositionId - parent state setter for positionId
 * @param {func} setErrorMessage - parent state setter for errorMessage
 * @returns {string}  the positionId returned by the Conditional Tokens contract
 * */
export  function getIndexSet({
    market,
    outcome,
   
}: {
    market: Market;
    outcome: string;

}): number {
    
        const outcomeArray: number[] = new Array(market.outcomes.length).fill(
            0,
        );
        const outcomeIndex: number = market.outcomes.indexOf(outcome);
        outcomeArray.splice(outcomeIndex, 1, 1);
        const binary: string = outcomeArray.reverse().join("");
        const indexSet: number = parseInt(binary, 2);
   
       
         
        return indexSet
        }

/** 
 * @property {function} getCollectioinId
 * This function is called by clicking on an outcome. It gets the position Id for that outcome
 * @param {Market} market - the market object
 * @param {string} outcome - name of the outcome
 * @param {func} setPositionId - parent state setter for positionId
 * @param {func} setErrorMessage - parent state setter for errorMessage
 * @returns {string}  the positionId returned by the Conditional Tokens contract
 * */
export async function getCollectionId({
    parentCollectionId,
    conditionId,
    indexSet
   
}: {
    parentCollectionId : string,
    conditionId: string;
    indexSet: number;
    
}): Promise<string> {

      
        const collectionId: string = await contract
            .getCollectionId(parentCollectionId, conditionId, indexSet);
            
       
        return collectionId
    } 

/** 
 * @property {function} getPositionId
 * This function is called by clicking on an outcome. It gets the position Id for that outcome
 * @param {Market} market - the market object
 * @param {string} outcome - name of the outcome
 * @param {func} setPositionId - parent state setter for positionId
 * @param {func} setErrorMessage - parent state setter for errorMessage
 * @returns {string}  the positionId returned by the Conditional Tokens contract
 * */
export async function getPositionId({
    collateralToken,
    collectionId,

}: {
    collateralToken: string;
    collectionId: string;
  
}): Promise<string> {
 
   
          const positionId: string = await contract
            .getPositionId(collateralToken, collectionId);
        return positionId
    } 


/** 
 * @property {function} getBalance
 * This function is called by clicking submit in the modal. It gets the balance of the provided address.
 * @param {string} address - should be customers Polymarket account address, not their wallet address
 * @param {string} positionId - the id for the position returned from getPositionId
 * @param {function} setBalance - component state setter for positionId
 * @param {function} setErrorMessage - parent state setter for errorMessage
 * @returns {string} - customer's balance for the positionId
 * */
export async function getBalance({
    address,
    positionId
 
}: {
    address: string;
    positionId: string;
 
}): Promise<string> {
  
        const balance: string = await contract
            .balanceOf(address, positionId);
       
       return balance;
    } 


/** 
 * @property {function}searchMarkets
 * This function is called by typing in the search input. It searches market questions and descriptions for matches
 * @param {Array} object - the array of market objects fetched by getStaticProps from the api
 * @param {Array} properties - keys for the properties of the market objects
 * @param {string} query - the text coming from the search input
*  @returns {boolean} - value indicating if search query was found
 * */

export function searchMarkets<data>(
    object: data,
    properties: Array<keyof data>,
    query: string,
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