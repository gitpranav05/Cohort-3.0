import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function Airdrop() {
  const [balance, setBal] = useState(0);
  const wallet = useWallet();
  const { connection } = useConnection();
  const pub = wallet.publicKey;

  useEffect(() => {
    async function getBalance() {
      if (!pub) {
        setBal(0);
      }
      if (pub) {
        const bal: number =
          (await connection.getBalance(pub)) / LAMPORTS_PER_SOL;
        setBal(bal);
        // document.getElementById("balance")?.append(bal.toString());
      }
    }
    getBalance();
  }, [connection, pub]);

  async function sendAirdropToUser() {
    try {
      const amt = Number(
        (document.getElementById("amt") as HTMLInputElement | null)?.value,
      );
      if (!pub || amt <= 0) return;
      const req = await connection.requestAirdrop(pub, amt * LAMPORTS_PER_SOL);
      console.log(req);
      const status = await connection.getSignatureStatus(req);
      const confirmationStatus = status.value?.confirmationStatus;

      if (confirmationStatus === "confirmed") {
        alert(`${amt} SOL Sent`);
        setBal((x) => x + amt);
        return;
      }

      alert(`Failed to Airdrop:-`);
    } catch (error) {
      alert(`Failed to Airdrop:- ${error}`);
    }
  }

  return (
    <div className="flex flex-col pt-2">
      <div className="flex">
        {/* {pub?.toString()} */}
        <input id="amt" type="number" className="border-2  rounded-l p-1 " />
        <button
          onClick={sendAirdropToUser}
          className="border-2 rounded-l p-1 cursor-pointer"
        >
          Send Airdrop
        </button>
      </div>
      <p>SOL Balance: {balance}</p> <div id="balance"></div>
    </div>
  );
}
