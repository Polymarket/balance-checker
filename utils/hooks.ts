import { Market, parentCollectionId, collateralToken } from "./constants";
import { getIndexSet, getCollectionId, getPositionId } from ".";

export async function getModalProps({
    market,
    outcome,
}: {
    market: Market;
    outcome: string;
}): Promise<{ outcomeState: string; question: string; positionId: string }> {
    const outcomeState = outcome;
    const { question } = market;
    const { conditionId } = market;
    const indexSet = getIndexSet({ market, outcome });
    const collectionId = await getCollectionId({
        parentCollectionId,
        conditionId,
        indexSet,
    });
    const positionId = await getPositionId({ collateralToken, collectionId });

    return { outcomeState, question, positionId };
}
