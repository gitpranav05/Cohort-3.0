import { ed25519 } from "@noble/curves/webcrypto.js";
import bs58 from "bs58";
import { useWallet } from "@solana/wallet-adapter-react";

export default function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  //   console.log(publicKey);

  async function onClick() {
    if (!publicKey) throw new Error("Wallet not connected!");
    if (!signMessage)
      throw new Error("Wallet does not support message signing!");
    const message = (document.getElementById("msg") as HTMLInputElement).value;
    const encodedMsg = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMsg);

    if (!ed25519.verify(signature, encodedMsg, publicKey.toBytes()))
      throw new Error("Message signature invalid!");
    alert(`success: Message signature: ${bs58.encode(signature)}`);
    // console.log(bs58.encode(signature));
  }

  return (
    <div className="py-2">
      <input type="text" className="border-2  rounded-l p-1 " id="msg" />
      <button
        onClick={onClick}
        className="border-2 rounded-l p-1 cursor-pointer"
      >
        Sign Message
      </button>
    </div>
  );
}
