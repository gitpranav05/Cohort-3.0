import { mnemonicToSeed } from "bip39";
import Button from "./Button";
import { useState } from "react";
import {
  HDNodeWallet,
  JsonRpcProvider,
  Wallet,
  formatEther,
} from "ethers";

const ethereumRpcUrl = import.meta.env.VITE_ETHEREUM_RPC_URL;

if (!ethereumRpcUrl) {
  throw new Error("Missing VITE_ETHEREUM_RPC_URL in wallet/.env");
}

const provider = new JsonRpcProvider(ethereumRpcUrl);

function Eth({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [balances, setBalances] = useState<Record<string, string>>({});
  const [loadingAddress, setLoadingAddress] = useState<string | null>(null);

  async function checkBalance(address: string) {
    setLoadingAddress(address);

    try {
      const wei = await provider.getBalance(address);
      const eth = formatEther(wei);

      setBalances((prev) => ({
        ...prev,
        [address]: eth,
      }));
    } catch (error) {
      console.error("Could not fetch Ethereum wallet balance:", error);
    } finally {
      setLoadingAddress(null);
    }
  }

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
          setAddresses((prev) => [...prev, wallet.address]);
          void checkBalance(wallet.address);
        }}
        text="Add ETH Wallet"
      ></Button>
      {addresses.map((w) => (
        <div key={w}>
          {w}
          <Button
            text={loadingAddress === w ? "Loading..." : "Balance"}
            onClick={() => {
              void checkBalance(w);
            }}
          />
          {balances[w] !== undefined && <span> {balances[w]} ETH</span>}
        </div>
      ))}
    </div>
  );
}

export default Eth;
