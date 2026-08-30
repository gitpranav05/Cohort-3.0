import { useState } from "react";
import { generateMnemonic } from "bip39";
import Solana from "./components/Solana";
import Button from "./components/Button";
import Eth from "./components/Eth";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div className="w-screen text-white h-screen bg-black justify-center flex  flex-col gap-10 items-center">
      <div>
        <input
          type="text"
          className="border-2 w-200 text-xl"
          value={mnemonic}
        />
        <Button
          onClick={async function () {
            const mn = await generateMnemonic();
            setMnemonic(mn);
            // console.log(mn);
          }}
          text="Create seeded phrase"
        ></Button>
      </div>
      <div>
        <Solana mnemonic={mnemonic} />
      </div>
      <div>
        <Eth mnemonic={mnemonic} />
      </div>
    </div>
  );
}

export default App;
