import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./components/Airdrop";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import SignMessage from "./components/SignMessage";
import SendTokens from "./components/SendTokens";

const RPC =
  import.meta.env.VITE_RPC_URL ?? clusterApiUrl(WalletAdapterNetwork.Devnet);
function App() {
  if (!RPC) return;
  // console.log(RPC);
  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <ConnectionProvider endpoint={RPC}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <WalletMultiButton />
            <WalletDisconnectButton />
            {/* Your app's components go here, nested within the context providers. */}

            <div className="">
              {/* <h1>Hello</h1> */}
              <Airdrop />

              <SignMessage/>
              <SendTokens/>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
