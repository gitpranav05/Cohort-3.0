import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export default function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const pub = wallet.publicKey;

  async function sendAirdropToUser() {
    if (!pub) return;
    await connection.requestAirdrop(pub, 10);
    alert("SOL Sent")
  }
  return (
    <div className="flex">
      {/* {pub?.toString()} */}
      <input type="number" className="border-2  rounded-l p-1 " />
      <button
        onClick={sendAirdropToUser}
        className="border-2 rounded-l p-1 cursor-pointer"
      >
        Send Airdrop
      </button>
    </div>
  );
}
