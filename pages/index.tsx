import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Market, parentCollectionId, collateralToken } from "../utils/constants";
import { getIndexSet, getCollectionId, getPositionId } from "../utils";
import BalanceModal from "../components/modal";
import SearchInput from "../components/searchInput";
import ActiveMarkets from "../components/activeMarkets";

export type Props = {
    data: Market[];
};
const BalanceChecker: React.FC<Props> = ({ data }): JSX.Element => {
     const [show, setShow] = useState<boolean>(false);
     const [outcomeName, setOutcomeName] = useState<string>("");
     const [question, setQuestion] = useState<string>("");
     const [positionId, setPositionId] = useState<string>("");
    
    const [query, setQuery] = useState("");


  
   async function handleClick({ market, outcome }: { market: Market; outcome: string }): Promise<void> {
        const indexSet = getIndexSet({market, outcome});
        const conditionId = market.conditionId;
        const collectionId = await getCollectionId({parentCollectionId, conditionId, indexSet});
        const positionId = await getPositionId({ collateralToken, collectionId });
        setPositionId(positionId);
        setQuestion(market.question);
        setOutcomeName(outcome);
        setShow(true);
    }


    return (
        <Container>
            <BalanceModal
                setShow={setShow}
                question={question}
                outcomeName={outcomeName}
                positionId={positionId}
                show={show}
            />
            <Row style={{ paddingTop: "50px", textAlign: "center" }}>
                <Col>
                    <h1>Customer Balances</h1>
                </Col>
            </Row>

            <Row style={{ textAlign: "center" }}>
                <Col md={4} />
                <Col md={4}>
                    <h6>Select a market outcome to find user balances </h6>
                </Col>
                <Col md={4} />
            </Row>

            <Row
                style={{
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    textAlign: "center",
                }}
            >
                <Col>
                    <h2 style={{ textAlign: "center" }}>Active Markets</h2>
                </Col>
            </Row>
            <Row
                style={{
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    textAlign: "center",
                }}
            >
                <Col md={4} />
                <Col md={4}>
                    <SearchInput
                        onChangeSearchQuery={(_query) => setQuery(_query)}
                    />
                </Col>
                <Col md={4} />
            </Row>
            <Row
                style={{
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    textAlign: "center",
                    minWidth: "100%",
                }}
            >
                <ActiveMarkets
                    data={data}
                    query={query}
                    handleClick={handleClick}
                />
            </Row>
        </Container>
    );
};
export async function getStaticProps(): Promise<
    | { notFound: boolean; props?: undefined }
    | { props: { data: Market[] }; notFound?: undefined }
> {
    const res = await fetch(
        `https://strapi-matic.poly.market/markets?active=true&_sort=volume:desc`,
    );
    const data: Market[] = await res.json();
    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: { data }, // will be passed to the page component as props
    };
}

export default BalanceChecker;
