import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Market } from "../utils/constants";
import SearchInput from "../components/searchInput";
import ActiveMarkets from "../components/activeMarkets";

 type Props = {
    data: Market[];
};
const BalanceChecker: React.FC<Props> = ({ data }): JSX.Element => {
   const [query, setQuery] = useState("");

    return (
        <Container>
       
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
                        onChangeSearchQuery={(query) => setQuery(query)}
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
