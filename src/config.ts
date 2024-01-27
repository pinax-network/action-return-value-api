import { APIClient } from "@wharfkit/session"

export type Network = "mainnet" | "testnet"

const mainnet = new APIClient({ url: "https://eos.api.eosnation.io" });
const testnet = new APIClient({ url: "https://jungle4.api.eosnation.io" });

export const rpcs = {
    mainnet,
    testnet,
}

export const networks = Object.keys(rpcs) as Network[]; // ["mainnet", "testnet"]