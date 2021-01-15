import React from "react";
import { Col, Row, Container, Card, ListGroup } from "react-bootstrap";
import { formatDiagnostic } from "typescript";
import { Market } from "../utils/constants";
import { searchMarkets } from "../utils";

type PropsFunction = ({
    market,
    outcome,
}: {
    market: Market;
    outcome: string;
}) => void;
type Props = {
    data: Market[];
    query: string;
    handleClick: PropsFunction;
};

const ActiveMarkets: React.FC<Props> = ({
    data,
    query,
    handleClick,
}): JSX.Element => {
    const resultMarkets = data.filter((market) =>
        searchMarkets<Market>(market, ["question", "description"], query),
    );

    const marketElements = resultMarkets.map((market: Market) => {
        return (
            <Col md={4} style={{ paddingTop: "10px" }}>
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
    return <>{marketElements}</>;
};
export default ActiveMarkets;
