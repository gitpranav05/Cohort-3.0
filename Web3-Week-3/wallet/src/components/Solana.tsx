import { useState } from "react";
import Button from "./Button";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";

function Solana({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKey, setPublicKey] = useState<string[]>([]);

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
          console.log(pub);
          setCurrentIndex((x) => x + 1);
          setPublicKey([...publicKey, pub]);
        }}
        text="Add SOL Wallet"
      ></Button>
      {publicKey.map((p) => <div>
        {p} <Button text="Balance" onClick={()=>{}}/> 
      </div>)}
    </div>
  );
}

export default Solana;
