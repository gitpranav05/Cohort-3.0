/* eslint-disable prefer-const */
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

function SendTokens() {
  const [to, setTo] = useState("");
  const [amt, setAmt] = useState(0);
  const wallet = useWallet();
  const { connection } = useConnection();

  async function send() {
    if (!wallet.publicKey) return;

    console.log(to);
    console.log(amt);

    try {
      const transaction = new Transaction();

      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: amt * LAMPORTS_PER_SOL,
        }),
      );

      const signature = await wallet.sendTransaction(transaction, connection);

      console.log("Transaction signature:", signature);

      alert(`Sent ${amt} SOL\n\nSignature:\n${signature}`);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed");
    }
  }
  return (
    <div className="py-2 flex gap-1">
      <input
        type="text"
        className="border-2  rounded-l p-1 "
        placeholder="To"
        id="to"
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        onChange={(e) => setAmt(e.target.valueAsNumber)}
        id="amt"
        type="number"
        placeholder="Amount"
        className="border-2  rounded-l p-1 "
      />
      <button onClick={send} className="border-2 rounded-l p-1 cursor-pointer">
        Send
      </button>
    </div>
  );
}

export default SendTokens;
