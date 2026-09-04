import {
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  ExtensionType,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";

import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

export function Launchpad() {
  const wallet = useWallet();
  //   console.log(wallet.publicKey);
  const { connection } = useConnection();

  async function createToken() {
    const name = document.getElementById("name").value;
    const symbol = document.getElementById("symbol").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const initialSupply = document.getElementById("initialSupply").value;
    const keypair = Keypair.generate();

    const metadata = {
      mint: keypair.publicKey,
      name: name,
      symbol: symbol,
      url: imageUrl,
      additionalMetadata: [],
    };
    
    // const metadata = {
    //   mint: keypair.publicKey,
    //   name: "AASTHA",
    //   symbol: "AAST    ",
    //   uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShnosAQhdrFSULbg9S3v_nEDm7PNCIopqnt_iQjcCNR5jRYGcK6sFDOsc&s=10",
    //   additionalMetadata: [],
    // };

    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

    const lamports = await connection.getMinimumBalanceForRentExemption(
      mintLen + metadataLen,
    );
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: mintLen ,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      }),

      createInitializeMetadataPointerInstruction(
        keypair.publicKey,
        wallet.publicKey,
        keypair.publicKey,
        TOKEN_2022_PROGRAM_ID,
      ),
      createInitializeMintInstruction(
        keypair.publicKey,
        9,
        wallet.publicKey,
        null,
        TOKEN_2022_PROGRAM_ID,
      ),
      createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: keypair.publicKey,
        metadata: keypair.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        mintAuthority: wallet.publicKey,
        updateAuthority: wallet.publicKey,
      }),
    );

    const recentBlockHash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = recentBlockHash.blockhash;
    transaction.feePayer = wallet.publicKey;
    console.log(keypair);
    transaction.partialSign(keypair);

    let res = await wallet.sendTransaction(transaction, connection);
    console.log(res);
  }

  return (
    <main className="flex min-h-screen min-w-80 flex-col items-center justify-center  text-center font-sans leading-6 font-normal text-white/85 antialiased">
      <h1 className="text-[3.2em] leading-[1.1]">Solana Token Launchpad</h1>
      <input
        id="name"
        className="mt-5 w-75 py-5 pl-2.5"
        type="text"
        placeholder="Name"
      />
      <input
        id="symbol"
        className="mt-5 w-75 py-5 pl-2.5"
        type="text"
        placeholder="Symbol"
      />
      <input
        id="imageUrl"
        className="mt-5 w-75 py-5 pl-2.5"
        type="text"
        placeholder="Image URL"
      />
      <input
        id="initialSupply"
        className="mt-5 w-75 py-5 pl-2.5"
        type="text"
        placeholder="Initial Supply"
      />
      <button
        onClick={createToken}
        className="mt-5 cursor-pointer rounded-lg border border-transparent bg-[#1a1a1a] p-5 text-base font-medium transition-colors duration-200 hover:border-[#646cff] focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:outline-auto"
      >
        Create a token
      </button>
    </main>
  );
}
