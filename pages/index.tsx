import Head from "next/head";
import React, { useState } from "react";
import { Market } from "../utils/constants";
import SearchInput from "../components/searchInput";
import ActiveMarkets from "../components/activeMarkets";
import styles from "../styles/Home.module.scss";
import PolymarketLogo from "../public/polymarket.svg";

type Props = {
    data: Market[];
};
const BalanceChecker: React.FC<Props> = ({ data }): JSX.Element => {
    const [searcQuery, setSearchQuery] = useState("");

    return (
        <div className={styles.App_Container}>
            <Head>
                <title>PM Withdrawal Checker</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.header}>
                <div className={styles.content}>
                    <PolymarketLogo />
                </div>
            </div>

            <main className={styles.main}>
                <h1 className={styles.title}>Balance Checker</h1>

                <div className={styles.grid}>
                    <p className={styles.description}>
                        Select a market outcome to find user balances{" "}
                    </p>
                </div>

                <div className={styles.grid}>
                    <div className={styles.content}>
                        <h2 style={{ textAlign: "center" }}>Active Markets</h2>
                    </div>
                </div>
                <div className={styles.grid}>
                    <SearchInput
                        onChangeSearchQuery={(query) => setSearchQuery(query)}
                    />
                </div>
                <div className={styles.MarketsBoard}>
                    <div className={styles.MarketsBoard_Widgets}>
                        <ActiveMarkets data={data} query={searcQuery} />
                    </div>
                </div>
            </main>
        </div>
    );
};
export async function getStaticProps(): Promise<
    | { notFound: boolean; props?: undefined }
    | { props: { data: Market[] }; notFound?: undefined }
> {
    const res = await fetch(
        `https://strapi-matic.poly.market/markets?active=true&_sort=volume:desc&_limit=-1`,
    );
    const data: Market[] = await res.json();
    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: { data },
    };
}

export default BalanceChecker;
