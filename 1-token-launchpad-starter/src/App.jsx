import { TokenLaunchpad } from "./components/TokenLaunchpad";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Launchpad } from "./components/Launchpad";
import { Minter } from "./components/Minter";

function App() {
  return (
    <div className="bg-[#242424]">
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="flex justify-between p-5 ">
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            {/* <TokenLaunchpad></TokenLaunchpad> */}
            {/* <Launchpad></Launchpad> */}
            <Minter></Minter>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
