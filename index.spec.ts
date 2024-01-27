import { describe, expect, it } from 'bun:test'
import app from './index.js'

describe('action-return-value-api', () => {
  it('t53ryjs2mw1d', async () => {
    const data = {};
    const req = new Request('http://localhost/t53ryjs2mw1d/get', {
      method: "POST",
      headers: {
        "x-network": "testnet",
      },
      body: JSON.stringify(data)
    })
    const res = await app.fetch(req)
    const text = await res.text();
    expect(res.status).toBe(200);
    expect(text).toEqual("Bob")
  })

  it('sj5wyvn1azme', async () => {
    const data = {};
    const req = new Request('http://localhost/sj5wyvn1azme/get', {
      method: "POST",
      headers: {
        "x-network": "testnet",
      },
      body: JSON.stringify(data)
    })
    const res = await app.fetch(req)
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toEqual({hello: "world"})
  })

  it('sk3bjrendfhx', async () => {
    const data = {};
    const req = new Request('http://localhost/sk3bjrendfhx/get', {
      method: "POST",
      headers: {
        "x-network": "testnet",
      },
      body: JSON.stringify(data)
    })
    const res = await app.fetch(req)
    const text = await res.text();
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe("text/html; charset=UTF-8");
    expect(text).toEqual("<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"></head><body>Hello world!</body></html>")
  })

  it('n1c344mpfpbe', async () => {
    const data = {};
    const req = new Request('http://localhost/n1c344mpfpbe/get', {
      method: "POST",
      headers: {
        "x-network": "testnet",
      },
      body: JSON.stringify(data)
    })
    const res = await app.fetch(req)
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe("image/png");
  })

  it('customvalue', async () => {
    const data = { message: "hello", extra: "world", number: 123 };
    const req = new Request('http://localhost/actions.eosn/customvalue', {
      method: "POST",
      body: JSON.stringify(data)
    })
    const res = await app.fetch(req)
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toEqual(data)
  })

  it('namevalue', async () => {
    const message = "foobar";
    const req = new Request('http://localhost/actions.eosn/namevalue', {
      method: "POST",
      body: JSON.stringify({message})
    })
    const res = await app.fetch(req)
    const text = await res.text();
    expect(res.status).toBe(200);
    expect(text).toBe(message)
  })

  it('numbervalue', async () => {
    const number = 123;
    const req = new Request('http://localhost/actions.eosn/numbervalue', {
      method: "POST",
      body: JSON.stringify({number})
    })
    const res = await app.fetch(req)
    const text = Number(await res.text());
    expect(res.status).toBe(200);
    expect(text).toBe(number)
  })

  it('numbervalue', async () => {
    const number = 123;
    const req = new Request('http://localhost/actions.eosn/numbervalue', {
      method: "POST",
      body: JSON.stringify({number})
    })
    const res = await app.fetch(req)
    const text = Number(await res.text());
    expect(res.status).toBe(200);
    expect(text).toBe(number)
  })

  it('stringvalue', async () => {
    const message = "hello world";
    const req = new Request('http://localhost/actions.eosn/stringvalue', {
      method: "POST",
      body: JSON.stringify({message})
    })
    const res = await app.fetch(req)
    const text = await res.text();
    expect(res.status).toBe(200);
    expect(text).toBe(message)
  })

  it('vectorvalue', async () => {
    const message = ["one", "two", "three"];
    const req = new Request('http://localhost/actions.eosn/vectorvalue', {
      method: "POST",
      body: JSON.stringify({message})
    })
    const res = await app.fetch(req)
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toEqual(message)
  })

  it('openapi', async () => {
    const req = new Request('http://localhost/')
    const res = await app.fetch(req)
    expect(res.status).toBe(200)
  })
})