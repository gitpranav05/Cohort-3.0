import { useState } from "react";
import bs58 from "bs58";
import Button from "./Button";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

const solanaRpcUrl = import.meta.env.VITE_SOLANA_RPC_URL;

if (!solanaRpcUrl) {
  throw new Error("Missing VITE_SOLANA_RPC_URL in wallet/.env");
}

const connection = new Connection(solanaRpcUrl, "confirmed");

function Solana({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKey, setPublicKey] = useState<string[]>([]);
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [loadingAddress, setLoadingAddress] = useState<string | null>(null);

  async function checkBalance(address: string) {
    setLoadingAddress(address);

    try {
      const lamports = await connection.getBalance(new PublicKey(address));
      const sol = lamports / LAMPORTS_PER_SOL;

      setBalances((prev) => ({
        ...prev,
        [address]: sol,
      }));
    } catch (error) {
      console.error("Could not fetch wallet balance:", error);
    } finally {
      setLoadingAddress(null);
    }
  }

  return (
    <div>
      <Button
        onClick={async () => {
          const seed = await mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keyPair = Keypair.fromSecretKey(secret);
          const pub = keyPair.publicKey.toBase58();
          const privateKey = bs58.encode(keyPair.secretKey);

          console.log("Public Key:", pub);
          console.log("Private Key:", privateKey);

          console.log(keyPair);
          setCurrentIndex((x) => x + 1);
          setPublicKey((prev) => [...prev, pub]);
          void checkBalance(pub);
        }}
        text="Add SOL Wallet"
      />

      {publicKey.map((p) => (
        <div key={p}>
          {p}{" "}
          <Button
            text={loadingAddress === p ? "Loading..." : "Balance"}
            onClick={() => {
              void checkBalance(p);
            }}
          />
          {balances[p] !== undefined && (
            <span> {balances[p].toFixed(9)} SOL</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Solana;
