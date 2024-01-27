import { APIClient } from "@wharfkit/session"

export type Network = "mainnet" | "testnet"

export const rpcs = {
    mainnet: new APIClient({ url: "https://eos.api.eosnation.io", fetch }),
    testnet: new APIClient({ url: "https://jungle4.api.eosnation.io", fetch }),
}
