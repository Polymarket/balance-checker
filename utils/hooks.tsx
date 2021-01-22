
import { Market, parentCollectionId, collateralToken } from "./constants";
import { getIndexSet, getCollectionId, getPositionId } from ".";

export async function getModalProps({ market, outcome }: { market: Market; outcome: string }): Promise<{ outcomeName: string; question: string; positionId: string; }> {
   
    
    const outcomeName = outcome
    const question = market.question;
    const conditionId = market.conditionId;
    const indexSet = getIndexSet({market, outcome});
    const collectionId = await getCollectionId({parentCollectionId, conditionId, indexSet});
    const  positionId = await getPositionId({ collateralToken, collectionId });
   
   
   
    return { outcomeName, question, positionId }

}