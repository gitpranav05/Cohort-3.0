import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <>
      <Button
        text="Click me"
        className="hover:bg-[#a9bdff] translate-y-70 translate-x-150 transition-all duration-150 outline-none"
        startIcon={<PlusIcon size="md" />}
        variant="secondary"
        size="md"
        onClick={() => {}}
      />
      <Button
        text="Share"
        className="hover:bg-purple-500 translate-y-60 translate-x-100 transition-all duration-150 outline-none"
        startIcon={<ShareIcon size="md" />}
        variant="primary"
        size="md"
        onClick={() => {}}
      />
    </>
  );
}

export default App;
