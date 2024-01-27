#!/usr/bin/env node

import { Context, Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { swaggerUI } from '@hono/swagger-ui'
import { openapi } from './src/openapi.js';
import { decode, get_abi, get_type, read_only } from './src/read_only.js';
import { Network, rpcs } from './src/config.js';

const app = new Hono()
app.use('/*', cors(), logger())
app.get('/:contract/:action', handle_request);
app.post('/:contract/:action', handle_request);

async function handle_request(c: Context) {
    const data = await get_data(c);
    const network = get_network(c);
    const contract = c.req.param("contract");
    const action = c.req.param("action");
    try {
        const decoded = await get_decoded_read_only(contract, action, data, network);
        return handle_response(c, decoded);
    } catch (e: any) {
        return c.json({error: e.message});
    }
}

async function get_data(c: Context) {
    let data = '{}' // default to empty object
    if (c.req.method === "POST" ) {
        try {
            data = await c.req.json();
        } catch (e) {
            // ignore
        }
    } else {
        const {searchParams} = new URL(c.req.url)
        data = searchParams.get('data') ?? '{}'; // optional JSON encoded data
    }
    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
}

function get_network(c: Context): Network {
    const {searchParams} = new URL(c.req.url)
    let network = c.req.raw.headers.get('x-network') as Network;
    if ( !network ) network = searchParams.get('network') as Network;
    if ( !network ) network = 'mainnet';
    if ( !["mainnet","testnet"].includes(network)) throw 'network must be mainnet or testnet';
    return network;
}

async function handle_response(c: Context, decoded: any) {
    if ( typeof decoded === 'object' ) return c.json(decoded);
    if ( typeof decoded === "string" && decoded.startsWith('<!doctype') ) return c.html(decoded);
    if ( typeof decoded === "string" && decoded.startsWith('data:') ) {
        const blob = await fetch(decoded).then(res => res.blob())
        c.header('Content-Type', blob.type);
        return c.body(blob.stream());
    }
    return c.text(decoded);
}

async function get_decoded_read_only(contract: string, action: string, data: any, network: Network) {
    // console.log("handle_response", {contract, action, data, network});
    if ( !action ) throw 'action is required';
    if ( !contract ) throw 'contract is required';
    if ( !["mainnet","testnet"].includes(network)) throw 'network must be mainnet or testnet';
    const rpc = rpcs[network];
    const abi = await get_abi(rpc, contract);
    const value = await read_only(abi, rpc, contract, action, data);
    const return_value_hex_data = value.processed.action_traces[0].return_value_hex_data;
    let type = 'string';
    try {
        type = get_type(abi, action);
    } catch (e) {
        // ignore
    }
    return decode(abi, return_value_hex_data, type)
}

app.get('/', swaggerUI({ url: '/openapi' }))
app.get('/openapi', async (c) => {
    return c.json(JSON.parse(await openapi()));
})

export default app