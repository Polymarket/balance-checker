import React, { useState } from "react";
import { Market } from "../utils/constants";
import { searchMarkets } from "../utils";
import { getModalProps } from "../utils/hooks";
import BalanceModal from "./modal";
import styles from "../styles/MarketsBoard.module.scss";

type Props = {
    data: Market[];
    query: string;
};

const ActiveMarkets: React.FC<Props> = ({ data, query }): JSX.Element => {
    const [show, setShow] = useState<boolean>(false);
    const [marketOutcome, setMarketOutcome] = useState<string>("");
    const [question, setQuestion] = useState<string>("");
    const [positionId, setPositionId] = useState<string>("");

    async function handleClick({
        market,
        outcome,
    }: {
        market: Market;
        outcome: string;
    }): Promise<void> {
        const _modalProps = await getModalProps({ market, outcome });
        setMarketOutcome(_modalProps.outcomeName);
        setQuestion(_modalProps.question);
        setPositionId(_modalProps.positionId);
        setShow(true);
    }

    const resultMarkets = data.filter((market) =>
        searchMarkets<Market>(market, ["question", "description"], query),
    );

    const marketElements = resultMarkets.map((market: Market) => {
        return (
            <div className={styles.MarketWidget}>
                <div className={styles.MarketWidget__name}>
                    {market.question}
                </div>
                <div className={styles.OutcomeButtons}>
                    {market.outcomes.map((outcome: string, i) => (
                        <div key={i}>
                            <button
                                className={styles.OutcomeButtonYes}
                                onClick={() => handleClick({ market, outcome })}
                                onKeyDown={() =>
                                    handleClick({ market, outcome })
                                }
                            >
                                {" "}
                                <div className={styles.description}>
                                    {outcome}
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    });
    return (
        <>
            <BalanceModal
                show={show}
                setShow={setShow}
                outcome={marketOutcome}
                question={question}
                positionId={positionId}
            />
            {marketElements}
        </>
    );
};
export default ActiveMarkets;
