import {
    Market,
    contract,
    parentCollectionId,
    collateralToken,
} from "./constants";

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
}): Promise<void> {
    try {
        const outcomeArray: number[] = new Array(market.outcomes.length).fill(
            0,
        );
        const outcomeIndex: number = market.outcomes.indexOf(outcome);
        outcomeArray.splice(outcomeIndex, 1, 1);
        const binary: string = outcomeArray.reverse().join("");
        const indexSet: number = parseInt(binary, 2);
        const collectionId: string = await contract.methods
            .getCollectionId(parentCollectionId, market.conditionId, indexSet)
            .call();
        const positionId: string = await contract.methods
            .getPositionId(collateralToken, collectionId)
            .call();
        return setPositionId(positionId);
    } catch (error) {
        setErrorMessage(error.message);
        return error.message;
    }
}

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
}): Promise<void> {
    try {
        const balance: string = await contract.methods
            .balanceOf(address, positionId)
            .call();
        return setBalance((+balance / 1000000).toFixed(6));
    } catch (error) {
        return setErrorMessage(error.message);
    }
}

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
