import { useState } from "react";

export function ToggleComp() {
  const [toggle, setToggle] = useState(0);

  return (
    <div>
      <button onClick={() => setToggle(toggle+1)}>Increase Count</button>
      {toggle}
    </div>
  );
};
