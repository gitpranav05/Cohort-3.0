import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export default function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const pub = wallet.publicKey;

  async function sendAirdropToUser() {
    const amt = Number(
      (document.getElementById("amt") as HTMLInputElement | null)?.value,
    );
    if (!pub || amt <= 0) return;
    await connection.requestAirdrop(pub, amt * 1000000000);
    alert("1 SOL Sent");
  }
  return (
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
  );
}
