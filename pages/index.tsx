import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Market } from "../utils/constants";
import { getPositionId, getBalance } from "../utils";
import BalanceModal from "../components/modal";
import SearchInput from "../components/searchInput";
import ActiveMarkets from "../components/activeMarkets";

type Props = {
    data: Market[];
};
const BalanceChecker: React.FC<Props> = ({ data }): JSX.Element => {
    const [show, setShow] = useState(false);
    const [address, setAddress] = useState("");
    const [outcome, setOutcome] = useState("");
    const [question, setQuestion] = useState("");
    const [positionId, setPositionId] = useState("");
    const [balance, setBalance] = useState<string | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState("");
    const [query, setQuery] = useState("");

    function handleClose(): void {
        setShow(false);
        setBalance(undefined);
        return setErrorMessage("");
    }

    function handleShow(): void {
        return setShow(true);
    }

    function handleClick({ market }: { market: Market }): void {
        getPositionId({ market, outcome, setPositionId, setErrorMessage });
        setQuestion(market.question);
        setOutcome(outcome);
        return handleShow();
    }
    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>,
    ): Promise<void> {
        e.preventDefault();
        return getBalance({ address, positionId, setBalance, setErrorMessage });
    }

    return (
        <Container>
            <BalanceModal
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                setAddress={setAddress}
                setErrorMessage={setErrorMessage}
                question={question}
                outcome={outcome}
                errorMessage={errorMessage}
                address={address}
                balance={balance}
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
