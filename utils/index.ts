import {
    Market,
    contract
} from "./constants";

/** 
 * @function getIndexSet - This function calculates the index set of a provided market outcome
 * @param {Market} market - the market object
 * @param {string} outcome - name of the outcome
 * @returns {number} - the index set for the outcome
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
 * @function getCollectioinId -This function gets the collection Id for the market's outcome collection
 * @param {string} parentCollectionId - parent collectionId. constant value of "0x0000000000000000000000000000000000000000000000000000000000000000"
 * @param {string} conditionId - conditionId of the market
 * @param {number} indexSet - the index set of the outcome
 * @returns {string}  the collectionId returned by the Conditional Tokens contract
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
 * @function getPositionId - It gets the position Id for a market outcome 
 * @param {string} collateralToken - the address of the token used for collateral
 * @param {string} collectionId - collectionId for the market's outcome collection
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
 * @function getBalance -   gets the balance of the provided address.
 * @param {string} address - should be customers Polymarket account address, not their wallet address
 * @param {string} positionId - the id for the position returned from getPositionId
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
 * @function searchMarkets - This function is called by typing in the search input. It searches market questions and descriptions for matches
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