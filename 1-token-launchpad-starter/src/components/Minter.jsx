import {
  createAssociatedTokenAccountIdempotentInstruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";

export function Minter() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function mintTokens() {
    try {
      // Make sure wallet is connected
      if (!wallet.publicKey) {
        alert("Please connect the mint authority wallet");
        return;
      }

      // --------------------------------------------------
      // EXISTING KIRA MINT
      // --------------------------------------------------

      const mintPublicKey = new PublicKey(
        "H2v2BY3CBbTWU5sBtx3mr39FtDoxaxa7f6oGPP4N4Ccy",
      );

      // --------------------------------------------------
      // WALLET THAT SHOULD RECEIVE THE KIRA
      // --------------------------------------------------

      const recipient = new PublicKey(
        "4ESPKZUd9U9JhqrqwPrCStS1DnPkM1UJTx7GFNkKM1LX",
      );

      // --------------------------------------------------
      // CHECK MINT AUTHORITY WALLET
      // --------------------------------------------------

      console.log("Connected wallet:", wallet.publicKey.toBase58());

      console.log("Recipient:", recipient.toBase58());

      console.log("Mint:", mintPublicKey.toBase58());

      // --------------------------------------------------
      // KIRA HAS 9 DECIMALS
      // --------------------------------------------------

      const decimals = 9;

      // We want exactly 100 KIRA
      const amount = BigInt(100) * BigInt(10 ** decimals);

      console.log("Amount in base units:", amount.toString());

      // --------------------------------------------------
      // GET ASSOCIATED TOKEN ACCOUNT
      // --------------------------------------------------

      const associatedToken = getAssociatedTokenAddressSync(
        mintPublicKey,
        recipient,
        false,
        TOKEN_2022_PROGRAM_ID,
      );

      console.log("Associated Token Account:", associatedToken.toBase58());

      // --------------------------------------------------
      // CREATE ATA + MINT TOKENS
      // IN ONE TRANSACTION
      // --------------------------------------------------

      const transaction = new Transaction().add(
        // Create ATA if it doesn't exist
        createAssociatedTokenAccountIdempotentInstruction(
          wallet.publicKey, // payer
          associatedToken, // ATA
          recipient, // owner
          mintPublicKey, // mint
          TOKEN_2022_PROGRAM_ID, // Token-2022
        ),

        // Mint 100 KIRA
        createMintToInstruction(
          mintPublicKey, // KIRA mint
          associatedToken, // destination
          wallet.publicKey, // mint authority
          amount, // 100 KIRA
          [], // multisig signers
          TOKEN_2022_PROGRAM_ID, // Token-2022
        ),
      );

      // --------------------------------------------------
      // SEND TRANSACTION
      // --------------------------------------------------

      const signature = await wallet.sendTransaction(transaction, connection);

      console.log("Transaction signature:", signature);

      // --------------------------------------------------
      // CONFIRM TRANSACTION
      // --------------------------------------------------

      const latestBlockhash = await connection.getLatestBlockhash();

      await connection.confirmTransaction(
        {
          signature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        "confirmed",
      );

      console.log("SUCCESS!");
      console.log("100 KIRA minted.");
      console.log("Recipient:", recipient.toBase58());

      alert("100 KIRA successfully minted!");
    } catch (error) {
      console.error("Minting failed:", error);

      alert(`Minting failed: ${error?.message || error}`);
    }
  }

  return (
    <main className="flex min-h-screen min-w-80 flex-col items-center justify-center text-center font-sans leading-6 font-normal text-white/85 antialiased">
      <h1 className="text-[3.2em] leading-[1.1]">KIRA Minter</h1>

      <p className="mt-5">Mint 100 KIRA</p>

      <p className="mt-2 text-sm">Recipient:</p>

      <p className="text-sm">4ESPKZUd9U9JhqrqwPrCStS1DnPkM1UJTx7GFNkKM1LX</p>

      <button
        onClick={mintTokens}
        className="mt-5 cursor-pointer rounded-lg border border-transparent bg-[#1a1a1a] p-5 text-base font-medium transition-colors duration-200 hover:border-[#646cff]"
      >
        Mint 100 KIRA
      </button>
    </main>
  );
}
