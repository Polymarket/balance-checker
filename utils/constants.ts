import { ethers } from "ethers";

const MATIC_NODE: string = "wss://ws-matic-mainnet.chainstacklabs.com";
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
    resolution_source: any;
    end_date: string;
    category: string;
    amm_type: any;
    liquidity: any;
    sponsor_name: any;
    sponsor_image: any;
    start_date: any;
    x_axis_value: unknown;
    y_axis_value: unknown;
    denomination_token: any;
    fee: unknown;
    image: any;
    icon: any;
    lower_bound: any;
    upper_bound: any;
    description: any;
    tags: string[];
    outcomes: string[];
    outcomePrices: string[];
    volume: string;
    active: boolean;
    market_type: string;
    format_type: any;
    lower_bound_date: any;
    upper_bound_date: any;
    closed: boolean;
    marketMakerAddress: string;
    created_at: any;
    updated_at: any;
    closed_time: any;
    wide_format: unknown;
    new: any;
    sent_discord: any;
    mailchimp_tag: any;
    use_cases: unknown[];
    seo: any;
};
