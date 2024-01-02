import { Web5 } from "@web5/api";
import { webcrypto } from 'node:crypto';

// @ts-ignore
if (!globalThis.crypto) globalThis.crypto = webcrypto;

const { web5, did: aliceDid } = await Web5.connect();

console.log("Alice DID:", aliceDid);
