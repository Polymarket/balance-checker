import { ethers } from "ethers";

const MATIC_NODE: string = "wss://rpc-mainnet.maticvigil.com/ws";
const provider = new ethers.providers.WebSocketProvider(MATIC_NODE);
const { abi } = require("./ConditionalTokens.json");
const CONTRACT_ADDRESS: string = "0x4D97DCd97eC945f40cF65F87097ACe5EA0476045";

export const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
export const parentCollectionId: string =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
export const collateralToken = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

export type Market = {
    id: number;
    question: string;
    conditionId: string;
    slug: string;
    twitter_card_image: string;
    resolution_source: string;
    end_date: string;
    category: string;
    amm_type: string;
    liquidity: string;
    sponsor_name: string;
    sponsor_image: string;
    start_date: string;
    x_axis_value: unknown;
    y_axis_value: unknown;
    denomination_token: string;
    fee: unknown;
    image: string;
    icon: string;
    lower_bound: string;
    upper_bound: string;
    description: string;
    tags: string[];
    outcomes: string[];
    outcomePrices: string[];
    volume: string;
    active: boolean;
    market_type: string;
    format_type: string;
    lower_bound_date: string;
    upper_bound_date: string;
    closed: boolean;
    marketMakerAddress: string;
    created_at: string;
    updated_at: string;
    closed_time: string;
    wide_format: unknown;
    new: boolean;
    sent_discord: boolean;
    mailchimp_tag: string;
    use_cases: unknown[];
    seo: string;
};
