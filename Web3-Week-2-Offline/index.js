// let str = "h";

// const bin = new TextEncoder().encode(str)

// console.log(bin);

// const bin2 = new Uint8Array([209]);

// console.log(bin2);

// const pub = "YDRycJKFu4tfvV6gu76Bb78B89non8o7NO8uiyv6BI68i6";
// const bytes = new TextEncoder().encode(pub);

// console.log(bytes);

import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

// Generate a new keypair
const keypair = Keypair.generate();

// Extract the public and private keys
const publicKey = keypair.publicKey.toString();
const secretKey = keypair.secretKey;

// Display the keys
console.log("Public Key:", publicKey);
console.log("Private Key (Secret Key):", secretKey);

// Convert the message "hello world" to a Uint8Array
const message = new TextEncoder().encode("hello world");

const signature = nacl.sign.detached(message, secretKey);
const result = nacl.sign.detached.verify(
  message,
  signature,
  keypair.publicKey.toBytes(),
);

console.log(result);