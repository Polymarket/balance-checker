import React, { useState } from "react";
import { Col, Card, ListGroup } from "react-bootstrap";
import { Market } from "../utils/constants";
import { searchMarkets } from "../utils";
import { getModalProps } from "../utils/hooks";
import BalanceModal from "./modal";

type Props = {
    data: Market[];
    query: string;
};

const ActiveMarkets: React.FC<Props> = ({ data, query }): JSX.Element => {
    const [show, setShow] = useState<boolean>(false);
    const [outcomeState, setOutcomeState] = useState<string>("");
    const [question, setQuestion] = useState<string>("");
    const [positionId, setPositionId] = useState<string>("");

    async function handleClick({
        market,
        outcome,
    }: {
        market: Market;
        outcome: string;
    }): Promise<void> {
        const modalProps = await getModalProps({ market, outcome });
        setOutcomeState(modalProps.outcomeState);
        setQuestion(modalProps.question);
        setPositionId(modalProps.positionId);
        setShow(true);
    }

    const resultMarkets = data.filter((market) =>
        searchMarkets<Market>(market, ["question", "description"], query),
    );

    const marketElements = resultMarkets.map((market: Market) => {
        return (
            <Col md={4} key={market.id} style={{ paddingTop: "10px" }}>
                <Card border="dark" style={{ height: "100%" }}>
                    <Card.Text style={{ height: "30%" }}>
                        {market.question}
                    </Card.Text>
                    <Card.Body>
                        <ListGroup variant="flush">
                            {market.outcomes.map((outcome: string) => (
                                <a
                                    role="button"
                                    tabIndex={0}
                                    key={outcome}
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        handleClick({ market, outcome })
                                    }
                                    onKeyDown={() =>
                                        handleClick({ market, outcome })
                                    }
                                >
                                    {" "}
                                    <Card.Header>{outcome}</Card.Header>
                                </a>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
        );
    });
    return (
        <>
            <BalanceModal
                show={show}
                setShow={setShow}
                outcome={outcomeState}
                question={question}
                positionId={positionId}
            />
            {marketElements}
        </>
    );
};
export default ActiveMarkets;
