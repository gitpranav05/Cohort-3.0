import { mnemonicToSeed } from "bip39";
import Button from "./Button";
import { useState } from "react";
import { HDNodeWallet } from "ethers";
import { Wallet } from "ethers";

function Eth({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);
  return (
    <div>
      <Button
        onClick={async () => {
          const seed = await mnemonicToSeed(mnemonic);
          const path = `m/44'/60'/${currentIndex}'/0'`;
          const hnode = HDNodeWallet.fromSeed(seed);
          const child = hnode.derivePath(path);
          const privatKey = child.privateKey;
          const wallet = new Wallet(privatKey);
          console.log(wallet);
          setCurrentIndex((x) => x + 1);
          setAddresses([...addresses, wallet.address]);
        }}
        text="Add ETH Wallet"
      ></Button>
      {addresses.map((w) => (
        <div>{w}</div>
      ))}
    </div>
  );
}

export default Eth;
