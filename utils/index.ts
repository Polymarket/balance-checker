import {
    Market,
    contract,
    parentCollectionId,
    collateralToken,
} from "./constants";

/** 
 * getPositionId
 * This function is called by clicking on an outcome. It gets the position Id for that outcome
 * @param {Market} market - the market object
 * @param {string} outcome - name of the outcome
 * @param {func} setPositionId - parent state setter for positionId
 * @param {func} setErrorMessage - parent state setter for errorMessage
 * */
export async function getPositionId({
    market,
    outcome,
    setPositionId,
    setErrorMessage,
}: {
    market: Market;
    outcome: string;
    setPositionId: React.Dispatch<React.SetStateAction<string>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}): Promise<string> {
    try {
        const outcomeArray: number[] = new Array(market.outcomes.length).fill(
            0,
        );
        const outcomeIndex: number = market.outcomes.indexOf(outcome);
        outcomeArray.splice(outcomeIndex, 1, 1);
        const binary: string = outcomeArray.reverse().join("");
        const indexSet: number = parseInt(binary, 2);
        const collectionId: string = await contract
            .getCollectionId(parentCollectionId, market.conditionId, indexSet);
            
        const positionId: string = await contract
            .getPositionId(collateralToken, collectionId);
            setPositionId(positionId);
        return positionId
    } catch (error) {
        setErrorMessage(error.message);
        return error.message;
    }
}


/** 
 * getBalance
 * This function is called by clicking submit in the modal. It gets the balance of the provided address.
 * @param {string} address - should be customers Polymarket account address, not their wallet address
 * @param {string} positionId - the id for the position returned from getPositionId
 * @param {func} setBalance - component state setter for positionId
 * @param {func} setErrorMessage - parent state setter for errorMessage
 * */
export async function getBalance({
    address,
    positionId,
    setBalance,
    setErrorMessage,
}: {
    address: string;
    positionId: string;
    setBalance: React.Dispatch<React.SetStateAction<string | undefined>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}): Promise<string> {
    try {
        const balance: string = await contract
            .balanceOf(address, positionId);
       setBalance((+balance / 1000000).toFixed(6));
       return balance;
    } catch (error) {
         setErrorMessage(error.message);
         return (error.message)
    }
}

/** 
 * searchMarkets
 * This function is called by typing in the search input. It searches market questions and descriptions for matches
 * @param {Array} object - the array of market objects fetched by getStaticProps from the api
 * @param {Array} properties - keys for the properties of the market objects
 * @param {string} query - the text coming from the search input
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